import Link from "next/link";
import { meta } from "@/lib/seo";
import { site } from "@/content/site";
import { courses, pathCourses, sideCourses } from "@/content/courses";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHead, TrialSection } from "@/components/Sections";
import { Table } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { abs } from "@/lib/seo";

export const metadata = meta({
  title: "Online Quran Courses: Qaida, Tajweed, Hifz, Ijazah",
  description: `All ${courses.length} online Quran courses at ${site.name}: Noorani Qaida, Quran reading, Tajweed, Hifz, Ijazah, Tafseer, Quranic Arabic and Islamic studies. One-to-one, with ${site.trial.classes} free trial classes.`,
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      <PageHead
        crumbs={<Breadcrumbs items={[{ name: "Courses", path: "/courses" }]} />}
        title="Online Quran courses, taught one-to-one"
        lead={`${site.name} offers ${courses.length} courses. Five form a path from the Arabic alphabet to Ijazah. Three more, in Tafseer, Quranic Arabic and Islamic studies, can be taken alongside at any stage. Every course is a live private class of ${site.classMinutes} minutes.`}
      />

      <section className="wrap py-14 lg:py-20">
        <h2 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.2rem)]">The learning path</h2>
        <ol className="mt-8 grid gap-0 border-t border-line">
          {pathCourses.map((c) => (
            <li key={c.slug} className="grid gap-x-8 gap-y-3 border-b border-line py-7 md:grid-cols-[3.5rem_1.1fr_1.5fr_auto] md:items-start">
              <span className="font-display text-[2.4rem] leading-none text-gold-deep">{c.step}</span>
              <div>
                <h3 className="text-[1.45rem]">
                  <Link href={`/courses/${c.slug}`} className="underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {c.level}. Ages {c.ages}.
                </p>
              </div>
              <p className="text-muted">{c.summary}</p>
              <Link href={`/courses/${c.slug}`} className="btn btn-line min-h-[2.6rem] justify-self-start">
                Course details
              </Link>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 text-[clamp(1.6rem,1.3rem+1.4vw,2.2rem)]">Alongside the path</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {sideCourses.map((c) => (
            <li key={c.slug} className="border-l-2 border-gold pl-5">
              <h3 className="text-[1.3rem]">
                <Link href={`/courses/${c.slug}`} className="underline-offset-4 hover:underline">
                  {c.name}
                </Link>
              </h3>
              <p className="mt-2 text-muted">{c.summary}</p>
              <p className="mt-2 text-sm text-muted">Ages {c.ages}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-[clamp(1.6rem,1.3rem+1.4vw,2.2rem)]">Compare all courses</h2>
        <div className="mt-6">
          <Table
            head={["Course", "Start level", "Ages", "Typical duration", "Classes a week"]}
            rows={courses.map((c) => [
              <Link key={c.slug} href={`/courses/${c.slug}`} className="link">
                {c.name}
              </Link>,
              c.level,
              c.ages,
              c.duration,
              c.schedule,
            ])}
          />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${site.name} courses`,
          itemListElement: courses.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: abs(`/courses/${c.slug}`) })),
        }}
      />
      <TrialSection source="courses" />
    </>
  );
}
