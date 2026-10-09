import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: online Quran classes for kids and adults`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0f2340", color: "#fff", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="76" height="76" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#ffffff" />
            <path d="M14 22c7-4 13-3 18 2 5-5 11-6 18-2" fill="none" stroke="#8a5f0e" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M18 31l28 21M46 31L18 52" fill="none" stroke="#0f2340" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 38, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 980 }}>Online Quran classes for kids and adults</div>
          <div style={{ marginTop: 26, fontSize: 34, color: "#e3b041" }}>{`One teacher, one student. ${site.trial.classes} free trial classes.`}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.75)" }}>Noorani Qaida, Tajweed, Hifz, Ijazah. USA, UK, Canada, Australia.</div>
      </div>
    ),
    size,
  );
}
