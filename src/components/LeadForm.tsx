"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { COUNTRIES, STUDENT_FOR, TEACHER_PREFS } from "@/lib/lead-types";
import { readAttribution } from "./Attribution";

type Props = {
  source: string;
  courses: string[];
  trialClasses: number;
  variant?: "short" | "full";
  defaultCountry?: string;
  defaultCourse?: string;
  defaultStudent?: string;
  defaultTeacher?: string;
  submitLabel?: string;
};

const NOT_SURE = "Not sure yet";

function countryFromTimezone(tz: string): string {
  if (tz === "Europe/London" || tz === "Europe/Belfast") return "United Kingdom";
  if (tz.startsWith("Australia/")) return "Australia";
  if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Whitehorse|Yellowknife|Iqaluit)/.test(tz)) return "Canada";
  if (tz.startsWith("America/") || tz.startsWith("US/") || tz === "Pacific/Honolulu") return "United States";
  if (tz === "Pacific/Auckland") return "New Zealand";
  if (tz === "Europe/Dublin") return "Ireland";
  if (tz === "Asia/Dubai") return "United Arab Emirates";
  if (tz === "Asia/Karachi") return "Pakistan";
  return "";
}

export function LeadForm({ source, courses, trialClasses, variant = "short", defaultCountry = "", defaultCourse = "", defaultStudent = "", defaultTeacher = "", submitLabel }: Props) {
  const router = useRouter();
  const uid = useId();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [timezone, setTimezone] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setTimezone(tz);
      if (!defaultCountry) setCountry((c) => c || countryFromTimezone(tz));
    } catch {}
  }, [defaultCountry]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const attr = readAttribution();
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      country: fd.get("country"),
      course: fd.get("course"),
      studentFor: fd.get("studentFor") ?? defaultStudent,
      studentAge: fd.get("studentAge") ?? "",
      teacherPref: fd.get("teacherPref"),
      preferredTime: fd.get("preferredTime"),
      message: fd.get("message") ?? "",
      website: fd.get("website"), // honeypot
      elapsed: Date.now() - startedAt,
      timezone,
      sourcePage: source,
      landingPage: attr.landingPage ?? "",
      referrer: attr.referrer ?? "",
      utmSource: attr.utm_source ?? "",
      utmMedium: attr.utm_medium ?? "",
      utmCampaign: attr.utm_campaign ?? "",
      utmTerm: attr.utm_term ?? "",
      utmContent: attr.utm_content ?? "",
      gclid: attr.gclid ?? "",
      fbclid: attr.fbclid ?? "",
    };

    setState("sending");
    setErrors({});
    setFormError("");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string>; message?: string };
      if (res.ok && json.ok) {
        try {
          window.sessionStorage.setItem("qa_lead_sent", "1");
        } catch {}
        router.push("/free-trial/thank-you");
        return;
      }
      setErrors(json.errors ?? {});
      setFormError(json.message ?? (json.errors ? "Check the highlighted fields and send again." : "The form could not be sent. Try again in a moment."));
      setState("error");
    } catch {
      setFormError("No connection. Check your internet and send again.");
      setState("error");
    }
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (n: string) =>
    errors[n] ? (
      <p id={id(n + "-err")} className="mt-1 text-sm text-bad">
        {errors[n]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} method="post" action="/api/leads" className="grid gap-3.5 text-ink">
      <input type="hidden" name="sourcePage" value={source} />
      <div>
        <label htmlFor={id("name")} className="label">
          Your name
        </label>
        <input id={id("name")} name="name" className="field" autoComplete="name" required maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-err") : undefined} />
        {err("name")}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("phone")} className="label">
            Phone or WhatsApp
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="+1 415 555 0123" required maxLength={30} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-err") : undefined} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={id("email")} className="label">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={id("email")} name="email" type="email" className="field" autoComplete="email" maxLength={120} aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-err") : undefined} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("country")} className="label">
            Country
          </label>
          <select id={id("country")} name="country" className="field" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Choose country</option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("course")} className="label">
            Course
          </label>
          <select id={id("course")} name="course" className="field" defaultValue={defaultCourse || NOT_SURE}>
            <option>{NOT_SURE}</option>
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {variant === "full" && (
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={id("studentFor")} className="label">
              Classes are for
            </label>
            <select id={id("studentFor")} name="studentFor" className="field" defaultValue={defaultStudent || STUDENT_FOR[0]}>
              {STUDENT_FOR.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={id("studentAge")} className="label">
              Student&apos;s age <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id={id("studentAge")} name="studentAge" className="field" inputMode="numeric" maxLength={20} placeholder="e.g. 7, or 6 and 9" />
          </div>
        </div>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("teacherPref")} className="label">
            Teacher
          </label>
          <select id={id("teacherPref")} name="teacherPref" className="field" defaultValue={defaultTeacher || TEACHER_PREFS[0]}>
            {TEACHER_PREFS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("preferredTime")} className="label">
            Best days and time
          </label>
          <input id={id("preferredTime")} name="preferredTime" className="field" maxLength={120} placeholder="Weekdays after 5 pm" />
        </div>
      </div>

      {variant === "full" && (
        <div>
          <label htmlFor={id("message")} className="label">
            Anything the teacher should know <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id={id("message")} name="message" className="field min-h-24" maxLength={1000} rows={3} />
        </div>
      )}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">{formError && <p className="rounded-md bg-bad/10 px-3 py-2 text-[0.95rem] text-bad">{formError}</p>}</div>

      <button type="submit" className="btn btn-gold w-full text-[1.05rem]" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : (submitLabel ?? `Book ${trialClasses} free trial classes`)}
      </button>
      <p className="text-sm text-muted">
        No card needed. We reply within one working day. By sending this form you agree to be contacted about your request. See the{" "}
        <Link href="/privacy-policy" className="link">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
