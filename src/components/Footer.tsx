import Link from "next/link";
import { Logo } from "./Logo";
import { site, whatsappLink, trialLabel } from "@/content/site";
import { courses } from "@/content/courses";
import { countryLandings, audienceLandings } from "@/content/pages";

const socials = Object.entries(site.social).filter(([, v]) => v);

export function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="on-ink bg-ink text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-white/75">{site.description}</p>
          <Link href="/free-trial" className="btn btn-gold mt-6">
            {trialLabel}
          </Link>
          <ul className="mt-6 space-y-1.5 text-white/85">
            {wa && (
              <li>
                <a href={wa} className="underline-offset-2 hover:underline" rel="noopener">
                  WhatsApp: +{site.whatsapp}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="underline-offset-2 hover:underline">
                  {site.email}
                </a>
              </li>
            )}
            {site.address && <li>{site.address}</li>}
          </ul>
        </div>

        <FooterList title="Courses" links={courses.map((c) => ({ href: `/courses/${c.slug}`, label: c.name }))} />
        <FooterList
          title="Classes by country"
          links={countryLandings.map((l) => ({ href: `/${l.slug}`, label: `Online Quran classes ${l.nav}` }))}
          second={{ title: "Classes for", links: audienceLandings.map((l) => ({ href: `/${l.slug}`, label: l.nav.replace("For ", "").replace(/^./, (c) => c.toUpperCase()) })) }}
        />
        <FooterList
          title="Academy"
          links={[
            { href: "/about", label: "About us" },
            { href: "/pricing", label: "Fees" },
            { href: "/faq", label: "Questions" },
            { href: "/blog", label: "Guides" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy-policy", label: "Privacy policy" },
            { href: "/terms", label: "Terms" },
            { href: "/refund-policy", label: "Refund policy" },
          ]}
        />
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A project of{" "}
            <a href={site.organisation.url} className="underline underline-offset-2 hover:text-white">
              {site.organisation.name}
            </a>
            .
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-4">
              {socials.map(([k, v]) => (
                <li key={k}>
                  <a href={v} rel="noopener me" className="capitalize underline-offset-2 hover:text-white hover:underline">
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

type L = { href: string; label: string };
function FooterList({ title, links, second }: { title: string; links: L[]; second?: { title: string; links: L[] } }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans text-base font-semibold tracking-normal text-gold">{title}</h2>
      <ul className="mt-3 space-y-2 text-white/85">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="underline-offset-2 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {second && (
        <>
          <h2 className="mt-7 font-sans text-base font-semibold tracking-normal text-gold">{second.title}</h2>
          <ul className="mt-3 space-y-2 text-white/85">
            {second.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-2 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
