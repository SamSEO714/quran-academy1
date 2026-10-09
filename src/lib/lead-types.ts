export const STATUSES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "trial_booked", label: "Trial booked" },
  { id: "trial_done", label: "Trial done" },
  { id: "enrolled", label: "Enrolled" },
  { id: "lost", label: "Lost" },
] as const;

export type LeadStatus = (typeof STATUSES)[number]["id"];

export const statusLabel = (id: string) => STATUSES.find((s) => s.id === id)?.label ?? id;

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  notes: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  course: string;
  studentFor: string;
  studentAge: string;
  teacherPref: string;
  preferredTime: string;
  timezone: string;
  message: string;
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
};

export type LeadInput = Omit<Lead, "id" | "createdAt" | "updatedAt" | "status" | "notes">;

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "New Zealand",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Norway",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "South Africa",
  "Singapore",
  "Malaysia",
  "Pakistan",
  "India",
  "Other",
];

export const TEACHER_PREFS = ["No preference", "Female teacher", "Male teacher"];
export const STUDENT_FOR = ["My child", "Myself", "My child and myself"];

/** Where a lead came from, in one readable word, for the dashboard. */
export function leadChannel(l: Pick<Lead, "utmSource" | "utmMedium" | "gclid" | "fbclid" | "referrer">): string {
  const src = l.utmSource.toLowerCase();
  const med = l.utmMedium.toLowerCase();
  if (l.gclid || (src.includes("google") && /cpc|ppc|paid/.test(med))) return "Google Ads";
  if (l.fbclid || /facebook|instagram|meta|fb|ig/.test(src)) return "Meta Ads";
  if (src.includes("tiktok")) return "TikTok";
  if (src) return l.utmSource;
  const ref = l.referrer.toLowerCase();
  if (!ref) return "Direct";
  if (/google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|brave\./.test(ref)) return "Organic search";
  if (/chatgpt\.|openai\.|perplexity\.|claude\.ai|gemini\.google|copilot\.microsoft/.test(ref)) return "AI assistant";
  if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com|youtube\.|tiktok\.|linkedin\./.test(ref)) return "Social";
  try {
    return new URL(l.referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Referral";
  }
}
