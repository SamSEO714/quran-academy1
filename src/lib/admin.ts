import { redirect } from "next/navigation";
import { isAdmin } from "./auth";

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

const TZ = process.env.ADMIN_TIMEZONE || "UTC";

export const adminTimezone = TZ;

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });

export const fmtDay = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { timeZone: TZ, day: "numeric", month: "short" });

/** YYYY-MM-DD in the admin's time zone, for grouping leads by day. */
export const dayKey = (d: Date | string) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });

export function localTimeIn(tz: string): string {
  if (!tz) return "";
  try {
    return new Date().toLocaleString("en-GB", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false });
  } catch {
    return "";
  }
}
