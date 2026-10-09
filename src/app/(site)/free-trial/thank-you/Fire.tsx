"use client";

import { useEffect } from "react";
import { trackLead } from "@/components/Tracking";

/** Fires the conversion once, and only when the visitor really came from a sent form. */
export function Fire() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("qa_lead_sent") !== "1") return;
      window.sessionStorage.removeItem("qa_lead_sent");
    } catch {
      return;
    }
    // Tracking scripts load after the page, so give them a moment.
    const t = window.setTimeout(trackLead, 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
