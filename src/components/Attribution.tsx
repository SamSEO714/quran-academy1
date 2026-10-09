"use client";

import { useEffect } from "react";

const KEY = "qa_attr";
const TAGS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attr = Partial<Record<(typeof TAGS)[number], string>> & { referrer?: string; landingPage?: string };

/** Remembers how a visitor first arrived (campaign tags, referrer, landing page) so the lead carries it. */
export function Attribution() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tagged: Attr = {};
      TAGS.forEach((t) => {
        const v = params.get(t);
        if (v) tagged[t] = v.slice(0, 200);
      });
      const hasTags = Object.keys(tagged).length > 0;
      const stored = window.localStorage.getItem(KEY);
      // A new tagged click replaces the stored one. Untagged visits never overwrite it.
      if (hasTags || !stored) {
        const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
        const value: Attr = { ...tagged, referrer: ref.slice(0, 300), landingPage: (window.location.pathname + window.location.search).slice(0, 300) };
        window.localStorage.setItem(KEY, JSON.stringify(value));
      }
    } catch {
      /* storage blocked: the form still works, just without attribution */
    }
  }, []);
  return null;
}

export function readAttribution(): Attr {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Attr;
  } catch {
    return {};
  }
}
