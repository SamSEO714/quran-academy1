import postgres from "postgres";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Lead, LeadInput, LeadStatus } from "./lead-types";

/**
 * Lead storage.
 * - With DATABASE_URL (or POSTGRES_URL) set: Postgres. Use this on Vercel (Neon, Supabase or any Postgres).
 * - Without it, on your own computer: a JSON file in .data/leads.json, so the dashboard works while developing.
 * - Without it on Vercel: nothing can be saved, so the API falls back to email/webhook alerts only.
 */

type Sql = ReturnType<typeof postgres>;
const g = globalThis as unknown as { __qaSql?: Sql; __qaReady?: Promise<void> };

const dbUrl = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

export type StorageMode = "postgres" | "file" | "none";
export function storageMode(): StorageMode {
  if (dbUrl()) return "postgres";
  if (process.env.VERCEL) return "none";
  return "file";
}

function sql(): Sql {
  if (!g.__qaSql) {
    g.__qaSql = postgres(dbUrl(), {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      onnotice: () => {},
      transform: postgres.toCamel,
    });
  }
  return g.__qaSql;
}

async function ready() {
  if (!g.__qaReady) {
    g.__qaReady = (async () => {
      await sql()`
        create table if not exists leads (
          id text primary key,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now(),
          status text not null default 'new',
          notes text not null default '',
          name text not null,
          phone text not null default '',
          email text not null default '',
          country text not null default '',
          course text not null default '',
          student_for text not null default '',
          student_age text not null default '',
          teacher_pref text not null default '',
          preferred_time text not null default '',
          timezone text not null default '',
          message text not null default '',
          source_page text not null default '',
          landing_page text not null default '',
          referrer text not null default '',
          utm_source text not null default '',
          utm_medium text not null default '',
          utm_campaign text not null default '',
          utm_term text not null default '',
          utm_content text not null default '',
          gclid text not null default '',
          fbclid text not null default ''
        )`;
      await sql()`create index if not exists leads_created_at_idx on leads (created_at desc)`;
    })().catch((e) => {
      g.__qaReady = undefined;
      throw e;
    });
  }
  return g.__qaReady;
}

const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v));
const fromRow = (r: Record<string, unknown>): Lead => ({ ...(r as unknown as Lead), createdAt: iso(r.createdAt), updatedAt: iso(r.updatedAt) });

// ---------- file fallback (local development only) ----------
const FILE = path.join(process.cwd(), ".data", "leads.json");
async function readFile(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Lead[];
  } catch {
    return [];
  }
}
async function writeFile(leads: Lead[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));
}

// ---------- public API ----------
export class NoStorageError extends Error {}

export async function createLead(input: LeadInput): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = { id: randomUUID(), createdAt: now, updatedAt: now, status: "new", notes: "", ...input };
  const mode = storageMode();
  if (mode === "none") throw new NoStorageError("No database configured");
  if (mode === "file") {
    const all = await readFile();
    all.unshift(lead);
    await writeFile(all);
    return lead;
  }
  await ready();
  await sql()`
    insert into leads (id, created_at, updated_at, status, notes, name, phone, email, country, course, student_for, student_age,
      teacher_pref, preferred_time, timezone, message, source_page, landing_page, referrer,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid)
    values (${lead.id}, ${lead.createdAt}, ${lead.updatedAt}, ${lead.status}, ${lead.notes}, ${lead.name}, ${lead.phone}, ${lead.email},
      ${lead.country}, ${lead.course}, ${lead.studentFor}, ${lead.studentAge}, ${lead.teacherPref}, ${lead.preferredTime},
      ${lead.timezone}, ${lead.message}, ${lead.sourcePage}, ${lead.landingPage}, ${lead.referrer},
      ${lead.utmSource}, ${lead.utmMedium}, ${lead.utmCampaign}, ${lead.utmTerm}, ${lead.utmContent}, ${lead.gclid}, ${lead.fbclid})`;
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  const mode = storageMode();
  if (mode === "none") return [];
  if (mode === "file") return readFile();
  await ready();
  const rows = await sql()`select * from leads order by created_at desc limit 5000`;
  return rows.map(fromRow);
}

export async function getLead(id: string): Promise<Lead | null> {
  const mode = storageMode();
  if (mode === "none") return null;
  if (mode === "file") return (await readFile()).find((l) => l.id === id) ?? null;
  await ready();
  const rows = await sql()`select * from leads where id = ${id} limit 1`;
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }): Promise<void> {
  const mode = storageMode();
  if (mode === "none") return;
  const now = new Date().toISOString();
  if (mode === "file") {
    const all = await readFile();
    const lead = all.find((l) => l.id === id);
    if (!lead) return;
    if (patch.status !== undefined) lead.status = patch.status;
    if (patch.notes !== undefined) lead.notes = patch.notes;
    lead.updatedAt = now;
    await writeFile(all);
    return;
  }
  await ready();
  if (patch.status !== undefined) await sql()`update leads set status = ${patch.status}, updated_at = ${now} where id = ${id}`;
  if (patch.notes !== undefined) await sql()`update leads set notes = ${patch.notes}, updated_at = ${now} where id = ${id}`;
}

export async function deleteLead(id: string): Promise<void> {
  const mode = storageMode();
  if (mode === "none") return;
  if (mode === "file") {
    await writeFile((await readFile()).filter((l) => l.id !== id));
    return;
  }
  await ready();
  await sql()`delete from leads where id = ${id}`;
}
