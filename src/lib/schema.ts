import { site } from "@/content/site";
import { plans, lowest, highest } from "@/content/pricing";
import type { Course } from "@/content/courses";
import type { Landing } from "@/content/pages";
import type { Post } from "@/content/blog";
import type { Faq, Currency } from "@/content/types";
import { abs } from "./seo";

/** Structured data (JSON-LD). Helps Google rich results and gives AI engines clean, citable facts. */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const stripLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

const sameAs = Object.values(site.social).filter(Boolean);

const rating = () => {
  if (!site.reviews.length) return {};
  const avg = site.reviews.reduce((s, r) => s + r.rating, 0) / site.reviews.length;
  return {
    aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: site.reviews.length, bestRating: 5 },
    review: site.reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
  };
};

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  logo: abs("/icon.svg"),
  description: site.description,
  parentOrganization: { "@type": "Organization", name: site.organisation.name, url: site.organisation.url },
  areaServed: ["US", "GB", "AU", "CA"].map((c) => ({ "@type": "Country", name: c })),
  knowsAbout: ["Quran recitation", "Tajweed", "Hifz (Quran memorization)", "Noorani Qaida", "Quranic Arabic", "Tafseer", "Ijazah"],
  knowsLanguage: site.teachingLanguages,
  ...(sameAs.length ? { sameAs } : {}),
  ...(site.email || site.whatsapp
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "admissions",
          ...(site.email ? { email: site.email } : {}),
          ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
          availableLanguage: site.teachingLanguages,
        },
      }
    : {}),
  ...(site.address ? { address: site.address } : {}),
  ...rating(),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) } })),
});

const offer = (currency: Currency) => ({
  "@type": "AggregateOffer",
  priceCurrency: currency,
  lowPrice: lowest(currency),
  highPrice: highest(currency),
  offerCount: plans.length,
  category: "Paid",
  url: abs("/pricing"),
});

export const courseSchema = (c: Course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${abs(`/courses/${c.slug}`)}#course`,
  name: c.h1,
  description: c.answer,
  url: abs(`/courses/${c.slug}`),
  provider: { "@id": ORG_ID, "@type": "EducationalOrganization", name: site.name, url: site.url },
  inLanguage: "en",
  educationalLevel: c.level,
  teaches: c.syllabus.map((s) => s.title),
  coursePrerequisites: c.before,
  typicalAgeRange: c.ages,
  availableLanguage: site.teachingLanguages,
  offers: offer("USD"),
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT1H30M",
    instructor: { "@type": "Organization", name: `${site.name} teachers` },
  },
});

export const landingSchema = (l: Landing) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${abs(`/${l.slug}`)}#service`,
  name: l.h1,
  serviceType: "Online Quran classes",
  description: l.answer,
  url: abs(`/${l.slug}`),
  provider: { "@id": ORG_ID },
  areaServed: l.country
    ? { "@type": "Country", name: l.country.code }
    : ["US", "GB", "AU", "CA"].map((c) => ({ "@type": "Country", name: c })),
  offers: offer(l.country?.currency ?? "USD"),
});

export const articleSchema = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  datePublished: p.date,
  dateModified: p.updated,
  mainEntityOfPage: abs(`/blog/${p.slug}`),
  url: abs(`/blog/${p.slug}`),
  image: abs("/opengraph-image"),
  author: { "@id": ORG_ID, "@type": "Organization", name: site.name, url: abs("/about") },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
});

export const pricingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: `${site.name} monthly fees`,
  url: abs("/pricing"),
  itemListElement: plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name}, ${site.classMinutes}-minute one-to-one classes`,
    price: p.prices.USD,
    priceCurrency: "USD",
    eligibleQuantity: { "@type": "QuantitativeValue", value: p.classesPerMonth, unitText: "classes per month" },
    seller: { "@id": ORG_ID },
  })),
});
