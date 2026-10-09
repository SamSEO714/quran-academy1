import Link from "next/link";
import type { ReactNode } from "react";
import { site, whatsappLink, trialLabel } from "@/content/site";
import { TrialCard } from "./TrialForm";

/** Closing section used across the site: what happens after you send the form, with the form beside it. */
export function TrialSection({ source, ...defaults }: { source: string; defaultCountry?: string; defaultCourse?: string; defaultStudent?: string; defaultTeacher?: string }) {
  const wa = whatsappLink();
  return (
    <section className="on-ink lattice bg-ink text-white" aria-labelledby="trial-heading">
      <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[1fr_30rem] lg:py-24">
        <div>
          <h2 id="trial-heading" className="text-[clamp(1.9rem,1.3rem+2.4vw,2.9rem)]">
            Start with {site.trial.classes} free classes
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">Meet the teacher, see how the classes feel and decide afterwards. If it is not the right fit, you owe nothing.</p>
          <ol className="mt-8 max-w-xl space-y-5">
            {[
              ["Send the form", "It takes about a minute. No card details."],
              ["We confirm a teacher and a time", "Within one working day, by WhatsApp, phone or email."],
              ["Take your trial classes", `${site.trial.classes} full classes of ${site.trial.minutes} minutes, one-to-one.`],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold font-display text-lg text-gold">{i + 1}</span>
                <span>
                  <strong className="block text-[1.1rem] font-semibold">{t}</strong>
                  <span className="text-white/75">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          {wa && (
            <p className="mt-8 text-white/80">
              Prefer to chat?{" "}
              <a href={wa} rel="noopener" className="font-semibold text-gold underline underline-offset-4">
                Message us on WhatsApp
              </a>
            </p>
          )}
        </div>
        <TrialCard source={source} {...defaults} />
      </div>
    </section>
  );
}

/** Standard page header for inner pages. */
export function PageHead({ crumbs, title, lead, children }: { crumbs: ReactNode; title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="wrap py-10 sm:py-14">
        {crumbs}
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,1.3rem+3vw,3.25rem)]">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-[1.2rem] leading-relaxed text-muted">{lead}</p>}
        {children}
      </div>
    </div>
  );
}

export function Facts({ items, light = false }: { items: { label: string; value: string }[]; light?: boolean }) {
  return (
    <dl className={`grid gap-x-8 gap-y-4 sm:grid-cols-2 ${light ? "" : ""}`}>
      {items.map((f) => (
        <div key={f.label} className={`border-l-2 pl-4 ${light ? "border-gold" : "border-gold"}`}>
          <dt className={`text-sm ${light ? "text-white/70" : "text-muted"}`}>{f.label}</dt>
          <dd className="font-semibold leading-snug">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TrialButton({ className = "btn btn-gold", label }: { className?: string; label?: string }) {
  return (
    <Link href="/free-trial" className={className}>
      {label ?? trialLabel}
    </Link>
  );
}

export function Reviews() {
  if (!site.reviews.length) return null;
  return (
    <section className="bg-white" aria-labelledby="reviews-heading">
      <div className="wrap py-16 lg:py-20">
        <h2 id="reviews-heading" className="text-[clamp(1.7rem,1.3rem+1.6vw,2.4rem)]">
          What families say
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.reviews.map((r) => (
            <li key={r.name + r.date} className="border-l-2 border-gold pl-5">
              <p aria-label={`${r.rating} out of 5`} className="text-gold-deep">
                {"★".repeat(r.rating)}
              </p>
              <blockquote className="mt-2">{r.text}</blockquote>
              <p className="mt-3 text-sm text-muted">
                {r.name}, {r.location}. {r.course}.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Sticky "On this page" list beside long pages. Jump links also help search engines show section links. */
export function SideNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">On this page</h2>
        <ul className="mt-3 border-l border-line">
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] leading-snug hover:border-gold hover:text-lapis">
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/free-trial" className="btn btn-gold mt-6 w-full">
          Book free trial
        </Link>
      </div>
    </aside>
  );
}
