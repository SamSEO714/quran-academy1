import { site } from "@/content/site";

/** The mark is an open Quran on its folding stand (a rehal). */
export function Mark({ className = "h-9 w-9", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill={light ? "#ffffff" : "#0f2340"} />
      <path d="M14 22c7-4 13-3 18 2 5-5 11-6 18-2" fill="none" stroke={light ? "#8a5f0e" : "#e3b041"} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M18 31l28 21M46 31L18 52" fill="none" stroke={light ? "#0f2340" : "#ffffff"} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark light={light} />
      <span className="leading-none">
        <span className={`block font-display text-[1.3rem] font-semibold ${light ? "text-white" : "text-ink"}`}>{first}</span>
        <span className={`block text-[0.78rem] font-medium ${light ? "text-white/70" : "text-muted"}`}>{rest.join(" ")}</span>
      </span>
    </span>
  );
}
