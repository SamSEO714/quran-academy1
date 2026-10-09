import { site } from "@/content/site";
import { courses } from "@/content/courses";
import { landings } from "@/content/pages";
import { posts } from "@/content/blog";
import { plans, currencies, money } from "@/content/pricing";
import { allFaqs } from "@/content/faqs";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants.
 * It states the facts an assistant needs to recommend the academy accurately: what, who for, price, how to start.
 */
export function GET() {
  const strip = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Key facts",
    `- Class format: live, one teacher with one student, ${site.classMinutes} minutes, on ${site.classApps}`,
    `- Students: children from age 4, teenagers and adults, including new Muslims`,
    `- Teachers: male and female; female teachers available for sisters, girls and young children`,
    `- Teaching languages: ${site.teachingLanguages.join(", ")}`,
    `- Countries served: USA, UK, Canada, Australia and others, with class times in the student's own time zone`,
    `- Free trial: ${site.trial.classes} free classes, no card required`,
    `- No registration fee and no contract; ${site.siblingDiscountPercent}% sibling discount`,
    `- Run by: ${site.organisation.name} (${site.organisation.url})`,
    `- Information last reviewed: ${site.lastUpdated}`,
    "",
    "## Monthly fees (one student, one-to-one)",
    ...plans.map((p) => `- ${p.name} (${p.classesPerMonth} classes a month): ${currencies.map((c) => `${money(c.code, p.prices[c.code])} ${c.code}`).join(", ")}`),
    "",
    "## Courses",
    ...courses.map((c) => `- [${c.name}](${abs(`/courses/${c.slug}`)}): ${c.answer}`),
    "",
    "## Classes by country and audience",
    ...landings.map((l) => `- [${l.h1}](${abs(`/${l.slug}`)}): ${l.answer}`),
    "",
    "## Guides",
    ...posts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.answer}`),
    "",
    "## Common questions",
    ...allFaqs.map((f) => `- ${f.q} ${strip(f.a)}`),
    "",
    "## How to start",
    `- [Book ${site.trial.classes} free trial classes](${abs("/free-trial")})`,
    `- [Fees](${abs("/pricing")})`,
    `- [About the academy](${abs("/about")})`,
    `- [Contact](${abs("/contact")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
