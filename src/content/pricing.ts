import type { Currency } from "./types";
import { site } from "./site";

/**
 * Monthly fees for one-to-one classes of 30 minutes.
 * These are starting figures set against what online Quran academies charge in 2026.
 * Change them here and every page, FAQ and schema block updates.
 */
export type Plan = {
  id: string;
  name: string;
  perWeek: number;
  classesPerMonth: number;
  bestFor: string;
  prices: Record<Currency, number>;
};

export const plans: Plan[] = [
  {
    id: "two",
    name: "2 classes a week",
    perWeek: 2,
    classesPerMonth: 8,
    bestFor: "Busy adults and children who also attend a weekend madrasah",
    prices: { USD: 32, GBP: 25, AUD: 49, CAD: 44 },
  },
  {
    id: "three",
    name: "3 classes a week",
    perWeek: 3,
    classesPerMonth: 12,
    bestFor: "Noorani Qaida, Quran reading and Tajweed. The plan most families start on",
    prices: { USD: 45, GBP: 35, AUD: 69, CAD: 62 },
  },
  {
    id: "five",
    name: "5 classes a week",
    perWeek: 5,
    classesPerMonth: 20,
    bestFor: "Hifz and Ijazah students, and anyone who wants to finish faster",
    prices: { USD: 70, GBP: 55, AUD: 105, CAD: 95 },
  },
];

export const currencies: { code: Currency; symbol: string; label: string; country: string }[] = [
  { code: "USD", symbol: "$", label: "US dollars", country: "USA" },
  { code: "GBP", symbol: "£", label: "British pounds", country: "UK" },
  { code: "AUD", symbol: "A$", label: "Australian dollars", country: "Australia" },
  { code: "CAD", symbol: "C$", label: "Canadian dollars", country: "Canada" },
];

export const money = (currency: Currency, amount: number) => {
  const c = currencies.find((x) => x.code === currency)!;
  const rounded = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `${c.symbol}${rounded}`;
};

export const lowest = (currency: Currency) => Math.min(...plans.map((p) => p.prices[currency]));
export const highest = (currency: Currency) => Math.max(...plans.map((p) => p.prices[currency]));

export const perClass = (plan: Plan, currency: Currency) => plan.prices[currency] / plan.classesPerMonth;

export const pricingNotes = [
  `Every plan is one teacher with one student, ${site.classMinutes} minutes a class.`,
  `Your first ${site.trial.classes} classes are free, and no card is needed to book them.`,
  `A second child from the same family gets ${site.siblingDiscountPercent}% off.`,
  "Fees are monthly. There is no registration fee and no contract, so you can stop at the end of any month.",
  "Longer classes of 45 or 60 minutes are priced in proportion, which suits Hifz and Ijazah students.",
];
