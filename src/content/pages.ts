import type { Block, Currency, Faq } from "./types";
import { site } from "./site";
import { plans, money, lowest, highest } from "./pricing";

/**
 * Landing pages served at the top level, e.g. /online-quran-classes-usa.
 * Country pages target "online quran classes + country" searches.
 * Audience pages target "for kids", "for adults" and "female quran teacher" searches.
 */
export type Landing = {
  slug: string;
  kind: "country" | "audience";
  nav: string; // short label for menus
  h1: string;
  metaTitle: string;
  metaDescription: string;
  answer: string;
  facts: { label: string; value: string }[];
  blocks: Block[];
  faqs: Faq[];
  // country pages only
  country?: { name: string; code: string; hreflang: string; currency: Currency; formCountry: string };
  // preselects in the trial form
  formCourse?: string;
  formStudent?: string;
  formTeacher?: string;
};

const t = site.trial.classes;
const m = site.classMinutes;

const feeTable = (c: Currency): Block => ({
  type: "table",
  caption: `Monthly fees for one-to-one ${m}-minute classes`,
  head: ["Plan", "Classes a month", "Monthly fee", "Per class"],
  rows: plans.map((p) => [p.name, String(p.classesPerMonth), money(c, p.prices[c]), money(c, Math.round((p.prices[c] / p.classesPerMonth) * 100) / 100)]),
});

const feeRange = (c: Currency) => `${money(c, lowest(c))} to ${money(c, highest(c))} a month`;

const countryFaqs = (name: string, c: Currency, zones: string): Faq[] => [
  {
    q: `How much do online Quran classes cost in ${name}?`,
    a: `At ${site.name}, one-to-one classes cost ${feeRange(c)}, depending on whether you take 2, 3 or 5 classes a week. Each class is ${m} minutes. The first ${t} classes are free.`,
  },
  {
    q: `What time are classes for students in ${name}?`,
    a: `You choose the days and times in your own time zone (${zones}). Most children take classes after school or early evening, and adults often choose early morning or after work. Weekend slots are available.`,
  },
  {
    q: "Can I choose a female Quran teacher?",
    a: "Yes. Female teachers are available for sisters and for children. Choose “Female teacher” on the trial form and your trial classes will be with a female teacher.",
  },
  {
    q: "What age can my child start?",
    a: "Most children are ready from age 4 or 5, starting with Noorani Qaida. There is no upper age limit. Adults and seniors learn in their own one-to-one classes.",
  },
  {
    q: "How do I start?",
    a: `Fill in the free trial form with your preferred days and times. We reply within one working day to confirm a teacher and a slot. After ${t} free classes you decide whether to continue.`,
  },
];

const howItWorks: Block[] = [
  { type: "h2", text: "How the classes work" },
  {
    type: "ol",
    items: [
      `Book ${t} free trial classes with the form on this page. No card is needed.`,
      "In the first class the teacher checks the student's level, from letter recognition to Tajweed, and tells you where to start.",
      "You fix the days and times that suit your family. The same teacher takes every class.",
      `Classes run live on ${site.classApps}. The teacher shares the page on screen and the student reads aloud.`,
      "You get a short progress note each month: what was covered, what needs practice and what comes next.",
    ],
  },
];

const coursesBlock: Block[] = [
  { type: "h2", text: "Courses you can take" },
  {
    type: "ul",
    items: [
      "[Noorani Qaida](/courses/noorani-qaida-online): Arabic letters and joining, for complete beginners",
      "[Quran reading (Nazra)](/courses/quran-reading-course): fluent reading of the whole Quran from the mushaf",
      "[Tajweed](/courses/online-tajweed-classes): the rules of correct recitation",
      "[Hifz](/courses/online-hifz-classes): memorization with daily lesson and revision",
      "[Ijazah](/courses/quran-ijazah-course): certified recitation with a sanad",
      "[Translation and Tafseer](/courses/quran-tafseer-course), [Quranic Arabic](/courses/quranic-arabic-course) and [Islamic studies for kids](/courses/islamic-studies-for-kids)",
    ],
  },
];

