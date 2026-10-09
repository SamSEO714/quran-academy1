import Link from "next/link";
import { meta } from "@/lib/seo";
import { site, whatsappLink } from "@/content/site";
import { posts } from "@/content/blog";
import { Fire } from "./Fire";

export const metadata = meta({
  title: "Trial request received",
  description: "Your free trial request has been received.",
  path: "/free-trial/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  const wa = whatsappLink("Assalamu alaikum, I have just sent the free trial form.");
  return (
    <div className="wrap max-w-[46rem] py-14 lg:py-24">
      <Fire />
      <p className="grid h-14 w-14 place-items-center rounded-full bg-ok/10 text-ok" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </p>
      <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.6vw,3rem)]">Trial request received. Jazakallahu khairan.</h1>
      <p className="mt-5 text-[1.2rem] leading-relaxed text-muted">
        We will contact you within one working day to confirm your teacher and the time of your first class. Please keep an eye on WhatsApp and your phone.
      </p>

      {wa && (
        <p className="mt-8">
          <a href={wa} rel="noopener" className="btn btn-ink">
            Message us on WhatsApp now
          </a>
        </p>
      )}

      <h2 className="mt-12 text-[1.4rem]">Get ready for the first class</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-gold-deep">
        <li>Install {site.classApps} on a laptop or tablet.</li>
        <li>Choose a quiet spot with good internet. Headphones help.</li>
        <li>If your child is under 7, plan to sit nearby for the first few classes.</li>
      </ul>

      <h2 className="mt-12 text-[1.4rem]">While you wait</h2>
      <ul className="mt-4 space-y-2">
        {posts.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="link">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
