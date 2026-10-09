import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { storageMode } from "@/lib/leads";
import { logout } from "../actions";
import { Mark } from "@/components/Logo";
import { site } from "@/content/site";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const mode = storageMode();
  const alerts = Boolean((process.env.RESEND_API_KEY && process.env.LEAD_ALERT_TO && process.env.LEAD_ALERT_FROM) || process.env.LEAD_WEBHOOK_URL);

  return (
    <>
      <header className="on-ink bg-ink text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 font-semibold">
            <Mark light className="h-8 w-8" />
            {site.shortName} admin
          </Link>
          <nav aria-label="Admin" className="flex flex-wrap items-center gap-1 text-[0.97rem]">
            <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-white/10">
              Overview
            </Link>
            <Link href="/admin/leads" className="rounded-md px-3 py-2 hover:bg-white/10">
              Leads
            </Link>
            <a href="/admin/export" className="rounded-md px-3 py-2 hover:bg-white/10">
              Download CSV
            </a>
            <Link href="/" className="rounded-md px-3 py-2 hover:bg-white/10">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="cursor-pointer rounded-md px-3 py-2 hover:bg-white/10">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      {mode !== "postgres" && (
        <div role="status" className={`border-b px-5 py-3 text-center text-[0.95rem] ${mode === "none" ? "border-bad/30 bg-bad/10 text-bad" : "border-line bg-wash"}`}>
          {mode === "none"
            ? "No database is connected, so new leads are not being saved here. Add DATABASE_URL in your hosting settings and redeploy."
            : "Development mode: leads are saved to a file on this computer (.data/leads.json). Add DATABASE_URL before going live."}
        </div>
      )}
      {mode !== "none" && !alerts && (
        <div role="status" className="border-b border-line bg-white px-5 py-2.5 text-center text-sm text-muted">
          New-lead alerts are off. Add the Resend or webhook settings to be told the moment a request arrives.
        </div>
      )}

      <main className="wrap py-8 lg:py-10">{children}</main>
    </>
  );
}
