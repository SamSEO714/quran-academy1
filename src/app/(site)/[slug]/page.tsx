import { notFound } from "next/navigation";
import { meta, abs, longDate } from "@/lib/seo";
import { site } from "@/content/site";
import { landings, getLanding, countryLandings } from "@/content/pages";
import { legals, getLegal } from "@/content/legal";
import { faqSchema, landingSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Blocks, slugify } from "@/components/Blocks";
import { FaqList } from "@/components/Faq";
import { TrialCard } from "@/components/TrialForm";
import { Facts, PageHead, SideNav, TrialSection } from "@/components/Sections";

/**
 * One route for every top-level content page:
 * country pages, audience pages (kids, adults, female teachers) and the policy pages.
 */
export const dynamicParams = false;
export const generateStaticParams = () => [...landings, ...legals].map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const l = getLanding(slug);
  if (l) {
    // Country pages are regional versions of the same offer, so they point at each other with hreflang.
    const languages = l.country ? Object.fromEntries(countryLandings.map((c) => [c.country!.hreflang, abs(`/${c.slug}`)])) : undefined;
    return meta({ title: l.metaTitle, description: l.metaDescription, path: `/${l.slug}`, languages });
  }
  const legal = getLegal(slug);
  if (legal) return meta({ title: legal.title, description: legal.description, path: `/${legal.slug}` });
  return {};
}

export default async function TopLevelPage({ params }: Props) {
  const { slug } = await params;
  const l = getLanding(slug);

  if (!l) {
    const legal = getLegal(slug);
    if (!legal) notFound();
    return (
      <>
        <PageHead crumbs={<Breadcrumbs items={[{ name: legal.title, path: `/${legal.slug}` }]} />} title={legal.title} />
        <div className="wrap max-w-[52rem] py-12 lg:py-16">
          <Blocks blocks={legal.blocks} />
        </div>
      </>
    );
  }

  const source = `landing:${l.slug}`;
  const defaults = { defaultCountry: l.country?.formCountry, defaultCourse: l.formCourse, defaultStudent: l.formStudent, defaultTeacher: l.formTeacher };

  return (
    <>
      <div className="on-ink lattice bg-ink text-white">
        <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_28rem] lg:items-start lg:py-16">
          <div>
            <Breadcrumbs light items={[{ name: l.kind === "country" ? `Online Quran classes ${l.nav}` : l.nav, path: `/${l.slug}` }]} />
            <h1 className="mt-5 text-[clamp(2.1rem,1.3rem+3.2vw,3.4rem)] leading-[1.08]">{l.h1}</h1>
            <p className="mt-6 max-w-2xl text-[1.17rem] leading-relaxed text-white/85">{l.answer}</p>
            <div className="mt-9 max-w-2xl">
              <Facts light items={l.facts} />
            </div>
          </div>
          <TrialCard source={source} {...defaults} />
        </div>
      </div>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:py-16">
      <article className="max-w-[56rem] [&_.prose-q>h2:first-child]:mt-0">
        <Blocks blocks={l.blocks} />

        <section className="mt-14">
          <h2 id="questions" className="text-[clamp(1.5rem,1.2rem+1.2vw,1.95rem)]">{l.country ? `Questions from families in ${l.country.name}` : "Common questions"}</h2>
          <div className="mt-5">
            <FaqList faqs={l.faqs} />
          </div>
        </section>
        <p className="mt-10 text-sm text-muted">Last reviewed {longDate(site.lastUpdated)}.</p>
      </article>
      <SideNav items={[...l.blocks.filter((b) => b.type === "h2").map((b) => ({ id: slugify((b as { text: string }).text), label: (b as { text: string }).text })), { id: "questions", label: "Questions" }]} />
      </div>

      <JsonLd data={[landingSchema(l), faqSchema(l.faqs)]} />
      <TrialSection source={source} {...defaults} />
    </>
  );
}
