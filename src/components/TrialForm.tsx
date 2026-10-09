import { LeadForm } from "./LeadForm";
import { courses } from "@/content/courses";
import { site } from "@/content/site";

type Props = Omit<React.ComponentProps<typeof LeadForm>, "courses" | "trialClasses">;

/** Server wrapper so pages do not have to pass the course list each time. */
export function TrialForm(props: Props) {
  return <LeadForm {...props} courses={courses.map((c) => c.name)} trialClasses={site.trial.classes} />;
}

/** The form inside the arch-topped card used on landing pages and the home page. */
export function TrialCard({ title, ...props }: Props & { title?: string }) {
  return (
    <div className="arch border border-line bg-white px-5 pb-6 pt-14 text-ink shadow-[0_18px_50px_rgb(15_35_64/0.12)] sm:px-7 sm:pt-16">
      <h2 className="text-center text-[1.45rem]">{title ?? `Book ${site.trial.classes} free trial classes`}</h2>
      <p className="mx-auto mb-5 mt-1.5 max-w-xs text-center text-[0.95rem] text-muted">Tell us who is learning and when. We will match a teacher.</p>
      <TrialForm {...props} />
    </div>
  );
}
