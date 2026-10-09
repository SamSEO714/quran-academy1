import Link from "next/link";
import { notFound } from "next/navigation";
import { meta, longDate } from "@/lib/seo";
import { site } from "@/content/site";
import { courses, getCourse } from "@/content/courses";
import { plans, money } from "@/content/pricing";
import { courseSchema, faqSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { Table } from "@/components/Blocks";
import { TrialCard } from "@/components/TrialForm";
import { SideNav, TrialSection } from "@/components/Sections";

export const dynamicParams = false;
export const generateStaticParams = () => courses.map((c) => ({ slug: c.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const c = getCourse((await params).slug);
  if (!c) return {};
  return meta({ title: c.metaTitle, description: c.metaDescription, path: `/courses/${c.slug}` });
}

const h2 = "text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]";

export default async function CoursePage({ params }: Props) {
  const c = getCourse((await params).slug);
  if (!c) notFound();
  const next = c.next ? getCourse(c.next) : undefined;
  const others = courses.filter((x) => x.slug !== c.slug && x.slug !== c.next).slice(0, 3);

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_27rem] lg:py-14">
          <div>
            <Breadcrumbs
              items={[
                { name: "Courses", path: "/courses" },
                { name: c.name, path: `/courses/${c.slug}` },
              ]}
            />
            <h1 className="mt-4 text-[clamp(2rem,1.3rem+2.8vw,3.1rem)]">{c.h1}</h1>
            <p className="mt-5 max-w-2xl text-[1.2rem] leading-relaxed text-muted">{c.answer}</p>

            <dl className="mt-8 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["Who it is for", c.ages],
                ["Starting level", c.level],
                ["Typical duration", c.duration],
                ["Classes", `${c.schedule}, one-to-one`],
              ].map(([k, v]) => (
                <div key={k} className="border-l-2 border-gold pl-4">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="font-semibold leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:pt-6">
            <TrialCard source={`course:${c.slug}`} defaultCourse={c.name} />
          </div>
        </div>
      </div>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:py-20">
      <article className="max-w-[56rem]">
        <section>
          <h2 id="who" className={h2}>Is this course right for you?</h2>
          <ul className="mt-5 grid gap-3">
            {c.forWho.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-sans text-sm font-semibold tracking-normal text-muted">Before you start</h3>
              <p className="mt-1.5">{c.before}</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-sans text-sm font-semibold tracking-normal text-muted">When you finish</h3>
              <p className="mt-1.5">{c.after}</p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 id="syllabus" className={h2}>What you will learn</h2>
          <ol className="mt-6 border-t border-line">
            {c.syllabus.map((s, i) => (
              <li key={s.title} className="grid gap-x-6 gap-y-1 border-b border-line py-5 md:grid-cols-[2.5rem_1fr_1.4fr]">
                <span className="font-display text-xl text-gold-deep">{i + 1}</span>
                <h3 className="font-sans text-[1.08rem] font-semibold tracking-normal">{s.title}</h3>
                <p className="text-muted">{s.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 id="method" className={h2}>How the course is taught</h2>
          <ul className="mt-5 grid gap-3">
            {c.howTaught.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 id="fees" className={h2}>Fees for {c.name}</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Monthly fees for one-to-one classes of {site.classMinutes} minutes. The first {site.trial.classes} classes are free. See the{" "}
            <Link href="/pricing" className="link">
              fees page
            </Link>{" "}
            for details.
          </p>
          <div className="mt-5">
            <Table
              head={["Plan", "USA", "UK", "Australia", "Canada"]}
              rows={plans.map((p) => [p.name, money("USD", p.prices.USD), money("GBP", p.prices.GBP), money("AUD", p.prices.AUD), money("CAD", p.prices.CAD)])}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 id="questions" className={h2}>Questions about {c.name}</h2>
          <div className="mt-5">
            <FaqList faqs={c.faqs} />
          </div>
        </section>

        <section className="mt-14">
          {next && (
            <>
              <h2 className={h2}>What comes next</h2>
              <p className="mb-12 mt-4 max-w-2xl border-l-2 border-gold pl-5">
                <Link href={`/courses/${next.slug}`} className="font-display text-[1.2rem] font-semibold underline-offset-4 hover:underline">
                  {next.name}
                </Link>
                <span className="mt-1 block text-muted">{next.summary}</span>
              </p>
            </>
          )}
          <h2 className={h2}>Other courses</h2>
          <ul className="mt-5 grid gap-6 md:grid-cols-3">
            {others.map((x) => (
              <li key={x.slug} className="border-l-2 border-gold pl-5">
                <Link href={`/courses/${x.slug}`} className="font-display text-[1.2rem] font-semibold underline-offset-4 hover:underline">
                  {x.name}
                </Link>
                <p className="mt-1 text-muted">{x.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">Last reviewed {longDate(site.lastUpdated)}.</p>
        </section>
      </article>
      <SideNav
        items={[
          { id: "who", label: "Is this course right for you?" },
          { id: "syllabus", label: "What you will learn" },
          { id: "method", label: "How it is taught" },
          { id: "fees", label: "Fees" },
          { id: "questions", label: "Questions" },
        ]}
      />
      </div>

      <JsonLd data={[courseSchema(c), faqSchema(c.faqs)]} />
      <TrialSection source={`course:${c.slug}`} defaultCourse={c.name} />
    </>
  );
}
