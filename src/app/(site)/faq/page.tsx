import { meta, longDate } from "@/lib/seo";
import { site } from "@/content/site";
import { faqGroups, allFaqs } from "@/content/faqs";
import { faqSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { PageHead, TrialSection } from "@/components/Sections";

export const metadata = meta({
  title: "Online Quran Classes: Questions and Answers",
  description: `Answers to the questions families ask about online Quran classes at ${site.name}: how classes work, teachers, fees, schedules, ages and progress.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHead
        crumbs={<Breadcrumbs items={[{ name: "Questions", path: "/faq" }]} />}
        title="Questions about online Quran classes"
        lead="Short, direct answers on how the classes work, who teaches them, what they cost and how fast students progress."
      />
      <div className="wrap max-w-[56rem] py-12 lg:py-16">
        {faqGroups.map((g) => (
          <section key={g.title} className="mb-12">
            <h2 className="mb-4 text-[1.6rem]">{g.title}</h2>
            <FaqList faqs={g.items} />
          </section>
        ))}
        <p className="text-sm text-muted">Last reviewed {longDate(site.lastUpdated)}.</p>
      </div>
      <JsonLd data={faqSchema(allFaqs)} />
      <TrialSection source="faq" />
    </>
  );
}
