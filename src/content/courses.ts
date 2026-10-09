import type { Faq } from "./types";
import { site } from "./site";

export type Course = {
  slug: string;
  name: string; // short name for menus and cards
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** 40 to 60 words that answer "what is this course" on their own. Search and AI engines quote this. */
  answer: string;
  /** Position on the main learning path (1 to 5), or null for a subject taken alongside. */
  step: number | null;
  summary: string; // one line for cards
  ages: string;
  level: string;
  duration: string;
  schedule: string;
  before: string; // what you need before starting
  after: string; // what you can do at the end
  forWho: string[];
  syllabus: { title: string; detail: string }[];
  howTaught: string[];
  faqs: Faq[];
  next?: string; // slug of the course that usually follows
};

const t = site.trial.classes;

export const courses: Course[] = [
  {
    slug: "noorani-qaida-online",
    name: "Noorani Qaida",
    h1: "Noorani Qaida online course for kids and adult beginners",
    metaTitle: "Noorani Qaida Online Course for Kids and Beginners",
    metaDescription:
      "Learn Noorani Qaida online in live one-to-one classes. Arabic letters, harakat, joining and first Tajweed rules, for children from age 4 and adult beginners. 3 free trial classes.",
    answer:
      "Noorani Qaida is the beginner's book that teaches you to read Arabic script before you open the Quran. In this course a teacher takes one student through the letters, their sounds, the vowel marks and how letters join, in live 30-minute classes. Most children finish in 4 to 8 months.",
    step: 1,
    summary: "Arabic letters, sounds and joining. The first step for anyone who cannot read Arabic yet.",
    ages: "4 and up, including adults",
    level: "Complete beginner",
    duration: "4 to 8 months for most children, 2 to 4 months for most adults",
    schedule: "3 classes a week works best",
    before: "Nothing. You do not need to know a single Arabic letter.",
    after: "You can read any Arabic word with vowel marks slowly and correctly, and you are ready to start reading the Quran.",
    forWho: [
      "Children aged 4 to 8 starting from zero",
      "Adults and reverts who never learned to read Arabic",
      "Children who read by guessing and need the basics rebuilt",
    ],
    syllabus: [
      { title: "The 28 letters and where each sound comes from", detail: "Recognising every letter and saying it from the correct point in the mouth or throat, so mistakes do not have to be unlearned later." },
      { title: "Letters in joined form", detail: "How each letter changes shape at the start, middle and end of a word." },
      { title: "Short vowels: fatha, kasra, damma", detail: "Reading a letter with each of the three harakat, then two and three letters together." },
      { title: "Tanween and sukoon", detail: "Double vowel marks and the resting sign, with plenty of drilled examples." },
      { title: "Long vowels and the leen letters", detail: "The madd letters alif, waw and ya, and how long to hold them." },
      { title: "Shaddah", detail: "Doubling a letter, alone and combined with tanween and madd." },
      { title: "First Tajweed rules", detail: "Noon sakinah, meem sakinah and qalqalah at a level a young child can apply while reading." },
      { title: "Reading short surahs", detail: "Moving from the Qaida into Juz Amma with the teacher listening to every word." },
    ],
    howTaught: [
      "The teacher shares the Qaida page on screen and points to each letter as the student reads.",
      "Young children get short turns, repetition and praise. A 30-minute class has three or four changes of activity.",
      "Each class ends with a few lines to practise. Parents get a short note on what was covered.",
    ],
    faqs: [
      { q: "What age can a child start Noorani Qaida?", a: "Most children are ready between 4 and 5, once they can sit with a screen for 20 to 30 minutes and copy sounds. A free trial class is the easiest way to check. If your child is not ready, the teacher will say so." },
      { q: "How long does it take to finish Noorani Qaida?", a: "With 3 classes a week and a few minutes of practice between classes, most children finish in 4 to 8 months. Adults who practise daily often finish in 2 to 4 months." },
      { q: "Is Noorani Qaida only for children?", a: "No. It is the standard starting book for any age. Adult beginners use the same lessons and move through them faster." },
      { q: "Do we need to buy the book?", a: "No. The teacher shares the page on screen in every class and sends you a PDF so your child can practise between classes." },
    ],
    next: "quran-reading-course",
  },
  {
    slug: "quran-reading-course",
    name: "Quran Reading",
    h1: "Online Quran reading course (Nazra) with a one-to-one teacher",
    metaTitle: "Online Quran Reading Course (Nazra) for Kids and Adults",
    metaDescription:
      "Read the Quran fluently from the mushaf with a live one-to-one teacher. Daily sabaq, revision and applied Tajweed for children and adults. Start with 3 free trial classes.",
    answer:
      "The Quran reading course, called Nazra in South Asia, takes a student who can read Arabic script and builds fluent, correct reading of the whole Quran from the mushaf. The teacher listens to a new portion and a revision portion in every 30-minute class and corrects each mistake as it happens.",
    step: 2,
    summary: "Read the whole Quran from the mushaf, fluently and correctly, with a teacher listening to every line.",
    ages: "6 and up",
    level: "Can read Arabic words with vowel marks",
    duration: "1.5 to 3 years to complete the Quran, depending on class frequency and practice",
    schedule: "3 to 5 classes a week",
    before: "Noorani Qaida, or the ability to read joined Arabic words with harakat.",
    after: "You can open the Quran at any page and read it correctly at a steady pace without help.",
    forWho: [
      "Children who have finished the Qaida",
      "Adults who can read slowly and want to become fluent",
      "Anyone who learned years ago and wants their reading checked and corrected",
    ],
    syllabus: [
      { title: "Juz Amma", detail: "Short surahs first, because the student already hears them in salah and can self-correct by ear." },
      { title: "New lesson (sabaq)", detail: "A few lines read to the teacher each class, growing to half a page and then a page as fluency builds." },
      { title: "Recent revision (sabqi)", detail: "The last few lessons are re-read so nothing slips." },
      { title: "Tajweed applied while reading", detail: "Ghunnah, madd, qalqalah, heavy and light letters corrected in the reading itself, not taught as theory." },
      { title: "Stopping and starting", detail: "The waqf signs printed in the mushaf and where a breath changes the meaning." },
      { title: "Completion (khatm)", detail: "Reading from Surah Al-Baqarah to An-Nas, with a milestone note to parents at the end of each juz." },
    ],
    howTaught: [
      "The student reads and the teacher listens. That is most of the class, as it should be.",
      "Mistakes are corrected on the spot and the line is repeated until it is right.",
      "Progress is tracked by juz and page so you always know where your child is.",
    ],
    faqs: [
      { q: "What does Nazra mean?", a: "Nazra means reading the Quran by looking at the text, as opposed to Hifz, which is reading from memory. It is the stage between finishing the Qaida and starting memorisation." },
      { q: "How long does it take to finish reading the Quran?", a: "A child taking 5 classes a week and practising at home usually completes the Quran in about 1.5 to 2 years. With 3 classes a week, allow 2 to 3 years." },
      { q: "My child reads with mistakes. Do they need to restart the Qaida?", a: "Usually not. In the trial class the teacher finds the specific gaps, such as weak letter sounds or madd, and fixes those first while the reading continues." },
      { q: "Which script do you teach, 15-line or 13-line?", a: "Either. Tell us which mushaf your family uses, for example the 15-line Madinah print or the 13 or 16-line IndoPak print, and the teacher will use the same one on screen." },
    ],
    next: "online-tajweed-classes",
  },
  {
    slug: "online-tajweed-classes",
    name: "Tajweed",
    h1: "Online Tajweed classes: learn to recite the Quran correctly",
    metaTitle: "Online Tajweed Classes for Kids, Adults and Sisters",
    metaDescription:
      "One-to-one online Tajweed classes with male and female teachers. Makharij, noon and meem rules, madd, qalqalah and waqf, applied to your own recitation. 3 free trial classes.",
    answer:
      "Tajweed is the set of rules for pronouncing each letter of the Quran from its correct point of articulation, with its correct qualities and length. In this course a teacher listens to your recitation one-to-one, teaches each rule and trains you to apply it. Most students cover the rules in 4 to 8 months.",
    step: 3,
    summary: "The rules of correct recitation, taught on your own reading until they become habit.",
    ages: "7 and up",
    level: "Can read the Quran, even slowly",
    duration: "4 to 8 months for the core rules, then ongoing practice",
    schedule: "2 or 3 classes a week",
    before: "You can read from the mushaf. Speed does not matter.",
    after: "You recite with correct letter sounds, lengths and stops, and you can name the rule you are applying.",
    forWho: [
      "Adults who read fluently but were never taught the rules",
      "Children who have completed or nearly completed Nazra",
      "Students preparing for Hifz or an Ijazah",
    ],
    syllabus: [
      { title: "Makharij: the articulation points", detail: "The 17 points in the throat, tongue, lips and nose where the letters are produced." },
      { title: "Sifaat: the qualities of letters", detail: "Heavy and light letters, whispering and strength, and why ص is not س." },
      { title: "Noon sakinah and tanween", detail: "Izhar, idgham, iqlab and ikhfa, with the letters for each." },
      { title: "Meem sakinah", detail: "Ikhfa shafawi, idgham shafawi and izhar shafawi." },
      { title: "Qalqalah", detail: "The echo on ق ط ب ج د, and how it differs in the middle and at the end of a word." },
      { title: "Madd", detail: "Natural madd of 2 counts, then the longer madds of 4, 5 and 6 counts and what triggers each." },
      { title: "Lam and ra", detail: "The lam in the name of Allah, sun and moon letters, and when ra is heavy or light." },
      { title: "Waqf and ibtida", detail: "Where to stop, how to stop on different endings, and where to restart." },
    ],
    howTaught: [
      "Each rule is taught in a few minutes, then practised for the rest of the class on ayahs you read yourself.",
      "The teacher records your recurring mistakes and returns to them until they are gone.",
      "Sisters can choose a female teacher for the whole course.",
    ],
    faqs: [
      { q: "Can I learn Tajweed online?", a: "Yes. Tajweed is learned by reciting to a teacher who hears and corrects you, and a live video class does exactly that. One-to-one classes give more correction time than a group class at a mosque." },
      { q: "How long does it take to learn Tajweed?", a: "Most students cover the main rules in 4 to 8 months at 2 or 3 classes a week. Applying them without thinking takes longer and comes from daily recitation." },
      { q: "Is Tajweed obligatory?", a: "Scholars agree that reciting the Quran without changing its letters or meanings is required of every Muslim who is able to learn. Knowing the names of the rules is a communal duty. For a ruling on your own situation, ask a scholar you trust." },
      { q: "Do you teach Tajweed in English?", a: `Yes. Classes are taught in ${site.teachingLanguages.join(", ").replace(/, ([^,]*)$/, " or $1")}, and rule names are given in Arabic with a plain explanation.` },
    ],
    next: "online-hifz-classes",
  },
  {
    slug: "online-hifz-classes",
    name: "Hifz (Memorization)",
    h1: "Online Hifz classes: memorize the Quran with a one-to-one teacher",
    metaTitle: "Online Hifz Classes: Quran Memorization for Kids and Adults",
    metaDescription:
      "Memorize the Quran online with a personal Hifz teacher. Daily sabaq, sabqi and manzil, a written plan and monthly tests. Full Hifz or selected surahs. 3 free trial classes.",
    answer:
      "Hifz is memorizing the Quran word for word. In this course one teacher works with one student five days a week using the three-part method of sabaq (new lesson), sabqi (recent revision) and manzil (old revision). You get a written plan with a target date, and the plan is adjusted every month.",
    step: 4,
    summary: "Memorize the Quran with a daily new lesson, daily revision and a plan you can see.",
    ages: "7 and up",
    level: "Fluent reader with sound Tajweed",
    duration: "3 to 5 years part-time for the full Quran. Juz Amma usually takes 4 to 8 months",
    schedule: "5 classes a week, 30 to 60 minutes",
    before: "Fluent reading from the mushaf with correct Tajweed. If the reading is not ready, we fix that first.",
    after: "You have memorized your target, whether Juz Amma, a few juz or the whole Quran, and can recite it to a teacher without prompts.",
    forWho: [
      "Children whose parents want them to become a hafiz or hafiza alongside school",
      "Adults memorizing Juz Amma, Surah Al-Baqarah, Yasin, Al-Mulk or Al-Kahf",
      "Former Hifz students who need structured revision to bring it back",
    ],
    syllabus: [
      { title: "Assessment and plan", detail: "The teacher checks reading, Tajweed and how much the student can retain in a day, then sets a daily amount and a target date." },
      { title: "Sabaq: the new lesson", detail: "A fixed number of lines each day, read to the teacher first for correctness, then memorized and recited back the next class." },
      { title: "Sabqi: recent revision", detail: "The last five to seven lessons recited every day so new memorization hardens." },
      { title: "Manzil: old revision", detail: "A rotating portion of everything memorized so far, so that the first juz is as strong as the latest." },
      { title: "Weekly and monthly tests", detail: "Random-ayah tests where the teacher starts a verse and the student continues." },
      { title: "Completion and beyond", detail: "A full recitation of each juz in one sitting, then a long-term revision schedule after completion." },
    ],
    howTaught: [
      "Classes run five days a week because memorization depends on daily contact, not long sessions.",
      "Parents receive a monthly report: lines memorized, revision quality and whether the target date still holds.",
      "The daily amount goes down in exam weeks and up in holidays. A plan that ignores school does not last.",
    ],
    faqs: [
      { q: "How long does it take to memorize the Quran online?", a: "The standard Madinah mushaf has 604 pages. At half a page a day, five days a week, memorizing takes roughly 4.5 to 5 years including revision days. At a page a day it takes about 2.5 to 3 years. Children with strong daily support at home move fastest." },
      { q: "Can my child do Hifz while attending a normal school?", a: "Yes, and most of our Hifz students do. The usual pattern is one 30 to 45 minute class a day plus 30 to 45 minutes of practice at home, placed before school or early in the evening." },
      { q: "Can adults memorize the Quran?", a: "Yes. Adults memorize more slowly than children but revise more carefully. Many start with Juz Amma or a single surah, and a clear goal with a daily routine matters more than age." },
      { q: "What are sabaq, sabqi and manzil?", a: "Sabaq is the new portion memorized today. Sabqi is the recent portion from the last few days. Manzil is a rotating share of everything memorized before that. Reciting all three every day is what keeps a hafiz from forgetting." },
    ],
    next: "quran-ijazah-course",
  },
  {
    slug: "quran-ijazah-course",
    name: "Ijazah",
    h1: "Online Quran Ijazah course in recitation and memorization",
    metaTitle: "Online Quran Ijazah Course (Hafs an Asim) with Sanad",
    metaDescription:
      "Earn an Ijazah in Quran recitation or memorization online. Recite the complete Quran to a teacher who holds a sanad, in the narration of Hafs from Asim. Free assessment class.",
    answer:
      "An Ijazah is a certificate from a qualified teacher stating that you have recited the entire Quran to them correctly and are authorized to teach it. It comes with a sanad, the chain of teachers going back to the Prophet, peace be upon him. This course prepares you and takes you through that full recitation.",
    step: 5,
    summary: "Recite the whole Quran to a teacher with a sanad and receive authorization to teach.",
    ages: "Teens and adults",
    level: "Advanced",
    duration: "6 to 18 months, depending on your level and weekly hours",
    schedule: "3 to 5 classes a week, 45 to 60 minutes",
    before: "Fluent recitation with strong applied Tajweed. For an Ijazah in Hifz, the whole Quran memorized.",
    after: "You hold an Ijazah with a sanad in the narration of Hafs from Asim and are authorized to teach it.",
    forWho: [
      "Huffaz who want their memorization certified",
      "Strong reciters who want an Ijazah in recitation from the mushaf",
      "Teachers and imams who want a connected chain of transmission",
    ],
    syllabus: [
      { title: "Entry assessment", detail: "A recitation test and a Tajweed theory check. You are told plainly whether you are ready or what to fix first." },
      { title: "Tajweed text", detail: "Study of a classical primer, usually Tuhfat al-Atfal and then the Jazariyyah, so you can explain the rules as well as apply them." },
      { title: "Complete recitation (khatmah)", detail: "Reciting from Al-Fatihah to An-Nas to the teacher, who stops and corrects every error." },
      { title: "Corrections log", detail: "Your recurring errors are logged and re-tested until they no longer appear." },
      { title: "Final test and Ijazah", detail: "A closing test, then the written Ijazah with the sanad listed teacher by teacher." },
    ],
    howTaught: [
      "Only teachers who themselves hold an Ijazah with a sanad teach this course.",
      "There is no shortcut. The Ijazah is granted when the recitation deserves it, not when a number of classes is reached.",
      "Sisters can study with a female teacher who holds an Ijazah.",
    ],
    faqs: [
      { q: "What is an Ijazah in Quran?", a: "It is a licence from a teacher certifying that you recited the whole Quran to them accurately, in a specific narration, and may teach it. The sanad attached to it lists each teacher in the chain back to the Prophet, peace be upon him." },
      { q: "Can I get an Ijazah online?", a: "Yes. Ijazah depends on the teacher hearing your full recitation and correcting it, which works over live video. What matters is that the teacher holds a valid Ijazah and listens to the complete Quran." },
      { q: "Do I need to be a hafiz to get an Ijazah?", a: "No. There are two kinds. An Ijazah in recitation is earned by reading the whole Quran from the mushaf with correct Tajweed. An Ijazah in Hifz is earned by reciting it from memory." },
      { q: "How long does an Ijazah take?", a: "A student with strong Tajweed who attends 4 or 5 classes a week usually completes a recitation Ijazah in 6 to 12 months. An Ijazah in Hifz often takes 12 to 18 months." },
    ],
  },
  {
    slug: "quran-tafseer-course",
    name: "Translation and Tafseer",
    h1: "Online Quran translation and Tafseer course in English",
    metaTitle: "Online Quran Tafseer and Translation Course in English",
    metaDescription:
      "Understand the Quran with a one-to-one teacher. Word-by-word translation and Tafseer in English or Urdu, surah by surah, for teens and adults. 3 free trial classes.",
    answer:
      "Tafseer is the explanation of the meanings of the Quran. This course goes through the Quran surah by surah: word-by-word translation first, then the explanation of each passage, why it was revealed and what it asks of us. Classes are one-to-one in English or Urdu, for teens and adults.",
    step: null,
    summary: "Understand what you recite: word-by-word translation, then the explanation of each passage.",
    ages: "12 and up",
    level: "Can read the Quran. No Arabic grammar needed",
    duration: "Ongoing. Juz Amma takes about 4 to 6 months at 2 classes a week",
    schedule: "2 or 3 classes a week",
    before: "You can read the Quran. You do not need to know Arabic.",
    after: "You understand the surahs you recite in salah and can follow the meaning of a passage as you read it.",
    forWho: [
      "Adults who recite daily and want to understand it",
      "Teens who ask why and deserve real answers",
      "Reverts building a first, structured understanding of the Quran",
    ],
    syllabus: [
      { title: "Surahs you already recite", detail: "Al-Fatihah and the short surahs of Juz Amma, so understanding reaches your salah in the first month." },
      { title: "Word-by-word translation", detail: "The meaning of each word and the most common Quranic vocabulary, which repeats heavily." },
      { title: "Context of revelation", detail: "When and why a passage was revealed, from the classical sources." },
      { title: "Explanation", detail: "What the scholars of Tafseer said about the passage, drawing on works such as Tafsir Ibn Kathir." },
      { title: "Lessons and practice", detail: "What the passage asks of a Muslim today, discussed rather than lectured." },
    ],
    howTaught: [
      "You choose the starting point: Juz Amma, Surah Al-Baqarah, or a surah you want to understand.",
      "Classes are a conversation. Questions are welcome and expected.",
      "The teacher follows mainstream Sunni scholarship and names the source of what is taught.",
    ],
    faqs: [
      { q: "What is the difference between translation and Tafseer?", a: "Translation gives the meaning of the words in another language. Tafseer explains the passage: its context, how the Prophet, peace be upon him, and his companions understood it, and the rulings and lessons in it." },
      { q: "Do I need to know Arabic to study Tafseer?", a: "No. The course is taught in English or Urdu. You will pick up the most frequent Quranic words along the way, which makes later Arabic study easier." },
      { q: "Which Tafseer do you follow?", a: "Teachers draw on the well-known classical works of Sunni scholarship, such as Tafsir Ibn Kathir, and tell you which source an explanation comes from." },
    ],
  },
  {
    slug: "quranic-arabic-course",
    name: "Quranic Arabic",
    h1: "Online Quranic Arabic course: understand the Quran in its own language",
    metaTitle: "Online Quranic Arabic Course for Beginners",
    metaDescription:
      "Learn Quranic Arabic online with a one-to-one teacher. High-frequency vocabulary, grammar (nahw) and word patterns (sarf), practised on real ayahs. 3 free trial classes.",
    answer:
      "Quranic Arabic is the classical Arabic of the Quran. This course teaches the vocabulary and grammar you need to understand ayahs directly, without relying on a translation. It starts with the most frequent Quranic words and builds grammar step by step, practising every point on verses you already know.",
    step: null,
    summary: "Vocabulary and grammar aimed at one goal: understanding ayahs as you hear them.",
    ages: "12 and up",
    level: "Can read Arabic script",
    duration: "6 to 12 months for a working foundation",
    schedule: "2 or 3 classes a week",
    before: "You can read Arabic script. No grammar background is needed.",
    after: "You can work out the meaning of many ayahs as you read and explain why a word has the ending it has.",
    forWho: [
      "Adults who want to understand the Quran in taraweeh and salah",
      "Hifz students who want to memorize with meaning",
      "Students planning deeper Islamic studies",
    ],
    syllabus: [
      { title: "High-frequency vocabulary", detail: "The few hundred words that make up most of the Quran's text, learned in groups by root." },
      { title: "Nouns, verbs and particles", detail: "The three kinds of word and how to tell them apart in an ayah." },
      { title: "Noun sentences and case endings", detail: "Why an ending is damma, fatha or kasra, and what it changes in the meaning." },
      { title: "Past, present and command verbs", detail: "Verb tables practised on Quranic examples rather than invented sentences." },
      { title: "Pronouns and attached endings", detail: "Reading who is speaking and who is addressed." },
      { title: "Word patterns (sarf)", detail: "How one three-letter root produces a family of related words." },
    ],
    howTaught: [
      "Every grammar point is practised on real ayahs, starting with Al-Fatihah and Juz Amma.",
      "Short written exercises after each class, corrected at the start of the next.",
      "The pace follows the student. Nothing new is added until the last point is secure.",
    ],
    faqs: [
      { q: "Is Quranic Arabic different from modern Arabic?", a: "The grammar is largely shared with Modern Standard Arabic, but the vocabulary and style are classical. A course focused on the Quran gets you to understanding ayahs much sooner than a general conversation course." },
      { q: "How long does it take to understand the Quran in Arabic?", a: "With 2 or 3 classes a week and regular review, most adults can follow the meaning of many familiar ayahs within 6 to 12 months. Full fluency in classical Arabic is a longer study." },
      { q: "Do I need Tajweed before learning Arabic?", a: "No. You only need to read the script. Many students take Tajweed and Arabic side by side." },
    ],
  },
  {
    slug: "islamic-studies-for-kids",
    name: "Islamic Studies for Kids",
    h1: "Online Islamic studies for kids: salah, duas, seerah and manners",
    metaTitle: "Online Islamic Studies for Kids: Salah, Duas and Seerah",
    metaDescription:
      "One-to-one online Islamic studies for children aged 5 to 14. Wudu and salah step by step, daily duas, stories of the prophets, seerah and manners. 3 free trial classes.",
    answer:
      "This course teaches children aged 5 to 14 the essentials every Muslim child should know: how to make wudu and pray, the daily duas, the pillars of Islam and faith, stories of the prophets, the life of the Prophet Muhammad, peace be upon him, and good manners. It is usually taken alongside Quran classes.",
    step: null,
    summary: "Salah, daily duas, stories of the prophets and manners, taught at a child's level.",
    ages: "5 to 14",
    level: "Beginner",
    duration: "Ongoing, in modules of about 3 months",
    schedule: "1 or 2 classes a week, or 10 minutes added to each Quran class",
    before: "Nothing.",
    after: "Your child can make wudu and pray correctly, knows the daily duas by heart, and can tell the stories of the prophets.",
    forWho: [
      "Children who do not attend a weekend Islamic school",
      "Families far from a mosque or Islamic centre",
      "Children who read the Quran well but have gaps in basics such as salah",
    ],
    syllabus: [
      { title: "Beliefs", detail: "The six pillars of faith and the five pillars of Islam, explained simply." },
      { title: "Wudu and salah", detail: "Each step shown and practised, with what to say in every position and its meaning." },
      { title: "Daily duas", detail: "Waking, sleeping, eating, leaving home, entering the mosque and more, memorized with meaning." },
      { title: "Stories of the prophets", detail: "From Adam to Isa, peace be upon them, told as stories with the lesson drawn out." },
      { title: "Seerah", detail: "The life of the Prophet Muhammad, peace be upon him, in order, from Makkah to Madinah." },
      { title: "Manners and character", detail: "Honesty, respect for parents, kindness to neighbours and how a Muslim speaks." },
      { title: "Short surahs and the Islamic year", detail: "Ramadan, the two Eids and Hajj, and the surahs recited in prayer." },
    ],
    howTaught: [
      "Stories, questions and short quizzes. Children are asked to explain things back in their own words.",
      "Taught in English at the child's level, with Arabic terms introduced one at a time.",
      "Content follows mainstream Sunni teaching. Tell us your family's school of fiqh for salah and the teacher will follow it.",
    ],
    faqs: [
      { q: "Can Islamic studies be combined with Quran classes?", a: "Yes. Many parents add 10 minutes of duas and salah to each Quran class, or book one separate class a week. Tell us in the trial and the teacher will plan it." },
      { q: "Which school of fiqh do you teach for salah?", a: "The teacher follows the school your family follows, for example Hanafi or Shafi'i. Please tell us when you book." },
      { q: "What age is this course for?", a: "Ages 5 to 14. The topics stay the same but the depth changes: a 6-year-old learns to pray by copying, a 12-year-old learns what invalidates the prayer and why." },
    ],
  },
];

export const pathCourses = courses.filter((c) => c.step !== null).sort((a, b) => a.step! - b.step!);
export const sideCourses = courses.filter((c) => c.step === null);
export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const trialClasses = t;
