import Link from "next/link";
import { requireAdmin, fmtDateTime } from "@/lib/admin";
import { listLeads } from "@/lib/leads";
import { STATUSES, leadChannel } from "@/lib/lead-types";
import { StatusPill } from "@/components/StatusPill";

const PER_PAGE = 50;

type SP = { q?: string; status?: string; country?: string; channel?: string; page?: string; deleted?: string };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireAdmin();
  const sp = await searchParams;
  const all = await listLeads();

  const q = (sp.q ?? "").trim().toLowerCase();
  const filtered = all.filter((l) => {
    if (sp.status && l.status !== sp.status) return false;
    if (sp.country && l.country !== sp.country) return false;
    if (sp.channel && leadChannel(l) !== sp.channel) return false;
    if (q && ![l.name, l.phone, l.email, l.course, l.country, l.notes, l.message, l.utmCampaign].some((v) => v.toLowerCase().includes(q))) return false;
    return true;
  });

  const page = Math.max(1, Number(sp.page) || 1);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const countries = [...new Set(all.map((l) => l.country).filter(Boolean))].sort();
  const channels = [...new Set(all.map(leadChannel))].sort();
  const hasFilter = Boolean(q || sp.status || sp.country || sp.channel);

  const pageHref = (p: number) => {
    const u = new URLSearchParams();
    if (sp.q) u.set("q", sp.q);
    if (sp.status) u.set("status", sp.status);
    if (sp.country) u.set("country", sp.country);
    if (sp.channel) u.set("channel", sp.channel);
    if (p > 1) u.set("page", String(p));
    const s = u.toString();
    return `/admin/leads${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-[2rem]">Leads</h1>
        <p className="text-muted">
          {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
          {hasFilter ? ` of ${all.length}` : ""}
        </p>
      </div>

      {sp.deleted && (
        <p role="status" className="mt-4 rounded-md bg-wash px-4 py-2.5">
          Lead deleted.
        </p>
      )}

      <form method="get" className="mt-5 grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="q" className="label">
            Search
          </label>
          <input id="q" name="q" defaultValue={sp.q ?? ""} className="field" placeholder="Name, phone, email, notes" />
        </div>
        <div>
          <label htmlFor="status" className="label">
            Status
          </label>
          <select id="status" name="status" defaultValue={sp.status ?? ""} className="field">
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="country" className="label">
            Country
          </label>
          <select id="country" name="country" defaultValue={sp.country ?? ""} className="field">
            <option value="">All</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="channel" className="label">
            Came from
          </label>
          <select id="channel" name="channel" defaultValue={sp.channel ?? ""} className="field">
            <option value="">All</option>
            {channels.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-ink min-h-[2.9rem]">
            Filter
          </button>
          {hasFilter && (
            <Link href="/admin/leads" className="btn btn-line min-h-[2.9rem]">
              Clear
            </Link>
          )}
        </div>
      </form>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-xl border border-line bg-white p-6 text-muted">{hasFilter ? "No leads match these filters. Clear them to see everything." : "No trial requests yet. They will appear here the moment a form is sent."}</p>
      ) : (
        <div className="tbl-wrap mt-6">
          <table className="tbl">
            <thead>
              <tr>
                <th scope="col">Received</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
                <th scope="col">Course</th>
                <th scope="col">Teacher</th>
                <th scope="col">Came from</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="hover:bg-paper">
                  <td className="whitespace-nowrap text-muted">{fmtDateTime(l.createdAt)}</td>
                  <th scope="row">
                    <Link href={`/admin/leads/${l.id}`} className="link">
                      {l.name}
                    </Link>
                  </th>
                  <td className="whitespace-nowrap">{l.phone}</td>
                  <td>{l.country}</td>
                  <td>{l.course}</td>
                  <td>{l.teacherPref}</td>
                  <td>{leadChannel(l)}</td>
                  <td>
                    <StatusPill status={l.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-5 flex items-center justify-between">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="btn btn-line min-h-[2.6rem]">
              Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={pageHref(page + 1)} className="btn btn-line min-h-[2.6rem]">
              Older
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
