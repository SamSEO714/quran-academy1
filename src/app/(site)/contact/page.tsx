import { meta } from "@/lib/seo";
import { site, whatsappLink } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrialForm } from "@/components/TrialForm";

export const metadata = meta({
  title: `Contact ${site.name}`,
  description: `Contact ${site.name} about online Quran classes, fees, teachers or your current classes. We reply within one working day.`,
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappLink("Assalamu alaikum, I have a question about your Quran classes.");
  return (
    <div className="wrap grid gap-12 py-10 lg:grid-cols-[1fr_32rem] lg:py-16">
      <div>
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <h1 className="mt-4 text-[clamp(2rem,1.3rem+3vw,3.2rem)]">Contact us</h1>
        <p className="mt-5 max-w-xl text-[1.2rem] leading-relaxed text-muted">Ask about courses, fees, teachers or class times. Send the form and we will reply within one working day.</p>

        <dl className="mt-10 grid max-w-xl gap-6">
          {wa && (
            <div className="border-l-2 border-gold pl-5">
              <dt className="text-sm text-muted">WhatsApp</dt>
              <dd>
                <a href={wa} rel="noopener" className="link text-[1.15rem] font-semibold">
                  +{site.whatsapp}
                </a>
              </dd>
            </div>
          )}
          {site.email && (
            <div className="border-l-2 border-gold pl-5">
              <dt className="text-sm text-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link text-[1.15rem] font-semibold">
                  {site.email}
                </a>
              </dd>
            </div>
          )}
          {site.address && (
            <div className="border-l-2 border-gold pl-5">
              <dt className="text-sm text-muted">Address</dt>
              <dd className="text-[1.1rem]">{site.address}</dd>
            </div>
          )}
          <div className="border-l-2 border-gold pl-5">
            <dt className="text-sm text-muted">Where we teach</dt>
            <dd className="text-[1.1rem]">Online, for students in the USA, UK, Canada, Australia and other countries</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_18px_50px_rgb(15_35_64/0.1)] sm:p-7">
        <h2 className="mb-5 text-[1.45rem]">Send us a message</h2>
        <TrialForm source="contact" variant="full" submitLabel="Send message" />
      </div>
    </div>
  );
}
