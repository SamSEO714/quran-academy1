"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/content/site";

/** Fixed bar on phones so the trial is always one tap away. Hidden on the form pages themselves. */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Appears once the visitor has scrolled past the first screen, where the main button already is.
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show || pathname.startsWith("/free-trial") || pathname.startsWith("/contact")) return null;
  const wa = whatsappLink();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-2.5 backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <Link href="/free-trial" className="btn btn-gold flex-1">
          Book free trial
        </Link>
        {wa && (
          <a href={wa} rel="noopener" className="btn btn-line px-4" aria-label="Chat on WhatsApp">
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
