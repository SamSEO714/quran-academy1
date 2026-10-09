import type { Faq } from "@/content/types";
import { rich } from "./Blocks";

/** Questions are real headings and answers are in the HTML (not hidden behind script), so search and AI engines read them. */
export function FaqList({ faqs, heading = "h3" }: { faqs: Faq[]; heading?: "h2" | "h3" }) {
  const H = heading;
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <H className="font-sans text-[1.08rem] font-semibold leading-snug tracking-normal">{f.q}</H>
            <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-lg leading-none text-lapis transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[68ch] pb-5 text-muted">{rich(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
