"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const GA = process.env.NEXT_PUBLIC_GA_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const KEY = "qa_consent";

type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

/** Call after a lead is submitted. Does nothing if the visitor declined cookies or no IDs are set. */
export function trackLead() {
  const w = window as W;
  try {
    w.gtag?.("event", "generate_lead", { currency: "USD", value: 1 });
    if (ADS && ADS_LABEL) w.gtag?.("event", "conversion", { send_to: `${ADS}/${ADS_LABEL}` });
    w.fbq?.("track", "Lead");
  } catch {
    /* never let tracking break the page */
  }
}

/** Loads Google Analytics, Google Ads and Meta Pixel only after the visitor accepts. Shows nothing if no IDs are configured. */
export function Tracking() {
  const [consent, setConsent] = useState<"unknown" | "granted" | "denied">("unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {}
    setReady(true);
  }, []);

  if (!GA && !ADS && !PIXEL) return null;

  const choose = (v: "granted" | "denied") => {
    try {
      window.localStorage.setItem(KEY, v);
    } catch {}
    setConsent(v);
  };

  const gtagId = GA || ADS;

  return (
    <>
      {consent === "granted" && gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${GA ? `gtag('config','${GA}');` : ""}${ADS ? `gtag('config','${ADS}');` : ""}`}
          </Script>
        </>
      )}
      {consent === "granted" && PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}

      {ready && consent === "unknown" && (
        <div role="dialog" aria-label="Cookies" className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-xl border border-line bg-white p-4 shadow-[0_12px_40px_rgb(15_35_64/0.18)] sm:bottom-4">
          <p className="text-[0.95rem]">
            We use cookies to measure which pages help families find us. Nothing is loaded until you choose.{" "}
            <Link href="/privacy-policy" className="link">
              Privacy policy
            </Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn btn-ink min-h-[2.5rem] flex-1" onClick={() => choose("granted")}>
              Accept
            </button>
            <button type="button" className="btn btn-line min-h-[2.5rem] flex-1" onClick={() => choose("denied")}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