export const landings: Landing[] = [
  // ---------------------------------------------------------------- USA
  {
    slug: "online-quran-classes-usa",
    kind: "country",
    nav: "USA",
    h1: "Online Quran classes in the USA for kids and adults",
    metaTitle: "Online Quran Classes USA: 1-to-1 for Kids and Adults",
    metaDescription: `Live one-to-one online Quran classes for families in the USA. Qaida, Tajweed and Hifz with male and female teachers in Eastern, Central, Mountain and Pacific time. From ${money("USD", lowest("USD"))} a month. ${t} free trial classes.`,
    answer: `${site.name} teaches the Quran to children and adults across the United States in live one-to-one video classes. Lessons are ${m} minutes, scheduled in your own time zone from Eastern to Pacific, with male and female teachers who teach in English. Fees are ${feeRange("USD")} and the first ${t} classes are free.`,
    facts: [
      { label: "Class type", value: "One teacher, one student, live video" },
      { label: "Time zones", value: "ET, CT, MT, PT, Alaska and Hawaii" },
      { label: "Fees", value: feeRange("USD") },
      { label: "Free trial", value: `${t} classes, no card needed` },
    ],
    country: { name: "the USA", code: "US", hreflang: "en-US", currency: "USD", formCountry: "United States" },
    blocks: [
      { type: "h2", text: "Why American Muslim families learn Quran online" },
      { type: "p", text: "About 3.45 million Muslims live in the United States, according to Pew Research Center's 2017 estimate, and they are spread across every state. Outside the large communities in New York, New Jersey, Texas, Illinois, Michigan and California, the nearest full-time Quran teacher can be an hour's drive away." },
      { type: "p", text: "Online classes remove the drive. A child in Boise or Tulsa gets the same teacher, at the same time each day, as a child in Dearborn. Parents can sit in the room and hear every lesson, which is rarely possible in a weekend school of thirty children." },
      { type: "h2", text: "Class times across US time zones" },
      { type: "p", text: "You choose times in your local clock. These are the slots families book most:" },
      {
        type: "table",
        head: ["Time zone", "Cities", "Popular after-school slots", "Popular adult slots"],
        rows: [
          ["Eastern (ET)", "New York, Atlanta, Miami, Detroit", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Central (CT)", "Chicago, Houston, Dallas, Minneapolis", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Mountain (MT)", "Denver, Phoenix, Salt Lake City", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Pacific (PT)", "Los Angeles, Bay Area, Seattle", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 8:00 pm"],
        ],
      },
      { type: "p", text: "Class times move with you when the clocks change in March and November, so a 5:00 pm class stays at 5:00 pm." },
      { type: "h2", text: "Fees in US dollars" },
      feeTable("USD"),
      { type: "p", text: `There is no registration fee and no contract. A second child from the same family gets ${site.siblingDiscountPercent}% off. See the full [fees page](/pricing).` },
      ...coursesBlock,
      ...howItWorks,
      { type: "h2", text: "Built around the American school week" },
      { type: "ul", items: [
        "Classes fit between school pick-up and dinner, or before the school bus for early risers.",
        "During Ramadan, classes can move to after Fajr or before Iftar.",
        "Summer break is a good time to add classes and finish a level. Many Hifz students double their lesson from June to August.",
        "If you travel or have exams, tell the teacher ahead of time and the class is rescheduled within the month.",
      ] },
    ],
    faqs: countryFaqs("the USA", "USD", "ET, CT, MT or PT"),
  },
  // ---------------------------------------------------------------- UK
  {
    slug: "online-quran-classes-uk",
    kind: "country",
    nav: "UK",
    h1: "Online Quran classes in the UK for children and adults",
    metaTitle: "Online Quran Classes UK: 1-to-1 for Children and Adults",
    metaDescription: `Live one-to-one online Quran classes for UK families. Qaida, Tajweed and Hifz with male and female teachers at UK times. From ${money("GBP", lowest("GBP"))} a month. ${t} free trial classes.`,
    answer: `${site.name} teaches the Quran to children and adults across the United Kingdom in live one-to-one video lessons. Each lesson is ${m} minutes, at UK times you choose, with male and female teachers who teach in English. Fees are ${feeRange("GBP")} and the first ${t} lessons are free.`,
    facts: [
      { label: "Class type", value: "One teacher, one pupil, live video" },
      { label: "Times", value: "UK time (GMT and BST), 7 days a week" },
      { label: "Fees", value: feeRange("GBP") },
      { label: "Free trial", value: `${t} lessons, no card needed` },
    ],
    country: { name: "the UK", code: "GB", hreflang: "en-GB", currency: "GBP", formCountry: "United Kingdom" },
    blocks: [
      { type: "h2", text: "Why UK families are moving Quran lessons online" },
      { type: "p", text: "The 2021 Census counted about 3.9 million Muslims in England and Wales, 6.5% of the population. In cities such as London, Birmingham, Bradford, Manchester and Leicester there is a madrasah within walking distance, yet many parents still choose a private online teacher." },
      { type: "p", text: "The reason is time with the teacher. In an evening madrasah a child may read to the teacher for three or four minutes out of two hours. In a one-to-one lesson the child reads for the full half hour and every mistake is corrected. Families outside the big cities, from Cornwall to the Highlands, get a qualified teacher without a long drive." },
      { type: "h2", text: "Lesson times in the UK" },
      {
        type: "table",
        head: ["Who", "Popular weekday slots", "Weekend slots"],
        rows: [
          ["Primary school children", "4:00 pm to 6:30 pm", "9:00 am to 1:00 pm"],
          ["Secondary school pupils", "5:00 pm to 8:00 pm", "9:00 am to 2:00 pm"],
          ["Adults and sisters at home", "9:30 am to 2:30 pm, or after 8:00 pm", "Any time by arrangement"],
          ["Hifz pupils", "Before school from 6:30 am, plus early evening", "Morning revision"],
        ],
      },
      { type: "p", text: "Lesson times stay the same on your clock when the UK moves between GMT and BST." },
      { type: "h2", text: "Fees in pounds" },
      feeTable("GBP"),
      { type: "p", text: `No registration fee and no contract. A second child from the same family gets ${site.siblingDiscountPercent}% off. See the full [fees page](/pricing).` },
      ...coursesBlock,
      ...howItWorks,
      { type: "h2", text: "Online lessons or the local madrasah?" },
      { type: "p", text: "Both have a place. A madrasah gives children friends, a link to the mosque and congregational prayer. A private online teacher gives individual correction and a pace set by the child. Many UK families keep the weekend madrasah for community and use two or three online lessons a week for the actual reading, Tajweed and memorisation." },
      { type: "ul", items: [
        "The parent can be in the room for every lesson.",
        "No winter evening drop-offs and pick-ups.",
        "Half-term and summer holidays can be used to add lessons and finish a level.",
        "Lessons continue when you travel abroad to visit family.",
      ] },
    ],
    faqs: countryFaqs("the UK", "GBP", "GMT or BST"),
  },
  // ---------------------------------------------------------------- Australia
  {
    slug: "online-quran-classes-australia",
    kind: "country",
    nav: "Australia",
    h1: "Online Quran classes in Australia for kids and adults",
    metaTitle: "Online Quran Classes Australia: 1-to-1 Kids and Adults",
    metaDescription: `Live one-to-one online Quran classes for Australian families. Qaida, Tajweed and Hifz with male and female teachers in AEST, ACST and AWST. From ${money("AUD", lowest("AUD"))} a month. ${t} free trial classes.`,
    answer: `${site.name} teaches the Quran to children and adults across Australia in live one-to-one video classes. Each class is ${m} minutes, booked in your own time zone from Perth to Sydney, with male and female teachers who teach in English. Fees are ${feeRange("AUD")} and the first ${t} classes are free.`,
    facts: [
      { label: "Class type", value: "One teacher, one student, live video" },
      { label: "Time zones", value: "AEST/AEDT, ACST/ACDT and AWST" },
      { label: "Fees", value: feeRange("AUD") },
      { label: "Free trial", value: `${t} classes, no card needed` },
    ],
    country: { name: "Australia", code: "AU", hreflang: "en-AU", currency: "AUD", formCountry: "Australia" },
    blocks: [
      { type: "h2", text: "Why Australian Muslim families learn Quran online" },
      { type: "p", text: "The 2021 Census recorded 813,392 Muslims in Australia, 3.2% of the population. Most live in Sydney and Melbourne, around suburbs such as Lakemba, Auburn, Bankstown, Broadmeadows and Dandenong. Families in Brisbane, Perth, Adelaide, Canberra, Darwin and regional towns have far fewer teachers to choose from." },
      { type: "p", text: "Distance is the issue online classes solve. A family in Townsville or Shepparton gets the same one-to-one teacher as a family in Western Sydney, and nobody spends an hour in the car for a thirty-minute lesson." },
      { type: "h2", text: "Class times across Australian time zones" },
      {
        type: "table",
        head: ["Time zone", "Cities", "Popular after-school slots", "Popular adult slots"],
        rows: [
          ["AEST / AEDT", "Sydney, Melbourne, Canberra, Hobart", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["AEST (no daylight saving)", "Brisbane, Gold Coast, Cairns", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 7:30 pm"],
          ["ACST / ACDT", "Adelaide, Darwin", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["AWST", "Perth", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 7:30 pm"],
        ],
      },
      { type: "p", text: "Queensland, Western Australia and the Northern Territory do not use daylight saving. Your class stays at the same local time all year whichever state you are in." },
      { type: "h2", text: "Fees in Australian dollars" },
      feeTable("AUD"),
      { type: "p", text: `No registration fee and no lock-in contract. A second child from the same family gets ${site.siblingDiscountPercent}% off. See the full [fees page](/pricing).` },
      ...coursesBlock,
      ...howItWorks,
      { type: "h2", text: "Built around the Australian school year" },
      { type: "ul", items: [
        "Classes fit after the 3:00 pm school finish, or before school for Hifz students.",
        "Term breaks in April, July and September, and the long summer break, are good times to add classes.",
        "Ramadan timetables shift to after Fajr or before Iftar on request.",
        "Travelling overseas? Classes continue from wherever you are.",
      ] },
    ],
    faqs: countryFaqs("Australia", "AUD", "AEST, ACST or AWST"),
  },
  // ---------------------------------------------------------------- Canada
  {
    slug: "online-quran-classes-canada",
    kind: "country",
    nav: "Canada",
    h1: "Online Quran classes in Canada for kids and adults",
    metaTitle: "Online Quran Classes Canada: 1-to-1 Kids and Adults",
    metaDescription: `Live one-to-one online Quran classes for Canadian families. Qaida, Tajweed and Hifz with male and female teachers in every Canadian time zone. From ${money("CAD", lowest("CAD"))} a month. ${t} free trial classes.`,
    answer: `${site.name} teaches the Quran to children and adults across Canada in live one-to-one video classes. Each class is ${m} minutes, booked in your own time zone from Pacific to Atlantic, with male and female teachers who teach in English. Fees are ${feeRange("CAD")} and the first ${t} classes are free.`,
    facts: [
      { label: "Class type", value: "One teacher, one student, live video" },
      { label: "Time zones", value: "PT, MT, CT, ET, AT and Newfoundland" },
      { label: "Fees", value: feeRange("CAD") },
      { label: "Free trial", value: `${t} classes, no card needed` },
    ],
    country: { name: "Canada", code: "CA", hreflang: "en-CA", currency: "CAD", formCountry: "Canada" },
    blocks: [
      { type: "h2", text: "Why Canadian Muslim families learn Quran online" },
      { type: "p", text: "The 2021 Census counted close to 1.8 million Muslims in Canada, 4.9% of the population. The largest communities are in the Greater Toronto Area, Montreal, Ottawa, Calgary, Edmonton and Vancouver. Families in smaller cities, and anyone who has driven to a mosque class in January, know why a class at home is appealing." },
      { type: "p", text: "Online classes give every family the same one-to-one teacher, whether you are in Mississauga, Saskatoon or St. John's, with no winter driving and no waiting list." },
      { type: "h2", text: "Class times across Canadian time zones" },
      {
        type: "table",
        head: ["Time zone", "Cities", "Popular after-school slots", "Popular adult slots"],
        rows: [
          ["Eastern (ET)", "Toronto, Ottawa, Montreal", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Central (CT)", "Winnipeg, Regina, Saskatoon", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Mountain (MT)", "Calgary, Edmonton", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Pacific (PT)", "Vancouver, Surrey, Victoria", "3:30 pm to 7:30 pm", "6:00 am to 8:00 am, after 8:00 pm"],
          ["Atlantic (AT)", "Halifax, Moncton", "4:00 pm to 8:00 pm", "6:00 am to 8:00 am, after 8:00 pm"],
        ],
      },
      { type: "h2", text: "Fees in Canadian dollars" },
      feeTable("CAD"),
      { type: "p", text: `No registration fee and no contract. A second child from the same family gets ${site.siblingDiscountPercent}% off. See the full [fees page](/pricing).` },
      ...coursesBlock,
      ...howItWorks,
    ],
    faqs: countryFaqs("Canada", "CAD", "PT, MT, CT, ET or AT"),
  },
  // ---------------------------------------------------------------- Kids
  {
    slug: "online-quran-classes-for-kids",
    kind: "audience",
    nav: "For kids",
    h1: "Online Quran classes for kids, one-to-one with a patient teacher",
    metaTitle: "Online Quran Classes for Kids: 1-to-1, Ages 4 to 15",
    metaDescription: `One-to-one online Quran classes for kids aged 4 to 15. Noorani Qaida, Quran reading, Tajweed and Hifz with patient male and female teachers. ${t} free trial classes.`,
    answer: `Online Quran classes for kids are live video lessons where one teacher teaches one child to read, recite and memorize the Quran. At ${site.name}, classes are ${m} minutes, start from age 4 with Noorani Qaida, and are taught by male or female teachers who are trained to keep young children engaged. The first ${t} classes are free.`,
    facts: [
      { label: "Ages", value: "4 to 15" },
      { label: "Class length", value: `${m} minutes, one-to-one` },
      { label: "Teachers", value: "Male and female, English-speaking" },
      { label: "Free trial", value: `${t} classes, no card needed` },
    ],
    formStudent: "My child",
    blocks: [
      { type: "h2", text: "What your child learns, in order" },
      { type: "ol", items: [
        "[Noorani Qaida](/courses/noorani-qaida-online): letters, sounds and joining. Usually 4 to 8 months.",
        "[Quran reading](/courses/quran-reading-course): reading the whole Quran from the mushaf with the teacher listening.",
        "[Tajweed](/courses/online-tajweed-classes): the rules, applied on the child's own reading.",
        "[Hifz](/courses/online-hifz-classes): memorization, from Juz Amma to the full Quran for those who want it.",
      ] },
      { type: "p", text: "Alongside any of these, children can take [Islamic studies](/courses/islamic-studies-for-kids): salah, daily duas, stories of the prophets and manners." },
      { type: "h2", text: "What a 30-minute class looks like" },
      { type: "table", head: ["Minutes", "What happens"], rows: [
        ["0 to 3", "Greeting, a dua to begin, a quick check of how practice went"],
        ["3 to 10", "Revision: the child re-reads the previous lesson"],
        ["10 to 22", "New lesson: the teacher models, the child repeats, then reads alone"],
        ["22 to 27", "A short dua, surah or salah point from Islamic studies"],
        ["27 to 30", "What to practise before next class, and a note for the parent"],
      ] },
      { type: "h2", text: "How we keep children learning on a screen" },
      { type: "ul", items: [
        "One child, one teacher. There is nowhere to hide and nobody to wait for.",
        "Short turns. A five-year-old changes activity every few minutes.",
        "The same teacher every class, so the child builds trust and the teacher knows exactly where the weak spots are.",
        "Praise for effort and a small target each class. Children come back when they feel they are winning.",
        "Sisters and young girls can have a female teacher.",
      ] },
      { type: "h2", text: "What parents need to do" },
      { type: "ul", items: [
        "Provide a quiet spot, a tablet or laptop and, ideally, headphones.",
        "For children under 7, stay nearby for the first few weeks.",
        "Five to ten minutes of practice on non-class days makes the biggest difference to progress.",
        "Read the monthly progress note and tell the teacher if anything at home changes.",
      ] },
      { type: "h2", text: "Fees" },
      { type: "p", text: `Classes cost ${feeRange("USD")} in the USA, ${feeRange("GBP")} in the UK, ${feeRange("AUD")} in Australia and ${feeRange("CAD")} in Canada. A second child gets ${site.siblingDiscountPercent}% off. Details are on the [fees page](/pricing).` },
    ],
    faqs: [
      { q: "What is the best age for a child to start Quran classes?", a: "Between 4 and 6 for most children. At that age they copy sounds easily and can sit for a short one-to-one class. Children who start later catch up quickly, so there is no age that is too late." },
      { q: "Are online Quran classes effective for young children?", a: "Yes, when the class is one-to-one and short. The child reads for almost the whole class and every mistake is heard, which is hard to achieve in a group. Children under 7 do best with a parent close by at first." },
      { q: "How many classes a week does my child need?", a: "Three classes a week suits most children for Qaida and reading. Hifz needs five. Two a week works if your child also attends a weekend madrasah." },
      { q: "Can my daughter have a female teacher?", a: "Yes. Choose “Female teacher” on the trial form." },
      { q: "Can siblings share a class?", a: `Each child gets their own ${m}-minute class because children are almost never at the same level. Classes can be booked back to back with the same teacher, and the second child gets ${site.siblingDiscountPercent}% off.` },
      { q: "What if my child does not like the teacher?", a: "Tell us and we will change the teacher. The trial classes exist so you can see the fit before paying anything." },
    ],
  },
  // ---------------------------------------------------------------- Adults
  {
    slug: "online-quran-classes-for-adults",
    kind: "audience",
    nav: "For adults",
    h1: "Online Quran classes for adults, private and at your pace",
    metaTitle: "Online Quran Classes for Adults: Private 1-to-1 Lessons",
    metaDescription: `Private one-to-one online Quran classes for adults and reverts. Start from the alphabet or fix your Tajweed, with a male or female teacher at times that fit work. ${t} free trial classes.`,
    answer: `Online Quran classes for adults are private one-to-one video lessons for people who never learned to read the Quran, learned as a child and forgot, or want to correct their Tajweed. At ${site.name} you study alone with a male or female teacher, at times around work and family. The first ${t} classes are free.`,
    facts: [
      { label: "Who it is for", value: "Beginners, returners and reverts" },
      { label: "Class length", value: `${m} minutes, private` },
      { label: "Times", value: "Early morning, lunchtime, late evening, weekends" },
      { label: "Free trial", value: `${t} classes, no card needed` },
    ],
    formStudent: "Myself",
    blocks: [
      { type: "h2", text: "Where adults usually start" },
      { type: "table", head: ["If this is you", "Start with", "Typical time"], rows: [
        ["I cannot read Arabic at all", "Noorani Qaida", "2 to 4 months"],
        ["I read slowly and make mistakes", "Quran reading with correction", "6 to 12 months to fluency"],
        ["I read fluently but never learned the rules", "Tajweed", "4 to 8 months"],
        ["I want to understand what I recite", "Translation and Tafseer, or Quranic Arabic", "Ongoing"],
        ["I want to memorize", "Hifz of selected surahs or juz", "Set with your teacher"],
      ] },
      { type: "p", text: "You do not have to work this out yourself. In the first trial class the teacher listens to you read for a few minutes and tells you where to begin." },
      { type: "h2", text: "Private means private" },
      { type: "p", text: "Many adults put off learning because they are embarrassed to read aloud in front of others. Here it is only you and your teacher. Nobody else hears you, there is no class to keep up with, and the teacher has taught many adults who started from the first letter." },
      { type: "h2", text: "For new Muslims" },
      { type: "p", text: "If you have recently accepted Islam, the teacher can combine learning to read with the essentials: how to pray, what to say in each position of salah and the short surahs to recite. Lessons are in English, with every Arabic term explained." },
      { type: "h2", text: "Fitting classes around work" },
      { type: "ul", items: [
        "Early slots before the commute, lunchtime slots and late evening slots are all available.",
        "Two classes a week is enough to make steady progress if you practise for ten minutes a day.",
        "Shift workers can book week by week instead of fixed days.",
        "Sisters can choose a female teacher, including for daytime classes while children are at school.",
      ] },
      { type: "h2", text: "Fees" },
      { type: "p", text: `Classes cost ${feeRange("USD")} in the USA, ${feeRange("GBP")} in the UK, ${feeRange("AUD")} in Australia and ${feeRange("CAD")} in Canada. Details are on the [fees page](/pricing).` },
    ],
    faqs: [
      { q: "Is it too late to learn the Quran as an adult?", a: "No. Adults learn the script faster than children because they understand instructions and practise deliberately. Most adult beginners finish Noorani Qaida in 2 to 4 months." },
      { q: "How can adults learn to read the Quran?", a: "Start with the Arabic letters and their sounds using Noorani Qaida, move on to reading short surahs with a teacher listening, then learn Tajweed rules on your own recitation. A one-to-one teacher shortens every stage because mistakes are corrected as they happen." },
      { q: "I am a revert and do not know any Arabic. Can I join?", a: "Yes. You start from the first letter, in English, and the teacher can include how to pray and the surahs you need for salah." },
      { q: "Can I learn with a female teacher?", a: "Yes. Sisters can request a female teacher for every class." },
      { q: "How many classes a week should an adult take?", a: "Two or three. Consistency matters more than volume: two classes a week with daily ten-minute practice beats five classes with none." },
    ],
  },
  // ---------------------------------------------------------------- Female teacher
  {
    slug: "female-quran-teacher-online",
    kind: "audience",
    nav: "Female teachers",
    h1: "Female Quran teacher online for sisters and children",
    metaTitle: "Female Quran Teacher Online for Sisters and Kids",
    metaDescription: `Learn Quran with a female teacher online. Private one-to-one classes for sisters, girls and young children in Qaida, Tajweed, Hifz and Tafseer. ${t} free trial classes.`,
    answer: `${site.name} has female Quran teachers who teach sisters, girls and young children in private one-to-one video classes. They teach Noorani Qaida, Quran reading, Tajweed, Hifz and Tafseer in English or Urdu. Request a female teacher on the trial form and your ${t} free trial classes will be with her.`,
    facts: [
      { label: "For", value: "Sisters, girls and young children" },
      { label: "Class type", value: `Private, ${m} minutes` },
      { label: "Courses", value: "Qaida, reading, Tajweed, Hifz, Tafseer" },
      { label: "Free trial", value: `${t} classes with a female teacher` },
    ],
    formTeacher: "Female teacher",
    blocks: [
      { type: "h2", text: "Who asks for a female teacher" },
      { type: "ul", items: [
        "Sisters who prefer to recite to a woman.",
        "Mothers who want to learn while the children are at school.",
        "Parents of girls, especially from age 9 or 10 upwards.",
        "Parents of very young children who respond better to a female teacher.",
        "Revert sisters who want to ask questions about salah and purity comfortably.",
      ] },
      { type: "h2", text: "What you can study" },
      { type: "ul", items: [
        "[Noorani Qaida](/courses/noorani-qaida-online) for sisters and children starting from the alphabet",
        "[Quran reading](/courses/quran-reading-course) with correction of every line",
        "[Tajweed](/courses/online-tajweed-classes), from makharij to the rules of stopping",
        "[Hifz](/courses/online-hifz-classes) for girls and women, full or selected surahs",
        "[Translation and Tafseer](/courses/quran-tafseer-course) in English or Urdu",
        "[Ijazah](/courses/quran-ijazah-course) with a female teacher who holds an Ijazah",
      ] },
      { type: "h2", text: "Privacy in class" },
      { type: "p", text: "Classes are one-to-one, so no one else is on the call. Sisters may keep their own camera off if they wish, since the teacher needs to hear the recitation and share the page, not see the student. Classes are not recorded unless you ask for a recording." },
      { type: "h2", text: "Class times for sisters" },
      { type: "p", text: "Daytime slots during school hours are the most requested by mothers. Evening and weekend slots are available for working sisters and students. You choose the days and times on the trial form, in your own time zone." },
      { type: "h2", text: "Fees" },
      { type: "p", text: `The fee is the same whether you choose a male or female teacher: ${feeRange("USD")} in the USA, ${feeRange("GBP")} in the UK, ${feeRange("AUD")} in Australia and ${feeRange("CAD")} in Canada. Details are on the [fees page](/pricing).` },
    ],
    faqs: [
      { q: "Can I get a female Quran teacher online?", a: `Yes. ${site.name} has female teachers for sisters, girls and young children. Select “Female teacher” on the trial form and your trial classes will be arranged with one.` },
      { q: "Do female teachers teach Tajweed and Hifz?", a: "Yes. Female teachers teach every course, including Tajweed, Hifz and Ijazah." },
      { q: "Do I have to turn my camera on?", a: "No. The teacher needs to hear you and share the page. Your own camera is your choice." },
      { q: "Is the fee higher for a female teacher?", a: "No. Fees are the same for male and female teachers." },
      { q: "Can my young son learn with a female teacher?", a: "Yes. Female teachers teach boys and girls in the younger age groups, and many parents prefer this for children under 9." },
    ],
  },
];

export const countryLandings = landings.filter((l) => l.kind === "country");
export const audienceLandings = landings.filter((l) => l.kind === "audience");
export const getLanding = (slug: string) => landings.find((l) => l.slug === slug);
