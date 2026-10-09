import { cookies } from "next/headers";
import { createHash, createHmac, timingSafeEqual } from "crypto";

const COOKIE = "qa_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

const secret = () => process.env.AUTH_SECRET || `pw:${process.env.ADMIN_PASSWORD ?? ""}`;
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");
const sha = (s: string) => createHash("sha256").update(s).digest();

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return timingSafeEqual(sha(input), sha(pw));
}

export async function createSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
