import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { courses } from "@/content/courses";
import { landings } from "@/content/pages";
import { legals } from "@/content/legal";
import { posts } from "@/content/blog";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const last = site.lastUpdated;
  const page = (path: string, priority: number, lastModified = last): MetadataRoute.Sitemap[number] => ({ url: abs(path), lastModified, changeFrequency: "monthly", priority });
  return [
    page("/", 1),
    page("/free-trial", 0.9),
    page("/pricing", 0.9),
    page("/courses", 0.9),
    ...courses.map((c) => page(`/courses/${c.slug}`, 0.8)),
    ...landings.map((l) => page(`/${l.slug}`, 0.9)),
    page("/about", 0.6),
    page("/faq", 0.7),
    page("/contact", 0.5),
    page("/blog", 0.7),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.7, p.updated)),
    ...legals.map((l) => page(`/${l.slug}`, 0.2)),
  ];
}
