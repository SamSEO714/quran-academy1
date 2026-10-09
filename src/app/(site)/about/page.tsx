import Link from "next/link";
import { meta } from "@/lib/seo";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHead, TrialSection } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { abs } from "@/lib/seo";

export const metadata = meta({
  title: `About ${site.name}`,
  description: `Who ${site.name} is, how teachers are chosen, how classes are run and how children are kept safe in online one-to-one Quran classes.`,
  path: "/about",
});

const h2 = "text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]";

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={<Breadcrumbs items={[{ name: "About", path: "/about" }]} />}
        title={`About ${site.name}`}
        lead={`${site.name} is an online academy that teaches the Quran one-to-one to children and adults, mainly in the USA, UK, Canada and Australia. It is a project of ${site.organisation.name}. A rehal is the folding stand a Quran rests on while it is read, and Pajee is a Punjabi word of respect for an elder brother, the one in the family who helps the younger ones learn. Together they say what we are here for: an open mushaf, and a teacher who looks out for the student.`}
      />

      <div className="wrap max-w-[56rem] py-12 lg:py-16">
        {site.story && (
          <section className="mb-14">
            <h2 className={h2}>Our story</h2>
            <p className="mt-4 max-w-[68ch] text-lg">{site.story}</p>
          </section>
        )}

        <section>
          <h2 className={h2}>What we believe about teaching the Quran</h2>
          <blockquote className="mt-5 border-l-4 border-gold bg-white px-6 py-5">
            <p className="font-display text-[1.3rem] leading-snug">“The best of you are those who learn the Quran and teach it.”</p>
            <footer className="mt-2 text-sm text-muted">The Prophet Muhammad, peace be upon him. Sahih al-Bukhari 5027.</footer>
          </blockquote>
          <ul className="mt-6 max-w-[68ch] list-disc space-y-3 pl-5 marker:text-gold-deep">
            <li>The Quran has always been passed from one teacher to one student, by listening and correcting. A video call keeps that method intact.</li>
            <li>A student should read for most of the class. A teacher who lectures for thirty minutes has not taught reading.</li>
            <li>Mistakes are corrected the moment they are made, kindly, and again next class until they are gone.</li>
            <li>Parents should always know where their child is and what comes next.</li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className={h2}>How we choose teachers</h2>
          <ol className="mt-5 max-w-[68ch] list-decimal space-y-3 pl-5 marker:font-semibold marker:text-gold-deep">
            <li>Formal Quran study is required. Hifz teachers are huffaz, and Ijazah teachers hold an Ijazah with a sanad.</li>
            <li>Each applicant recites to a senior teacher, who tests Tajweed in practice and in theory.</li>
            <li>Each applicant teaches a demonstration class in English and is assessed on clarity and patience.</li>
            <li>New teachers are observed in their first weeks, and every teacher is observed at intervals after that.</li>
          </ol>
        </section>

        {site.teachers.length > 0 && (
          <section className="mt-14">
            <h2 className={h2}>Meet the teachers</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {site.teachers.map((t) => (
                <li key={t.name} className="border-l-2 border-gold pl-5">
                  <h3 className="text-[1.25rem]">{t.name}</h3>
                  <p className="text-muted">{t.role}</p>
                  <p className="mt-2">{t.qualification}</p>
                  <p className="mt-1 text-sm text-muted">Teaches in {t.languages}</p>
                </li>
              ))}
            </ul>
            <JsonLd
              data={site.teachers.map((t) => ({
                "@context": "https://schema.org",
                "@type": "Person",
                name: t.name,
                jobTitle: t.role,
                description: t.qualification,
                knowsLanguage: t.languages,
                worksFor: { "@id": `${site.url}/#organization` },
                url: abs("/about"),
              }))}
            />
          </section>
        )}

        <section className="mt-14">
          <h2 className={h2}>Keeping children safe online</h2>
          <ul className="mt-5 max-w-[68ch] list-disc space-y-3 pl-5 marker:text-gold-deep">
            <li>Parents are welcome in every class, and we ask that an adult is at home whenever a child is learning.</li>
            <li>The same teacher takes every class, so your child is never handed to a stranger.</li>
            <li>Teachers contact the family through the parent, not the child.</li>
            <li>Classes are not recorded unless the parent asks.</li>
            <li>Girls and sisters can choose a female teacher.</li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className={h2}>What we teach</h2>
          <p className="mt-4 max-w-[68ch]">
            Eight courses: Noorani Qaida, Quran reading, Tajweed, Hifz, Ijazah, Translation and Tafseer, Quranic Arabic and Islamic studies for children. See{" "}
            <Link href="/courses" className="link">
              all courses
            </Link>{" "}
            and{" "}
            <Link href="/pricing" className="link">
              fees
            </Link>
            .
          </p>
        </section>
      </div>

      <TrialSection source="about" />
    </>
  );
}
