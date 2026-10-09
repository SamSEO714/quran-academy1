/**
 * Everything about the academy that appears across the site lives here.
 * Change the name, contact details and offer in this one file.
 *
 * Rule for this file: only put in things that are true for your academy.
 * Empty values are hidden on the site, so nothing fake is ever shown.
 */

export type Review = {
  name: string; // e.g. "Amina K."
  location: string; // e.g. "Houston, USA"
  course: string; // e.g. "Noorani Qaida"
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // YYYY-MM-DD
};

export type Teacher = {
  name: string; // e.g. "Ustadha Maryam"
  role: string; // e.g. "Tajweed and Hifz teacher"
  qualification: string; // e.g. "Hafiza, Ijazah in Hafs an Asim, 8 years teaching"
  languages: string; // e.g. "English, Urdu"
};

export const site = {
  // TEMPORARY NAME. When the final name is chosen, change these two lines and the organisation name below.
  // A rehal is the folding wooden stand a Quran rests on while it is read.
  name: "Rehal Quran Academy",
  shortName: "Rehal",
  // The academy runs on a subdomain of the parent organisation's domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://quran.pajee.org").replace(/\/$/, ""),

  // The parent organisation. Shown as "A project of ..." in the footer and on the About page, and in schema.
  // Temporary too: change `name` when the organisation's registered name is final.
  organisation: {
    name: "Pajee Foundation",
    url: "https://pajee.org",
  },
  description:
    "Live one-to-one online Quran classes for kids and adults. Noorani Qaida, Quran reading, Tajweed, Hifz, Tafseer, Arabic and Ijazah with male and female teachers, timed for families in the USA, UK, Canada and Australia.",

  // Contact. Digits only for WhatsApp, with country code (no +, no spaces).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  // Optional postal address shown in the footer and in schema.
  address: "",

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  },

  // The offer. Used in headlines, forms, FAQs and schema.
  trial: { classes: 3, minutes: 30 },
  classMinutes: 30,
  classApps: "Zoom or Google Meet",
  teachingLanguages: ["English", "Urdu", "Arabic"],
  // Shown where families ask how fees are paid. Leave empty to hide the question.
  paymentMethods: "",
  siblingDiscountPercent: 10,

  // About page. Write two or three sentences on who runs the academy, where and since when.
  // Search engines and AI assistants trust sites that say who is behind them, so fill this in before launch.
  story: "",
  // Real teachers only. Add them and a "Meet the teachers" section appears on the About page.
  teachers: [] as Teacher[],

  // Real reviews only. Add them here and the reviews section and star-rating schema switch on by themselves.
  reviews: [] as Review[],

  // Shown as "Last reviewed" on key pages and used in the sitemap.
  lastUpdated: "2026-10-08",
};

export const whatsappLink = (text = "Assalamu alaikum, I would like to book free trial Quran classes.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";

export const trialLabel = `Book ${site.trial.classes} free trial classes`;
