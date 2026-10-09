"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import { deleteLead, updateLead } from "@/lib/leads";
import { STATUSES, type LeadStatus } from "@/lib/lead-types";
import { rateLimited } from "@/lib/validate";

export async function login(formData: FormData) {
  const ip = ((await headers()).get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(`login:${ip}`, 8, 15 * 60 * 1000)) redirect("/admin/login?error=locked");

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 700)); // slows guessing
    redirect("/admin/login?error=wrong");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveLead(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = formData.get("notes");
  if (!id) return;
  await updateLead(id, {
    status: STATUSES.some((s) => s.id === status) ? (status as LeadStatus) : undefined,
    notes: typeof notes === "string" ? notes.slice(0, 5000) : undefined,
  });
  revalidatePath("/admin", "layout");
  const back = String(formData.get("back") ?? "");
  redirect(back.startsWith("/admin") ? back : `/admin/leads/${id}?saved=1`);
}

export async function removeLead(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  if (id) await deleteLead(id);
  revalidatePath("/admin", "layout");
  redirect("/admin/leads?deleted=1");
}
