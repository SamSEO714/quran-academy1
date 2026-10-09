import { NextResponse } from "next/server";
import { createLead, NoStorageError } from "@/lib/leads";
import { notifyNewLead } from "@/lib/notify";
import { parseLead, rateLimited } from "@/lib/validate";
import type { Lead } from "@/lib/lead-types";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(`lead:${ip}`, 6, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Too many requests from this connection. Try again in a few minutes." }, { status: 429 });
  }

  // The form normally posts JSON. If scripts failed to load in the visitor's browser, it posts as a plain form instead,
  // and we answer with a redirect so that visitor still reaches the thank-you page.
  const plain = !(req.headers.get("content-type") ?? "").includes("application/json");
  let body: Record<string, unknown>;
  try {
    body = plain ? Object.fromEntries((await req.formData()).entries()) : ((await req.json()) as Record<string, unknown>);
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read. Reload the page and try again." }, { status: 400 });
  }
  if (plain) {
    const result = await handle(body);
    const to = result.ok ? "/free-trial/thank-you" : "/free-trial?error=1";
    return NextResponse.redirect(new URL(to, req.url), 303);
  }
  const result = await handle(body);
  return NextResponse.json(result.body, { status: result.status });
}

async function handle(body: Record<string, unknown>): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  const reply = (b: Record<string, unknown>, status = 200) => ({ ok: b.ok === true, status, body: b });

  // Bots fill the hidden field. Pretend it worked and save nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") return reply({ ok: true });

  const { data, errors } = parseLead(body);
  if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);

  // A form sent within a second of the page loading is almost always a script.
  // A real person who somehow was that fast just presses the button again, so nothing is lost.
  if (typeof body.elapsed === "number" && body.elapsed < 1200) {
    return reply({ ok: false, message: "That was quick. Please press the button once more to send your request." }, 429);
  }

  let lead: Lead | null = null;
  let stored = false;
  try {
    lead = await createLead(data);
    stored = true;
  } catch (e) {
    if (!(e instanceof NoStorageError)) console.error("[leads] could not save lead", e);
    const now = new Date().toISOString();
    lead = { id: randomUUID(), createdAt: now, updatedAt: now, status: "new", notes: "", ...data };
  }

  const alerted = await notifyNewLead(lead).catch(() => false);

  if (!stored && !alerted) {
    // Nothing kept the lead. Tell the visitor honestly instead of showing a thank-you page.
    console.error("[leads] lead neither saved nor alerted. Set DATABASE_URL or a lead alert.", JSON.stringify(data));
    return reply({ ok: false, message: "We could not save your request just now. Please message us on WhatsApp or try again in a few minutes." }, 503);
  }

  return reply({ ok: true });
}
