import type { Metadata } from "next";
import { site } from "@/content/site";

export const abs = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

export function meta(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  absoluteTitle?: boolean;
  languages?: Record<string, string>;
  published?: string;
  modified?: string;
}): Metadata {
  const url = abs(opts.path);
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url, ...(opts.languages ? { languages: opts.languages } : {}) },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: opts.type ?? "website",
      ...(opts.type === "article" ? { publishedTime: opts.published, modifiedTime: opts.modified } : {}),
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

export const longDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
