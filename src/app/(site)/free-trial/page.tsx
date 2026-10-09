import { meta } from "@/lib/seo";
import { site, whatsappLink } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrialForm } from "@/components/TrialForm";
import { FaqList } from "@/components/Faq";
import { allFaqs } from "@/content/faqs";

export const metadata = meta({
  title: `Book ${site.trial.classes} Free Trial Quran Classes Online`,
  description: `Book ${site.trial.classes} free one-to-one online Quran classes for your child or yourself. No card needed. Choose your course, a male or female teacher and class times in your time zone.`,
  path: "/free-trial",
});

const trialFaqs = allFaqs.filter((f) => ["Are the trial classes really free?", "How soon can we start?", "What do I need for a class?", "Which course should I choose?"].includes(f.q));

export default function FreeTrialPage() {
  const wa = whatsappLink();
  return (
    <div className="wrap grid gap-12 py-10 lg:grid-cols-[1fr_32rem] lg:py-16">
      <div>
        <Breadcrumbs items={[{ name: "Free trial", path: "/free-trial" }]} />
        <h1 className="mt-4 text-[clamp(2rem,1.3rem+3vw,3.2rem)]">Book {site.trial.classes} free trial Quran classes</h1>
        <p className="mt-5 max-w-xl text-[1.2rem] leading-relaxed text-muted">
          Try {site.trial.classes} full one-to-one classes of {site.trial.minutes} minutes with a teacher matched to the student. There is nothing to pay and no card to enter. If you want to continue afterwards, you choose a monthly plan.
        </p>

        <h2 className="mt-10 text-[1.5rem]">What happens after you send the form</h2>
        <ol className="mt-5 space-y-5">
          {[
            ["We reply within one working day", "By WhatsApp, phone or email, to confirm a teacher and a time in your time zone."],
            ["Class one: level check", "The teacher listens to the student read and tells you where to start."],
            ["Classes two and three: real lessons", "The student starts learning from the right place, so you see how the classes actually run."],
            ["You decide", "Continue on a monthly plan or stop. Either way the trial costs nothing."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-lg text-gold">{i + 1}</span>
              <span>
                <strong className="block text-[1.1rem] font-semibold">{t}</strong>
                <span className="text-muted">{d}</span>
              </span>
            </li>
          ))}
        </ol>

        {wa && (
          <p className="mt-8">
            Rather talk first?{" "}
            <a href={wa} rel="noopener" className="link font-semibold">
              Message us on WhatsApp
            </a>
          </p>
        )}

        <h2 className="mt-12 text-[1.5rem]">Before you book</h2>
        <div className="mt-4">
          <FaqList faqs={trialFaqs} />
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="arch border border-line bg-white px-5 pb-6 pt-14 shadow-[0_18px_50px_rgb(15_35_64/0.12)] sm:px-7 sm:pt-16">
          <h2 className="mb-5 text-center text-[1.45rem]">Your trial request</h2>
          <TrialForm source="free-trial" variant="full" />
        </div>
      </div>
    </div>
  );
}
