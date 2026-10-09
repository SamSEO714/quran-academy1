import type { Block } from "./types";
import { site } from "./site";

/**
 * Plain-language policy pages. They describe what this website actually does.
 * Have them checked against your own business set-up before launch, especially the refund terms.
 */
export type Legal = { slug: string; title: string; description: string; blocks: Block[] };

const contact = site.email ? `Email us at ${site.email}.` : "Contact us through the [contact page](/contact).";

export const legals: Legal[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    description: `How ${site.name} collects, uses and protects the personal information of students and parents.`,
    blocks: [
      { type: "p", text: `This policy explains what personal information ${site.name}, a project of ${site.organisation.name}, collects through this website, why, and what your choices are.` },
      { type: "h2", text: "What we collect" },
      { type: "ul", items: [
        "Details you give us on the trial and contact forms: your name, phone or WhatsApp number, email address, country, the course you are interested in, who the classes are for, the student's age if you choose to give it, your preferred teacher and class times, and any message you write.",
        "How you reached the form: the page you were on, the website that referred you and any campaign tags in the link you clicked. This helps us understand which pages and adverts are useful.",
        "Your time zone, as reported by your browser, so we can offer class times that suit you.",
        "If you accept analytics cookies: anonymous statistics about pages viewed.",
      ] },
      { type: "h2", text: "How we use it" },
      { type: "ul", items: [
        "To contact you about the trial classes you asked for and to arrange a teacher and time.",
        "To provide classes and send progress updates if you enrol.",
        "To improve the website and measure which pages and adverts lead to enquiries.",
      ] },
      { type: "p", text: "We do not sell your information, and we do not send marketing messages unless you asked to be contacted." },
      { type: "h2", text: "Children's information" },
      { type: "p", text: "Forms on this site are completed by parents or adult students. We ask for a child's first name and age only so the teacher can prepare. We do not knowingly collect information directly from children." },
      { type: "h2", text: "Cookies" },
      { type: "p", text: "The site works without cookies. Analytics and advertising cookies are loaded only if you press Accept on the cookie notice. You can change your choice at any time by clearing this site's data in your browser." },
      { type: "h2", text: "Who we share it with" },
      { type: "p", text: "Your enquiry is seen by our admissions staff and the teacher assigned to you. We use service providers to host the website and database and to send email. They process data on our instructions only." },
      { type: "h2", text: "How long we keep it" },
      { type: "p", text: "Enquiries that do not lead to enrolment are deleted within 12 months. Student records are kept for as long as the student is enrolled and for up to 24 months afterwards." },
      { type: "h2", text: "Your rights" },
      { type: "p", text: `You can ask for a copy of the information we hold about you, ask us to correct it or ask us to delete it. ${contact} We will respond within 30 days.` },
      { type: "h2", text: "Changes" },
      { type: "p", text: `We will post any changes to this policy on this page. Last updated ${site.lastUpdated}.` },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    description: `The terms that apply to trial classes and paid classes at ${site.name}.`,
    blocks: [
      { type: "h2", text: "Classes" },
      { type: "ul", items: [
        `Classes are live, one-to-one and ${site.classMinutes} minutes long unless a longer class is agreed.`,
        `Classes are held on ${site.classApps}. You need your own device and internet connection.`,
        "A parent or guardian must book on behalf of anyone under 18 and should be at home during a child's class.",
      ] },
      { type: "h2", text: "Trial classes" },
      { type: "p", text: `New students receive ${site.trial.classes} free trial classes. No payment details are required and there is no obligation to enrol.` },
      { type: "h2", text: "Fees" },
      { type: "ul", items: [
        "Fees are charged monthly in advance according to the plan you choose.",
        "There is no registration fee and no minimum term.",
        "We give at least 30 days' notice of any change to fees.",
      ] },
      { type: "h2", text: "Rescheduling and missed classes" },
      { type: "ul", items: [
        "Tell your teacher at least 4 hours before a class to reschedule it within the same month.",
        "Classes missed without notice are not made up.",
        "If the teacher misses a class, it is always made up or credited.",
      ] },
      { type: "h2", text: "Cancelling" },
      { type: "p", text: "You may cancel at the end of any paid month by telling us before the next month's fee is due. See the [refund policy](/refund-policy)." },
      { type: "h2", text: "Conduct" },
      { type: "p", text: "Teachers and students are expected to treat each other with respect. We may end classes where a teacher is treated abusively, and you may ask for a change of teacher at any time." },
      { type: "h2", text: "Recording" },
      { type: "p", text: "Classes are not recorded unless you ask for a recording. Please do not publish recordings of a teacher without their permission." },
      { type: "p", text: `Last updated ${site.lastUpdated}.` },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund policy",
    description: `When and how ${site.name} refunds fees.`,
    blocks: [
      { type: "p", text: `You try ${site.trial.classes} classes free before paying anything, so most families know what they are getting. If things change after you have paid, this is how refunds work.` },
      { type: "ul", items: [
        "If you cancel within 7 days of your first payment, we refund that payment in full, less the value of any classes already taken.",
        "If you cancel later in a month, we refund the classes not yet taken in that month.",
        "If we cannot provide a teacher at your agreed times, we refund every class not delivered.",
        "Refunds are sent to the original payment method within 10 working days.",
      ] },
      { type: "p", text: `To ask for a refund, ${site.email ? `email ${site.email}` : "use the [contact page](/contact)"} with the student's name. Last updated ${site.lastUpdated}.` },
    ],
  },
];

export const getLegal = (slug: string) => legals.find((l) => l.slug === slug);
