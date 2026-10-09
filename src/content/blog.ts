import type { Block, Faq } from "./types";
import { site } from "./site";
import { plans, money, lowest, highest } from "./pricing";

/**
 * Articles written to answer the questions parents and adult learners type into Google and AI assistants.
 * Each one opens with a direct answer, then gives the detail, then links to the matching course.
 * To add an article, copy one object, change the slug and write the blocks.
 */
export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string; // first published
  updated: string;
  minutes: number;
  answer: string;
  blocks: Block[];
  faqs: Faq[];
  related: string[]; // internal paths
};

const t = site.trial.classes;

export const posts: Post[] = [
  {
    slug: "online-quran-classes-cost",
    title: "How much do online Quran classes cost in 2026?",
    metaTitle: "How Much Do Online Quran Classes Cost in 2026?",
    description:
      "What online Quran classes cost per month and per hour in the USA, UK, Australia and Canada in 2026, what changes the price, and how to compare academies fairly.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 5,
    answer:
      "In 2026, one-to-one online Quran classes typically cost between $30 and $110 a month in the USA, depending on how many classes you take a week, how long each class is and where the academy's teachers are based. That works out at roughly $6 to $25 an hour. Group classes cost less.",
    blocks: [
      { type: "h2", text: "Typical price ranges" },
      { type: "p", text: "These ranges come from the published fee pages of online Quran academies serving English-speaking countries, reviewed in October 2026. They are for private one-to-one classes. Many academies publish only US-dollar prices, so the UK and Australian columns include converted figures." },
      {
        type: "table",
        head: ["Classes a week (30 minutes)", "USA", "UK", "Australia"],
        rows: [
          ["2", "$30 to $50", "£24 to £40", "A$45 to A$75"],
          ["3", "$40 to $100", "£32 to £75", "A$60 to A$150"],
          ["5", "$60 to $110+", "£48 to £90+", "A$90 to A$170+"],
        ],
      },
      { type: "p", text: "Group classes, where four to six students share a teacher, are much cheaper per session. The trade-off is that each student reads to the teacher for only a few minutes." },
      { type: "h2", text: "What changes the price" },
      {
        type: "ul",
        items: [
          "Class length. Most academies sell 30-minute classes. 45 and 60-minute classes cost proportionally more.",
          "Classes per week. Five a week costs more per month but usually less per class.",
          "The course. Hifz and Ijazah need more experienced teachers and are often priced higher.",
          "Where the academy operates. Academies with offices and staff in the USA or UK charge more than those run from Egypt, Pakistan or Jordan.",
          "Extras. Some charge a registration fee, some charge for books or reports. Ask before you enrol.",
        ],
      },
      { type: "h2", text: "How to compare two academies fairly" },
      {
        type: "ol",
        items: [
          "Convert each quote to a price per hour of one-to-one teaching.",
          "Check that the fee is for a private class, not a small group.",
          "Ask whether the same teacher takes every class.",
          "Ask what happens to missed classes.",
          "Take the free trial at both, with the student who will actually be learning.",
        ],
      },
      { type: "h2", text: `What ${site.name} charges` },
      {
        type: "table",
        head: ["Plan", "USA", "UK", "Australia", "Canada"],
        rows: plans.map((p) => [p.name, money("USD", p.prices.USD), money("GBP", p.prices.GBP), money("AUD", p.prices.AUD), money("CAD", p.prices.CAD)]),
      },
      { type: "p", text: `Every plan is one-to-one, ${site.classMinutes} minutes a class, with no registration fee. The first ${t} classes are free. Full details are on the [fees page](/pricing).` },
      { type: "h2", text: "Is the cheapest option the best?" },
      { type: "p", text: "Not always. A low fee is good value only if the teacher is qualified, turns up on time and stays with the student for months. A child who changes teacher every few weeks loses more in progress than the family saves in fees. Use the trial classes to judge the teacher, then look at the price." },
    ],
    faqs: [
      { q: "How much is a Quran teacher per hour online?", a: "Most online academies work out at about $6 to $25 an hour for one-to-one teaching in 2026. Independent tutors based in the USA, UK or Australia often charge $20 to $40 an hour." },
      { q: "Are there free online Quran classes?", a: `Some mosques and charities run free group classes, and most academies offer free trial classes. ${site.name} gives ${t} free one-to-one trial classes before any fee is due.` },
      { q: "Why are some online Quran classes so cheap?", a: "Mainly because of where the teachers live. A fair wage in Egypt or Pakistan is lower than in the USA or UK, so academies based there can charge less for the same teaching time." },
    ],
    related: ["/pricing", "/free-trial", "/blog/how-to-choose-online-quran-teacher"],
  },
  {
    slug: "what-is-noorani-qaida",
    title: "What is Noorani Qaida, and how long does it take to finish?",
    metaTitle: "What Is Noorani Qaida? Lessons, Duration and Tips",
    description:
      "Noorani Qaida explained: what the book covers lesson by lesson, how long children and adults take to finish it, and how to help a child practise at home.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 5,
    answer:
      "Noorani Qaida is a short beginner's book that teaches how to read Arabic script so that a student can go on to read the Quran. It starts with single letters and ends with full Quranic words and basic Tajweed. Most children finish it in 4 to 8 months, and most adults in 2 to 4 months.",
    blocks: [
      { type: "h2", text: "Where the book comes from" },
      { type: "p", text: "The Qaida is named after its compiler, Shaykh Noor Muhammad Haqqani of India. It became the standard first book in madrasahs across South Asia and is now used by Quran teachers around the world, especially for students whose first language is not Arabic." },
      { type: "h2", text: "What Noorani Qaida covers" },
      { type: "p", text: "Most editions have around 17 lessons. The order matters, because each lesson uses only what came before." },
      {
        type: "table",
        head: ["Stage", "What the student learns"],
        rows: [
          ["Single letters", "The 28 letters, their names and the exact sound of each"],
          ["Joined letters", "How letters change shape at the start, middle and end of a word"],
          ["Short vowels", "Fatha, kasra and damma on single letters, then on short words"],
          ["Tanween", "The double vowel marks and the n-sound they add"],
          ["Long vowels", "Alif, waw and ya as madd letters, and the leen letters"],
          ["Sukoon", "A letter with no vowel, and how it joins the letter before it"],
          ["Shaddah", "Doubling a letter, including with tanween and madd"],
          ["Tajweed basics", "Noon and meem rules, qalqalah, and stopping at the end of an ayah"],
        ],
      },
      { type: "h2", text: "How long it takes" },
      {
        type: "ul",
        items: [
          "A child of 5 to 7, with 3 classes a week and a little daily practice: 4 to 8 months.",
          "A child of 8 to 12: often 3 to 5 months.",
          "An adult who practises daily: 2 to 4 months.",
        ],
      },
      { type: "p", text: "The biggest factor is practice between classes. Five minutes a day does more than a long session once a week." },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "ul",
        items: [
          "Rushing the first lesson. If the letter sounds are wrong at the start, every later page carries the mistake.",
          "Learning from transliteration. Reading Arabic in English letters builds habits that are hard to undo.",
          "Memorizing the page instead of reading it. Ask the child to read lines out of order.",
          "Skipping the Tajweed lessons at the end. They are the bridge to the Quran.",
        ],
      },
      { type: "h2", text: "After the Qaida" },
      { type: "p", text: "The student moves to reading the Quran itself, usually starting with the short surahs of Juz Amma. See our [Noorani Qaida course](/courses/noorani-qaida-online) and the [Quran reading course](/courses/quran-reading-course) that follows it." },
    ],
    faqs: [
      { q: "Can I teach my child Noorani Qaida myself?", a: "Yes, if your own pronunciation of every letter is correct. If you are unsure about letters such as ع, ح, ض or ظ, have a teacher check them, because a child copies exactly what they hear." },
      { q: "Is Noorani Qaida the same as Qaida Nooraniyah?", a: "Essentially, yes. Al-Qaidah an-Nooraniyah is the Arabic name for the same method. Editions differ a little in layout and in how the lessons are numbered." },
      { q: "What comes after Noorani Qaida?", a: "Reading the Quran from the mushaf with a teacher, known as Nazra, usually beginning with Juz Amma." },
    ],
    related: ["/courses/noorani-qaida-online", "/online-quran-classes-for-kids", "/blog/best-age-to-start-quran-classes"],
  },
  {
    slug: "best-age-to-start-quran-classes",
    title: "What is the best age for a child to start Quran classes?",
    metaTitle: "Best Age for a Child to Start Quran Classes",
    description:
      "The right age to start Quran classes, signs your child is ready, what to expect at 4, 6, 8 and 10, and how to prepare a young child for online lessons.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 4,
    answer:
      "Most children are ready to start formal Quran classes between the ages of 4 and 6, beginning with the Arabic letters in Noorani Qaida. Readiness matters more than the exact age: a child who can sit for 20 minutes, copy sounds and recognise shapes is ready. Listening to the Quran can begin from birth.",
    blocks: [
      { type: "h2", text: "Signs your child is ready" },
      {
        type: "ul",
        items: [
          "They can sit and focus on one activity for 15 to 20 minutes.",
          "They can repeat a sound or short phrase after you.",
          "They recognise some letters or shapes in their own language.",
          "They are comfortable talking to an adult on a video call.",
        ],
      },
      { type: "h2", text: "What to expect at each age" },
      {
        type: "table",
        head: ["Age", "What suits them", "Realistic goal for the first year"],
        rows: [
          ["3 to 4", "Listening, short surahs by ear, letter songs and games", "A few short surahs memorized by listening"],
          ["4 to 6", "Noorani Qaida in short one-to-one classes", "Finish most or all of the Qaida"],
          ["7 to 9", "Qaida at a faster pace, then Quran reading", "Qaida complete and Juz Amma under way"],
          ["10 to 13", "Reading with Tajweed, or Hifz for fluent readers", "Fluent reading, several juz read"],
          ["Teens", "Tajweed, Hifz, Tafseer", "Set with the teacher"],
        ],
      },
      { type: "h2", text: "Is it a problem to start late?" },
      { type: "p", text: "No. Older children learn the letters faster, concentrate longer and often overtake those who began at four. What matters is a steady routine once they begin." },
      { type: "h2", text: "Preparing a young child for online classes" },
      {
        type: "ol",
        items: [
          "Play Quran recitation at home so the sounds are familiar.",
          "Choose a fixed place and time for class. Routine does half the work.",
          "Use a tablet or laptop on a stand, not a phone in the hand.",
          "Sit beside them for the first few weeks, then step back gradually.",
          "Praise the effort after every class.",
        ],
      },
      { type: "p", text: `Not sure whether your child is ready? Book the [free trial](/free-trial). The teacher will tell you honestly after the first class, and you still have ${t - 1} more to decide.` },
    ],
    faqs: [
      { q: "Can a 3-year-old start Quran classes?", a: "A few can, but most are not ready for a structured class. At 3, listening to recitation and repeating short surahs with a parent works better than formal lessons." },
      { q: "At what age can a child start Hifz?", a: "Once they read the Quran fluently with correct Tajweed, which for most children is between 7 and 10. Starting memorization before the reading is sound means memorizing mistakes." },
      { q: "How long should a Quran class be for a 5-year-old?", a: "Twenty to thirty minutes, one-to-one, with several changes of activity." },
    ],
    related: ["/online-quran-classes-for-kids", "/courses/noorani-qaida-online", "/blog/what-is-noorani-qaida"],
  },
  {
    slug: "how-long-to-memorize-quran",
    title: "How long does it take to memorize the Quran?",
    metaTitle: "How Long Does It Take to Memorize the Quran?",
    description:
      "A realistic Hifz timeline: how many years it takes to memorize the Quran at different daily amounts, for children and adults, with a worked calculation.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 5,
    answer:
      "Memorizing the whole Quran usually takes 3 to 5 years for a child studying part-time alongside school, and 2 to 3 years in a full-time Hifz programme. The Quran has 604 pages in the standard Madinah mushaf, so the time depends almost entirely on how many lines are memorized each day and how consistent the revision is.",
    blocks: [
      { type: "h2", text: "The numbers" },
      { type: "ul", items: ["114 surahs", "30 juz", "604 pages in the 15-line Madinah mushaf", "About 20 pages in each juz"] },
      { type: "h2", text: "Timeline by daily amount" },
      { type: "p", text: "This table assumes five memorization days a week, with the other two for revision, and around six weeks off across the year." },
      {
        type: "table",
        head: ["New memorization a day", "Pages a week", "Time to complete"],
        rows: [
          ["3 lines", "1", "About 13 years"],
          ["5 lines (a third of a page)", "1.7", "About 8 years"],
          ["Half a page", "2.5", "About 5 years"],
          ["One page", "5", "About 2.5 years"],
          ["Two pages", "10", "About 1.3 years"],
        ],
      },
      { type: "p", text: "Few students hold one pace throughout. Most start with a few lines, reach half a page within some months, and speed up again in the final third when the method has become habit." },
      { type: "h2", text: "What speeds Hifz up" },
      {
        type: "ul",
        items: [
          "Fluent reading with correct Tajweed before starting.",
          "A fixed time every day. Early morning is the traditional choice for good reason.",
          "One mushaf, always the same print, so the page layout becomes part of the memory.",
          "A teacher who listens daily, and a parent who listens at home.",
          "Understanding the meaning of what is being memorized.",
        ],
      },
      { type: "h2", text: "What slows it down" },
      {
        type: "ul",
        items: [
          "Skipping revision to move ahead. New memorization built on weak revision collapses.",
          "Long breaks. Two weeks without revision can cost a month of repair.",
          "Too large a daily amount set too early.",
        ],
      },
      { type: "h2", text: "Sabaq, sabqi and manzil" },
      { type: "p", text: "Traditional Hifz divides each day into three parts. Sabaq is the new lesson. Sabqi is the recent portion from the last several days. Manzil is a rotating share of everything memorized earlier, often one juz a day for advanced students. A student who keeps all three every day rarely forgets." },
      { type: "h2", text: "Can adults do it?" },
      { type: "p", text: "Yes. Adults usually need more repetitions per line than children, but they are better at organising revision. Many begin with Juz Amma, which takes most adults 6 to 12 months at a relaxed pace, and continue from there. See our [online Hifz classes](/courses/online-hifz-classes)." },
    ],
    faqs: [
      { q: "Can you memorize the Quran in one year?", a: "It is possible in a full-time programme at about two pages a day with strong revision, and some students do it. For a child in school, it is not a realistic target." },
      { q: "How many hours a day does Hifz take?", a: "Part-time students typically spend 1 to 1.5 hours a day in total: a class of 30 to 45 minutes and the rest in practice at home. Full-time programmes run 4 to 6 hours a day." },
      { q: "How do I stop forgetting what I memorized?", a: "Recite your old portions on a fixed rotation, lead your own prayers with them and recite to someone weekly. Forgetting is almost always a revision problem, not a memory problem." },
    ],
    related: ["/courses/online-hifz-classes", "/courses/online-tajweed-classes", "/free-trial"],
  },
  {
    slug: "tajweed-rules-for-beginners",
    title: "Tajweed rules for beginners: the 7 to learn first",
    metaTitle: "Tajweed Rules for Beginners: 7 Rules to Learn First",
    description:
      "The first Tajweed rules every beginner should learn, in order: makharij, heavy and light letters, noon and meem rules, qalqalah, madd and stopping, with examples.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 6,
    answer:
      "Tajweed means giving every letter of the Quran its right: pronouncing it from the correct place, with the correct qualities and for the correct length. A beginner should learn seven things first: letter articulation points, heavy and light letters, the noon sakinah rules, the meem sakinah rules, qalqalah, madd, and how to stop.",
    blocks: [
      { type: "h2", text: "1. Makharij: where each letter comes from" },
      { type: "p", text: "Arabic letters are produced from 17 points across five areas: the empty space of the mouth and throat, the throat, the tongue, the lips and the nasal passage. Getting these right fixes most beginner mistakes, such as reading ح as ه or ع as a plain vowel." },
      { type: "h2", text: "2. Heavy and light letters" },
      { type: "p", text: "Seven letters are always pronounced heavy, with the back of the tongue raised: خ ص ض غ ط ق ظ. The rest are light, except alif, lam and ra, which change with their context. Reading ص as س, or ط as ت, changes the word." },
      { type: "h2", text: "3. Noon sakinah and tanween" },
      { type: "p", text: "When a noon with sukoon or a tanween is followed by another letter, one of four things happens:" },
      {
        type: "table",
        head: ["Rule", "What you do", "Letters that trigger it"],
        rows: [
          ["Izhar", "Pronounce the noon clearly", "ء ه ع ح غ خ"],
          ["Idgham", "Merge the noon into the next letter", "ي ر م ل و ن"],
          ["Iqlab", "Turn the noon into a meem sound", "ب"],
          ["Ikhfa", "Hide the noon with a nasal sound", "The remaining 15 letters"],
        ],
      },
      { type: "h2", text: "4. Meem sakinah" },
      { type: "ul", items: ["Before ب: hide the meem with a nasal sound (ikhfa shafawi).", "Before another م: merge the two with a nasal sound (idgham shafawi).", "Before any other letter: pronounce it clearly (izhar shafawi)."] },
      { type: "h2", text: "5. Qalqalah" },
      { type: "p", text: "Five letters bounce slightly when they carry a sukoon or when you stop on them: ق ط ب ج د. The echo is stronger at the end of an ayah, as in the last words of Surah Al-Ikhlas." },
      { type: "h2", text: "6. Madd" },
      { type: "p", text: "Madd is lengthening a vowel. The natural madd is two counts: alif after a fatha, ya after a kasra, waw after a damma. It becomes longer, four to six counts, when followed by a hamzah or a sukoon. Shortening a madd or adding one where there is none can change the meaning." },
      { type: "h2", text: "7. Stopping correctly" },
      { type: "p", text: "When you stop on a word, the last vowel is dropped and the letter is read with sukoon. A tanween with fatha becomes an alif sound, and a ta marbutah (ة) is read as ه. The small signs printed above the text, such as مـ and لا, tell you where stopping is required, allowed or to be avoided." },
      { type: "h2", text: "How to actually learn them" },
      { type: "p", text: "Reading about the rules is the easy part. They are learned by reciting to someone who can hear what you cannot and correcting it again and again. That is why Tajweed has always been taught from teacher to student. Our [online Tajweed classes](/courses/online-tajweed-classes) work through these rules on your own recitation." },
    ],
    faqs: [
      { q: "Can I learn Tajweed by myself?", a: "You can learn the theory from books and videos. You cannot reliably correct your own pronunciation, because you do not hear your own mistakes. A teacher is needed for that part." },
      { q: "What is the first rule of Tajweed to learn?", a: "The articulation points of the letters (makharij). Every other rule depends on the letters themselves being correct." },
      { q: "How long does it take to learn Tajweed rules?", a: "Most students cover the core rules in 4 to 8 months of two or three classes a week." },
    ],
    related: ["/courses/online-tajweed-classes", "/courses/quran-ijazah-course", "/online-quran-classes-for-adults"],
  },
  {
    slug: "how-to-choose-online-quran-teacher",
    title: "How to choose an online Quran teacher: a 9-point checklist",
    metaTitle: "How to Choose an Online Quran Teacher: 9 Checks",
    description:
      "Nine things to check before you enrol with an online Quran teacher or academy, the questions to ask in the trial class, and the warning signs to walk away from.",
    date: "2026-10-08",
    updated: "2026-10-08",
    minutes: 5,
    answer:
      "Choose an online Quran teacher by checking nine things: their own recitation, their qualification, their English, their experience with your age group, whether classes are truly one-to-one, whether the teacher stays the same, how progress is reported, the trial and cancellation terms, and the real price per hour.",
    blocks: [
      { type: "h2", text: "The checklist" },
      {
        type: "ol",
        items: [
          "Recitation. Ask the teacher to recite a few ayahs. It should be clear, unhurried and correct.",
          "Qualification. For reading and Tajweed, formal Quran study. For Hifz, a hafiz. For Ijazah, a teacher who holds one with a sanad.",
          "Language. The teacher must be able to explain a mistake in words your child understands.",
          "Experience with the age group. Teaching a five-year-old and teaching an adult are different skills.",
          "One-to-one. Confirm that the fee is for a private class and not a shared one.",
          "Same teacher every time. Progress stalls when teachers rotate.",
          "Progress reports. Ask how often you will hear from the teacher and what the report contains.",
          "Trial and cancellation. A real free trial, no card required, and the freedom to stop at the end of a month.",
          "Price per hour. Convert every quote to an hourly rate before comparing.",
        ],
      },
      { type: "h2", text: "Questions to ask in the trial class" },
      {
        type: "ul",
        items: [
          "What level is my child at, and what is the plan for the next three months?",
          "Which mistakes did you notice today?",
          "How much should we practise between classes?",
          "What happens when you are ill or on leave?",
        ],
      },
      { type: "p", text: "A good teacher answers the first two questions with specifics after a single class." },
      { type: "h2", text: "Warning signs" },
      {
        type: "ul",
        items: [
          "Card details demanded before a trial.",
          "Pressure to pay for several months up front.",
          "A different teacher at each of the first few classes.",
          "The teacher talks for most of the class and the student reads very little.",
          "No clear answer about what the student will have achieved in three months.",
        ],
      },
      { type: "h2", text: "Male or female teacher?" },
      { type: "p", text: "For young children either works, and many parents find a female teacher suits children under seven. Sisters and older girls generally prefer a female teacher. An academy should let you choose. Read more about our [female Quran teachers](/female-quran-teacher-online)." },
      { type: "h2", text: "Try before you decide" },
      { type: "p", text: `Reading about a teacher tells you little. One class tells you a lot. ${site.name} gives ${t} [free trial classes](/free-trial) so you can run through this checklist yourself. Fees start at ${money("USD", lowest("USD"))} a month and go up to ${money("USD", highest("USD"))} for five classes a week.` },
    ],
    faqs: [
      { q: "Is an online Quran teacher as good as a local one?", a: "A good teacher is good in either setting. Online one-to-one classes often give a student more reading and correction time than a local group class, while a local class offers community and the mosque environment." },
      { q: "Should I pick an Arab or non-Arab Quran teacher?", a: "Pick on recitation, qualification and teaching skill, not nationality. Excellent Tajweed teachers come from Egypt, Pakistan, Syria, Indonesia and many other countries." },
      { q: "How do I know if a Quran teacher is qualified?", a: "Ask where they studied, whether they are a hafiz and whether they hold an Ijazah. Then listen to them recite and watch how they correct a student in the trial class." },
    ],
    related: ["/free-trial", "/female-quran-teacher-online", "/blog/online-quran-classes-cost"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
