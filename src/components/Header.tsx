"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { href: "/courses", label: "Courses" },
  { href: "/online-quran-classes-for-kids", label: "For kids" },
  { href: "/online-quran-classes-for-adults", label: "For adults" },
  { href: "/female-quran-teacher-online", label: "Female teachers" },
  { href: "/pricing", label: "Fees" },
  { href: "/blog", label: "Guides" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-[0.97rem] font-medium hover:bg-wash ${active ? "text-lapis" : "text-ink"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/free-trial" className="btn btn-gold hidden min-h-[2.75rem] sm:inline-flex">
            Book free trial
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <ul className="wrap grid gap-1 py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-md px-3 py-3 text-lg font-medium hover:bg-wash">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/free-trial" className="btn btn-gold w-full">
                Book free trial
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
