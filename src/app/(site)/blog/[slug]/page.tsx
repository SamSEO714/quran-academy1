import Link from "next/link";
import { notFound } from "next/navigation";
import { meta, longDate } from "@/lib/seo";
import { site, trialLabel } from "@/content/site";
import { posts, getPost } from "@/content/blog";
import { courses } from "@/content/courses";
import { landings } from "@/content/pages";
import { articleSchema, faqSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Blocks, slugify } from "@/components/Blocks";
import { FaqList } from "@/components/Faq";
import { TrialSection } from "@/components/Sections";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return meta({ title: p.metaTitle, description: p.description, path: `/blog/${p.slug}`, type: "article", published: p.date, modified: p.updated });
}

const labelFor = (path: string) => {
  if (path === "/pricing") return "Fees for online Quran classes";
  if (path === "/free-trial") return trialLabel;
  if (path.startsWith("/courses/")) return courses.find((c) => `/courses/${c.slug}` === path)?.h1 ?? path;
  if (path.startsWith("/blog/")) return posts.find((x) => `/blog/${x.slug}` === path)?.title ?? path;
  return landings.find((l) => `/${l.slug}` === path)?.h1 ?? path;
};

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const toc = p.blocks.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);

  return (
    <>
      <article className="wrap max-w-[52rem] py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: "Guides", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ]}
        />
        <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.8vw,3.1rem)]">{p.title}</h1>
        <p className="mt-4 text-sm text-muted">
          By the {site.name} teaching team. Updated <time dateTime={p.updated}>{longDate(p.updated)}</time>, {p.minutes} minute read.
        </p>

        {/* The short answer comes first so people and AI assistants get it without scrolling */}
        <div className="mt-8 rounded-xl border-l-4 border-gold bg-white px-6 py-5">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">The short answer</h2>
          <p className="mt-1.5 text-[1.15rem] leading-relaxed">{p.answer}</p>
        </div>

        {toc.length > 2 && (
          <nav aria-label="In this guide" className="mt-8">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">In this guide</h2>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {toc.map((t) => (
                <li key={t}>
                  <a href={`#${slugify(t)}`} className="link">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-4">
          <Blocks blocks={p.blocks} />
        </div>

        <section className="mt-14">
          <h2 className="text-[1.7rem]">Related questions</h2>
          <div className="mt-5">
            <FaqList faqs={p.faqs} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-base font-semibold tracking-normal text-muted">Read next</h2>
          <ul className="mt-3 space-y-2">
            {p.related.map((r) => (
              <li key={r}>
                <Link href={r} className="link">
                  {labelFor(r)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <JsonLd data={[articleSchema(p), faqSchema(p.faqs)]} />
      <TrialSection source={`blog:${p.slug}`} />
    </>
  );
}
