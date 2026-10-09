import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, fmtDateTime, localTimeIn } from "@/lib/admin";
import { getLead } from "@/lib/leads";
import { STATUSES, leadChannel } from "@/lib/lead-types";
import { saveLead, removeLead } from "../../../actions";
import { site } from "@/content/site";

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  if (!v) return null;
  return (
    <div className="grid gap-x-4 gap-y-0.5 border-t border-line py-2.5 sm:grid-cols-[11rem_1fr]">
      <dt className="text-muted">{k}</dt>
      <dd className="break-words">{v}</dd>
    </div>
  );
}

export default async function LeadPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const l = await getLead(id);
  if (!l) notFound();

  const digits = l.phone.replace(/\D/g, "");
  const firstName = l.name.split(" ")[0];
  const waText = `Assalamu alaikum ${firstName}, this is ${site.name}. Thank you for requesting free trial classes${l.course && !l.course.startsWith("Not sure") ? ` for ${l.course}` : ""}. When would be a good time for the first class?`;
  const theirTime = localTimeIn(l.timezone);

  return (
    <>
      <Link href="/admin/leads" className="link text-[0.95rem]">
        Back to all leads
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-[2rem]">{l.name}</h1>
        <p className="text-muted">Received {fmtDateTime(l.createdAt)}</p>
      </div>

      {saved && (
        <p role="status" className="mt-4 rounded-md bg-ok/10 px-4 py-2.5 text-ok">
          Saved.
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="grid gap-6">
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-sans text-base font-semibold tracking-normal">Contact</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {digits && (
                <a href={`https://wa.me/${digits}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener" className="btn btn-gold min-h-[2.7rem]">
                  WhatsApp {firstName}
                </a>
              )}
              {l.phone && (
                <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="btn btn-line min-h-[2.7rem]">
                  Call
                </a>
              )}
              {l.email && (
                <a href={`mailto:${l.email}?subject=${encodeURIComponent(`Your free trial Quran classes with ${site.name}`)}`} className="btn btn-line min-h-[2.7rem]">
                  Email
                </a>
              )}
            </div>
            <dl className="mt-4">
              <Row k="Phone / WhatsApp" v={l.phone} />
              <Row k="Email" v={l.email} />
              <Row k="Country" v={l.country} />
              <Row k="Their time zone" v={l.timezone && `${l.timezone}${theirTime ? `. It is ${theirTime} there now` : ""}`} />
            </dl>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-sans text-base font-semibold tracking-normal">Request</h2>
            <dl className="mt-3">
              <Row k="Course" v={l.course} />
              <Row k="Classes are for" v={[l.studentFor, l.studentAge && `age ${l.studentAge}`].filter(Boolean).join(", ")} />
              <Row k="Teacher" v={l.teacherPref} />
              <Row k="Best days and time" v={l.preferredTime} />
              <Row k="Message" v={l.message} />
            </dl>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-sans text-base font-semibold tracking-normal">How they found you</h2>
            <dl className="mt-3">
              <Row k="Came from" v={leadChannel(l)} />
              <Row k="Form sent from" v={l.sourcePage} />
              <Row k="First page visited" v={l.landingPage} />
              <Row k="Referring site" v={l.referrer} />
              <Row k="utm_source" v={l.utmSource} />
              <Row k="utm_medium" v={l.utmMedium} />
              <Row k="utm_campaign" v={l.utmCampaign} />
              <Row k="utm_term" v={l.utmTerm} />
              <Row k="utm_content" v={l.utmContent} />
              <Row k="Google click ID" v={l.gclid} />
              <Row k="Meta click ID" v={l.fbclid} />
            </dl>
          </section>
        </div>

        <div className="grid content-start gap-6">
          <form action={saveLead} className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-sans text-base font-semibold tracking-normal">Follow-up</h2>
            <input type="hidden" name="id" value={l.id} />
            <label htmlFor="status" className="label mt-4">
              Status
            </label>
            <select id="status" name="status" defaultValue={l.status} className="field">
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <label htmlFor="notes" className="label mt-4">
              Notes
            </label>
            <textarea id="notes" name="notes" defaultValue={l.notes} rows={8} maxLength={5000} className="field" placeholder="Call notes, trial date and time, teacher assigned, plan chosen" />
            <button type="submit" className="btn btn-ink mt-4 w-full">
              Save
            </button>
            <p className="mt-3 text-sm text-muted">Last changed {fmtDateTime(l.updatedAt)}</p>
          </form>

          <details className="rounded-xl border border-line bg-white p-5">
            <summary className="cursor-pointer font-semibold text-bad">Delete this lead</summary>
            <p className="mt-3 text-muted">This removes the lead and its notes for good. It cannot be undone.</p>
            <form action={removeLead} className="mt-3">
              <input type="hidden" name="id" value={l.id} />
              <button type="submit" className="btn min-h-[2.7rem] bg-bad text-white">
                Delete permanently
              </button>
            </form>
          </details>
        </div>
      </div>
    </>
  );
}
