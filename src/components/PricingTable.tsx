"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Currency } from "@/content/types";
import { currencies, money, perClass, plans } from "@/content/pricing";

function guess(): Currency | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Europe/London") return "GBP";
    if (tz.startsWith("Australia/")) return "AUD";
    if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton)/.test(tz)) return "CAD";
  } catch {}
  return null;
}

export function PricingTable({ fixed, minutes }: { fixed?: Currency; minutes: number }) {
  const [cur, setCur] = useState<Currency>(fixed ?? "USD");
  useEffect(() => {
    if (fixed) return;
    const g = guess();
    if (g) setCur(g);
  }, [fixed]);

  return (
    <div>
      {!fixed && (
        <div role="radiogroup" aria-label="Currency" className="mb-5 inline-flex flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
          {currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              role="radio"
              aria-checked={cur === c.code}
              onClick={() => setCur(c.code)}
              className={`min-h-[2.5rem] rounded-lg px-3.5 text-[0.95rem] font-semibold ${cur === c.code ? "bg-ink text-white" : "text-ink hover:bg-wash"}`}
            >
              {c.country} <span className={cur === c.code ? "text-white/70" : "text-muted"}>{c.symbol}</span>
            </button>
          ))}
        </div>
      )}

      <ul className="overflow-hidden rounded-2xl border border-line bg-white">
        {plans.map((p, i) => (
          <li key={p.id} className={`grid items-center gap-x-6 gap-y-3 p-5 sm:p-6 md:grid-cols-[1.5fr_auto_auto] ${i > 0 ? "border-t border-line" : ""}`}>
            <div>
              <h3 className="text-[1.3rem]">{p.name}</h3>
              <p className="mt-1 text-muted">
                {p.classesPerMonth} classes a month, {minutes} minutes each. {p.bestFor}.
              </p>
            </div>
            <p className="md:text-right">
              <span className="font-display text-[2rem] font-semibold leading-none">{money(cur, p.prices[cur])}</span>
              <span className="text-muted"> a month</span>
              <span className="block text-sm text-muted">{money(cur, Math.round(perClass(p, cur) * 100) / 100)} a class</span>
            </p>
            <Link href="/free-trial" className={`btn ${i === 1 ? "btn-gold" : "btn-line"}`}>
              Try it free
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
