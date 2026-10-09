import Link from "next/link";
import { meta, longDate } from "@/lib/seo";
import { site } from "@/content/site";
import { posts } from "@/content/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHead, TrialSection } from "@/components/Sections";

export const metadata = meta({
  title: "Quran Learning Guides for Parents and Adults",
  description: `Practical guides from ${site.name}: what online Quran classes cost, when a child should start, how long Hifz takes, Tajweed rules for beginners and how to choose a teacher.`,
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <PageHead
        crumbs={<Breadcrumbs items={[{ name: "Guides", path: "/blog" }]} />}
        title="Guides for parents and learners"
        lead="Straight answers to the questions families ask before and during Quran study."
      />
      <div className="wrap max-w-[60rem] py-12 lg:py-16">
        <ul className="border-t border-line">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-line py-7">
              <h2 className="text-[1.55rem]">
                <Link href={`/blog/${p.slug}`} className="underline-offset-4 hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[68ch] text-muted">{p.description}</p>
              <p className="mt-2 text-sm text-muted">
                Updated {longDate(p.updated)}, {p.minutes} minute read
              </p>
            </li>
          ))}
        </ul>
      </div>
      <TrialSection source="blog" />
    </>
  );
}
