import Link from "next/link";
import { meta, longDate } from "@/lib/seo";
import { site, trialLabel } from "@/content/site";
import { pathCourses, sideCourses } from "@/content/courses";
import { countryLandings, audienceLandings } from "@/content/pages";
import { homeFaqs } from "@/content/faqs";
import { posts } from "@/content/blog";
import { lowest, money, pricingNotes } from "@/content/pricing";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { LessonBoard } from "@/components/LessonBoard";
import { PricingTable } from "@/components/PricingTable";
import { FaqList } from "@/components/Faq";
import { Table } from "@/components/Blocks";
import { Reviews, TrialSection } from "@/components/Sections";

export const metadata = meta({
  title: `Online Quran Classes for Kids and Adults | ${site.name}`,
  absoluteTitle: true,
  description: `Live one-to-one online Quran classes: Noorani Qaida, Tajweed, Hifz and Ijazah with male and female teachers. USA, UK, Canada and Australia time zones. From ${money("USD", lowest("USD"))} a month. ${site.trial.classes} free trial classes.`,
  path: "/",
});

const h2 = "text-[clamp(1.75rem,1.3rem+1.9vw,2.6rem)]";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="on-ink lattice bg-ink text-white">
        <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-16">
          <div>
            <h1 className="text-[clamp(2.25rem,1.3rem+3.4vw,3.5rem)] leading-[1.08]">Online Quran classes for kids and adults. One teacher, one student.</h1>
            <p className="mt-6 max-w-xl text-[1.18rem] leading-relaxed text-white/85">
              {site.name} teaches Noorani Qaida, Quran reading, Tajweed, Hifz and Ijazah in live {site.classMinutes}-minute video classes. Lessons are timed for families in the USA, UK, Canada and Australia, with male and female teachers. Your first{" "}
              {site.trial.classes} classes are free.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-trial" className="btn btn-gold text-[1.05rem]">
                {trialLabel}
              </Link>
              <Link href="/pricing" className="btn btn-line-light">
                See fees, from {money("USD", lowest("USD"))} a month
              </Link>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-7 sm:grid-cols-4">
              {[
                ["Class", "One-to-one"],
                ["Length", `${site.classMinutes} minutes`],
                ["Teachers", "Male and female"],
                ["Ages", "4 to adult"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-white/60">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LessonBoard />
        </div>
      </section>

      {/* Learning path */}
      <section aria-labelledby="path-heading">
        <div className="wrap py-16 lg:py-24">
          <div className="max-w-3xl">
            <h2 id="path-heading" className={h2}>
              From the first letter to Ijazah, in five steps
            </h2>
            <p className="mt-4 text-lg text-muted">Every student is placed on this path after a short level check in the first trial class. You start where you are, not at the beginning.</p>
          </div>

          <ol className="mt-12 grid gap-y-8 lg:grid-cols-5 lg:gap-x-0">
            {pathCourses.map((c) => (
              <li key={c.slug} className="group relative pl-14 lg:pl-0 lg:pr-6">
                {/* connecting line: vertical on phones, horizontal on desktop */}
                <span aria-hidden="true" className="absolute left-[1.05rem] top-10 h-[calc(100%-0.5rem)] w-px bg-line group-last:hidden lg:left-11 lg:top-[1.1rem] lg:h-px lg:w-[calc(100%-3.25rem)]" />
                <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-lg text-gold lg:static">{c.step}</span>
                <h3 className="text-[1.3rem] lg:mt-5">
                  <Link href={`/courses/${c.slug}`} className="underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.98rem] text-muted">{c.summary}</p>
                <p className="mt-3 text-sm font-medium">{c.ages}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 border-t border-line pt-8">
            <h3 className="font-sans text-base font-semibold tracking-normal text-muted">Taken alongside, at any stage</h3>
            <ul className="mt-4 grid gap-6 md:grid-cols-3">
              {sideCourses.map((c) => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`} className="font-display text-[1.2rem] font-semibold underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <p className="mt-1 text-[0.98rem] text-muted">{c.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="border-y border-line bg-white" aria-labelledby="who-heading">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <h2 id="who-heading" className={h2}>
              A private teacher for each person in the family
            </h2>
            <p className="mt-4 text-lg text-muted">A six-year-old on the Qaida and a mother fixing her Tajweed need different teachers and different lessons. Each gets their own.</p>
          </div>
          <ul className="grid gap-8">
            {[
              { l: audienceLandings[0], t: "Children, ages 4 to 15", d: "Short, lively classes that start with the Arabic letters and build to fluent reading, Tajweed and Hifz. Parents get a progress note every month." },
              { l: audienceLandings[1], t: "Adults and new Muslims", d: "Private lessons with nobody else listening. Start from the alphabet or correct the reading you learned as a child, before work or late in the evening." },
              { l: audienceLandings[2], t: "Sisters who want a female teacher", d: "Female teachers for women, girls and young children, in every course from Qaida to Ijazah. Daytime slots during school hours are available." },
            ].map(({ l, t, d }) => (
              <li key={l.slug} className="border-l-2 border-gold pl-6">
                <h3 className="text-[1.4rem]">{t}</h3>
                <p className="mt-2 max-w-xl text-muted">{d}</p>
                <Link href={`/${l.slug}`} className="link mt-3 inline-block font-semibold">
                  {l.h1.split(",")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How a class works */}
      <section aria-labelledby="how-heading">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <h2 id="how-heading" className={h2}>
              How online Quran classes work
            </h2>
            <p className="mt-4 text-lg text-muted">
              You and the teacher join a live video call on {site.classApps}. The teacher shares the page, the student reads aloud and every mistake is corrected as it happens.
            </p>
          </div>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["Book your free trial", `Send the form with the days and times that suit you. We reply within one working day.`],
              ["Level check in class one", "The teacher listens to the student read and tells you exactly where to start."],
              ["Fixed days, same teacher", "You choose the timetable in your own time zone. One teacher takes every class."],
              ["A progress note each month", "What was covered, what needs practice at home and the next target."],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="font-display text-[2.2rem] leading-none text-gold-deep">{i + 1}</span>
                <h3 className="mt-2 text-[1.25rem]">{t}</h3>
                <p className="mt-1.5 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Countries */}
      <section className="border-y border-line bg-white" aria-labelledby="countries-heading">
        <div className="wrap py-16 lg:py-24">
          <div className="max-w-3xl">
            <h2 id="countries-heading" className={h2}>
              Class times in your time zone, fees in your currency
            </h2>
            <p className="mt-4 text-lg text-muted">Classes are booked on your local clock, including early mornings, after school, evenings and weekends.</p>
          </div>
          <div className="mt-8">
            <Table
              head={["Country", "Time zones covered", "Monthly fee from"]}
              rows={countryLandings.map((l) => [
                <Link key={l.slug} href={`/${l.slug}`} className="link font-semibold">
                  Online Quran classes in {l.country!.name}
                </Link>,
                l.facts[1].value,
                money(l.country!.currency, lowest(l.country!.currency)),
              ])}
            />
          </div>
          <p className="mt-4 text-muted">Living somewhere else? We teach students in other countries too. Tell us your time zone on the trial form.</p>
        </div>
      </section>

      {/* Fees */}
      <section aria-labelledby="fees-heading">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <h2 id="fees-heading" className={h2}>
              Simple monthly fees
            </h2>
            <ul className="mt-6 space-y-3 text-muted">
              {pricingNotes.slice(0, 4).map((n) => (
                <li key={n} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-ok" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="link mt-6 inline-block font-semibold">
              Full fee details
            </Link>
          </div>
          <PricingTable minutes={site.classMinutes} />
        </div>
      </section>

      <Reviews />

      {/* FAQ */}
      <section className="border-t border-line bg-white" aria-labelledby="faq-heading">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <h2 id="faq-heading" className={h2}>
              Questions parents ask first
            </h2>
            <p className="mt-4 text-lg text-muted">
              More answers are on the{" "}
              <Link href="/faq" className="link">
                questions page
              </Link>
              .
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
        <JsonLd data={faqSchema(homeFaqs)} />
      </section>

      {/* Guides */}
      <section aria-labelledby="guides-heading">
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="guides-heading" className={h2}>
              Guides for parents and learners
            </h2>
            <Link href="/blog" className="link font-semibold">
              All guides
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <li key={p.slug} className="border-t-2 border-ink pt-4">
                <h3 className="text-[1.25rem]">
                  <Link href={`/blog/${p.slug}`} className="underline-offset-4 hover:underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">Page last reviewed {longDate(site.lastUpdated)}.</p>
        </div>
      </section>

      <TrialSection source="home" />
    </>
  );
}
