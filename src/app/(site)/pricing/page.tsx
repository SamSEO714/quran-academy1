import { meta, longDate } from "@/lib/seo";
import { site } from "@/content/site";
import { plans, money, lowest, pricingNotes, currencies, perClass } from "@/content/pricing";
import { pricingFaqs } from "@/content/faqs";
import { faqSchema, pricingSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { Table } from "@/components/Blocks";
import { PricingTable } from "@/components/PricingTable";
import { PageHead, TrialSection } from "@/components/Sections";

export const metadata = meta({
  title: "Online Quran Classes Fees: Monthly Prices by Country",
  description: `Monthly fees for one-to-one online Quran classes: from ${money("USD", lowest("USD"))} in the USA, ${money("GBP", lowest("GBP"))} in the UK, ${money("AUD", lowest("AUD"))} in Australia and ${money("CAD", lowest("CAD"))} in Canada. No registration fee. ${site.trial.classes} free trial classes.`,
  path: "/pricing",
});

const h2 = "text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]";

export default function PricingPage() {
  return (
    <>
      <PageHead
        crumbs={<Breadcrumbs items={[{ name: "Fees", path: "/pricing" }]} />}
        title="Fees for online Quran classes"
        lead={`One-to-one classes at ${site.name} cost ${money("USD", lowest("USD"))} a month for 2 classes a week, ${money("USD", plans[1].prices.USD)} for 3 and ${money("USD", plans[2].prices.USD)} for 5. Each class is ${site.classMinutes} minutes with your own teacher. There is no registration fee, and the first ${site.trial.classes} classes are free.`}
      />

      <div className="wrap max-w-[62rem] py-12 lg:py-16">
        <PricingTable minutes={site.classMinutes} />

        <section className="mt-14">
          <h2 className={h2}>What every plan includes</h2>
          <ul className="mt-5 grid gap-3">
            {pricingNotes.map((n) => (
              <li key={n} className="flex gap-3">
                <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-ok" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className={h2}>All fees by country</h2>
          <p className="mt-3 text-muted">Monthly fee for one student, with the price of a single {site.classMinutes}-minute class in brackets.</p>
          <div className="mt-5">
            <Table
              head={["Plan", ...currencies.map((c) => `${c.country} (${c.code})`)]}
              rows={plans.map((p) => [p.name, ...currencies.map((c) => `${money(c.code, p.prices[c.code])} (${money(c.code, Math.round(perClass(p, c.code) * 100) / 100)})`)])}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className={h2}>Which plan should I choose?</h2>
          <div className="mt-5">
            <Table
              head={["Your situation", "Plan that fits"]}
              rows={[
                ["A child starting Noorani Qaida or Quran reading", plans[1].name],
                ["A child who also attends a weekend madrasah", plans[0].name],
                ["An adult learning around work", `${plans[0].name} or ${plans[1].name.toLowerCase()}`],
                ["A Hifz or Ijazah student", plans[2].name],
                ["You want to finish a level before the school year starts", plans[2].name],
              ]}
            />
          </div>
          <p className="mt-4 text-muted">You can move between plans at the start of any month.</p>
        </section>

        <section className="mt-14">
          <h2 className={h2}>Questions about fees</h2>
          <div className="mt-5">
            <FaqList faqs={pricingFaqs} />
          </div>
          <p className="mt-10 text-sm text-muted">Fees last reviewed {longDate(site.lastUpdated)}.</p>
        </section>
      </div>

      <JsonLd data={[pricingSchema(), faqSchema(pricingFaqs)]} />
      <TrialSection source="pricing" />
    </>
  );
}
