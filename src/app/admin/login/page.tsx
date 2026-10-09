import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { login } from "../actions";
import { Mark } from "@/components/Logo";
import { site } from "@/content/site";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const configured = adminConfigured();

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-[0_18px_50px_rgb(15_35_64/0.1)]">
        <Mark className="h-11 w-11" />
        <h1 className="mt-5 text-[1.6rem]">{site.shortName} admin</h1>
        <p className="mt-1 text-muted">Sign in to see trial requests.</p>

        {!configured ? (
          <p className="mt-6 rounded-lg bg-wash px-4 py-3 text-[0.95rem]">
            The dashboard is locked because no password has been set. Add <code className="font-semibold">ADMIN_PASSWORD</code> and <code className="font-semibold">AUTH_SECRET</code> to your environment variables, then redeploy.
          </p>
        ) : (
          <form action={login} className="mt-6 grid gap-4">
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input id="password" name="password" type="password" className="field" autoComplete="current-password" required autoFocus aria-describedby={error ? "login-error" : undefined} />
            </div>
            {error && (
              <p id="login-error" role="alert" className="rounded-md bg-bad/10 px-3 py-2 text-[0.95rem] text-bad">
                {error === "locked" ? "Too many attempts. Wait 15 minutes and try again." : "That password is not correct."}
              </p>
            )}
            <button type="submit" className="btn btn-ink w-full">
              Sign in
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
