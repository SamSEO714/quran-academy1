import type { Faq } from "./types";
import { site } from "./site";
import { plans, money, lowest, highest } from "./pricing";

const t = site.trial.classes;
const m = site.classMinutes;

export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do online Quran classes work?",
        a: `You and your teacher join a live video call on ${site.classApps}. The teacher shares the Qaida or Quran page on screen, the student reads aloud, and the teacher corrects each mistake as it happens. Classes are one-to-one, ${m} minutes long, at fixed days and times you choose.`,
      },
      {
        q: "What do I need for a class?",
        a: "A laptop, tablet or phone with a camera and microphone, a steady internet connection and a quiet place. Headphones help. A larger screen is better for young children.",
      },
      {
        q: "Are the trial classes really free?",
        a: `Yes. You get ${t} full classes with a teacher at no cost. We do not ask for card details to book them, and there is no obligation to continue.`,
      },
      {
        q: "How soon can we start?",
        a: "Usually within one or two days of sending the trial form. We reply within one working day with a teacher and a time.",
      },
      {
        q: "Which course should I choose?",
        a: "If you are unsure, choose “Not sure yet” on the form. In the first trial class the teacher listens to the student read and recommends where to start.",
      },
    ],
  },
  {
    title: "Teachers",
    items: [
      {
        q: "Who are the teachers?",
        a: "Male and female Quran teachers who have completed formal Quran study, are tested on Tajweed and on teaching in English before they join, and are observed in class regularly. Hifz is taught by huffaz and Ijazah by teachers who hold an Ijazah.",
      },
      {
        q: "Can I choose a female teacher?",
        a: "Yes. Female teachers are available for sisters, girls and young children. Select “Female teacher” on the trial form.",
      },
      {
        q: "Do the teachers speak English?",
        a: `Yes. Classes are taught in ${site.teachingLanguages.join(", ").replace(/, ([^,]*)$/, " or $1")}. Tell us which language you prefer.`,
      },
      {
        q: "Will we have the same teacher every class?",
        a: "Yes. One teacher takes all of a student's classes so they know the student's level and habits. If the fit is not right, ask us and we will change the teacher.",
      },
    ],
  },
  {
    title: "Fees and schedule",
    items: [
      {
        q: "How much do online Quran classes cost?",
        a: `One-to-one classes at ${site.name} cost ${money("USD", lowest("USD"))} to ${money("USD", highest("USD"))} a month in the USA, ${money("GBP", lowest("GBP"))} to ${money("GBP", highest("GBP"))} in the UK, ${money("AUD", lowest("AUD"))} to ${money("AUD", highest("AUD"))} in Australia and ${money("CAD", lowest("CAD"))} to ${money("CAD", highest("CAD"))} in Canada, for ${plans[0].perWeek} to ${plans[plans.length - 1].perWeek} classes a week. There is no registration fee.`,
      },
      {
        q: "Is there a discount for siblings?",
        a: `Yes. A second child from the same family gets ${site.siblingDiscountPercent}% off the monthly fee.`,
      },
      ...(site.paymentMethods
        ? [{ q: "How do I pay?", a: `Fees are paid monthly in advance by ${site.paymentMethods}.` }]
        : []),
      {
        q: "Can I choose my own class times?",
        a: "Yes. You pick the days and times in your own time zone, including early mornings, evenings and weekends. Times can be changed with a few days' notice.",
      },
      {
        q: "What happens if we miss a class?",
        a: "Tell the teacher at least a few hours ahead and the class is rescheduled within the same month. Classes missed without notice are not made up.",
      },
      {
        q: "Can I cancel?",
        a: "Yes, at the end of any month. There is no contract and no cancellation fee.",
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        q: "What age can a child start learning the Quran online?",
        a: "Most children are ready from age 4 or 5. They start with Noorani Qaida in short, lively one-to-one classes. A parent should stay nearby for the first few weeks.",
      },
      {
        q: "How long does it take to learn to read the Quran?",
        a: "Most children finish Noorani Qaida in 4 to 8 months at 3 classes a week, and go on to complete a first full reading of the Quran in a further 1.5 to 3 years. Adults usually move through the Qaida in 2 to 4 months.",
      },
      {
        q: "How will I know my child is making progress?",
        a: "The teacher sends a short note each month covering what was learned, what needs practice and the next target. You are also welcome to sit in on any class.",
      },
      {
        q: "Do you follow a particular school of thought?",
        a: "Quran reading, Tajweed and Hifz are the same for all Muslims. For Islamic studies topics such as salah, the teacher follows mainstream Sunni teaching and the school of fiqh your family follows.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

const pick = (qs: string[]) => qs.map((q) => allFaqs.find((f) => f.q === q)!).filter(Boolean);

export const homeFaqs: Faq[] = pick([
  "How do online Quran classes work?",
  "How much do online Quran classes cost?",
  "Are the trial classes really free?",
  "Can I choose a female teacher?",
  "What age can a child start learning the Quran online?",
  "Can I choose my own class times?",
]);

export const pricingFaqs: Faq[] = pick([
  "How much do online Quran classes cost?",
  "Is there a discount for siblings?",
  "Are the trial classes really free?",
  "What happens if we miss a class?",
  "Can I cancel?",
]);
