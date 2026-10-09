import { isAdmin } from "@/lib/auth";
import { listLeads } from "@/lib/leads";
import { leadChannel, statusLabel, type Lead } from "@/lib/lead-types";

export const dynamic = "force-dynamic";

const cols: [string, (l: Lead) => string][] = [
  ["Received (UTC)", (l) => l.createdAt],
  ["Status", (l) => statusLabel(l.status)],
  ["Name", (l) => l.name],
  ["Phone", (l) => l.phone],
  ["Email", (l) => l.email],
  ["Country", (l) => l.country],
  ["Course", (l) => l.course],
  ["Classes for", (l) => l.studentFor],
  ["Age", (l) => l.studentAge],
  ["Teacher", (l) => l.teacherPref],
  ["Preferred time", (l) => l.preferredTime],
  ["Time zone", (l) => l.timezone],
  ["Message", (l) => l.message],
  ["Notes", (l) => l.notes],
  ["Came from", (l) => leadChannel(l)],
  ["Form page", (l) => l.sourcePage],
  ["Landing page", (l) => l.landingPage],
  ["Referrer", (l) => l.referrer],
  ["utm_source", (l) => l.utmSource],
  ["utm_medium", (l) => l.utmMedium],
  ["utm_campaign", (l) => l.utmCampaign],
  ["utm_term", (l) => l.utmTerm],
  ["utm_content", (l) => l.utmContent],
  ["gclid", (l) => l.gclid],
  ["fbclid", (l) => l.fbclid],
];

// Quote every cell, and neutralise cells that a spreadsheet would run as a formula.
const cell = (v: string) => {
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Not signed in", { status: 401 });
  const leads = await listLeads();
  const csv = [cols.map(([h]) => cell(h)).join(","), ...leads.map((l) => cols.map(([, f]) => cell(f(l) ?? "")).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="leads-${date}.csv"`, "Cache-Control": "no-store" },
  });
}
