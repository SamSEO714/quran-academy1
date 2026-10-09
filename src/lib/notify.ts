import type { Lead } from "./lead-types";
import { leadChannel } from "./lead-types";
import { site } from "@/content/site";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Sends the new-lead alert by email (Resend) and/or webhook. Returns true if at least one alert went out. */
export async function notifyNewLead(lead: Lead): Promise<boolean> {
  const jobs: Promise<boolean>[] = [];

  const { RESEND_API_KEY, LEAD_ALERT_TO, LEAD_ALERT_FROM, LEAD_WEBHOOK_URL } = process.env;

  if (RESEND_API_KEY && LEAD_ALERT_TO && LEAD_ALERT_FROM) {
    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Phone / WhatsApp", lead.phone],
      ["Email", lead.email],
      ["Country", lead.country],
      ["Course", lead.course],
      ["Classes for", [lead.studentFor, lead.studentAge && `age ${lead.studentAge}`].filter(Boolean).join(", ")],
      ["Teacher", lead.teacherPref],
      ["Preferred time", [lead.preferredTime, lead.timezone && `(${lead.timezone})`].filter(Boolean).join(" ")],
      ["Message", lead.message],
      ["Came from", leadChannel(lead)],
      ["Campaign", lead.utmCampaign],
      ["Form page", lead.sourcePage],
    ];
    const html =
      `<h2 style="font-family:sans-serif">New free trial request</h2><table style="font-family:sans-serif;border-collapse:collapse">` +
      rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#51607A">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`)
        .join("") +
      `</table><p style="font-family:sans-serif"><a href="${site.url}/admin/leads/${lead.id}">Open in dashboard</a></p>`;
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: LEAD_ALERT_FROM,
          to: LEAD_ALERT_TO.split(",").map((s) => s.trim()),
          reply_to: lead.email || undefined,
          subject: `New trial request: ${lead.name} (${lead.country || "country not given"})`,
          html,
        }),
        signal: AbortSignal.timeout(6000),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  if (LEAD_WEBHOOK_URL) {
    jobs.push(
      fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, channel: leadChannel(lead) }),
        signal: AbortSignal.timeout(6000),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  const results = await Promise.all(jobs);
  return results.some(Boolean);
}
