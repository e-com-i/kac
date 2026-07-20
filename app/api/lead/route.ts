import { NextResponse } from "next/server";
import type { Lead } from "@/lib/chat/types";

const REQUIRED_FIELDS: (keyof Lead)[] = [
  "name",
  "phone",
  "email",
  "city",
  "interests",
  "help",
];

function isValidLead(value: unknown): value is Lead {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return REQUIRED_FIELDS.every(
    (field) => typeof record[field] === "string" && record[field] !== ""
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!isValidLead(body)) {
    return NextResponse.json(
      { ok: false, error: "Lead is missing required fields" },
      { status: 400 }
    );
  }

  // Server-side log for now — visible in the Next.js server console.
  console.log("[lead] captured:", body);

  // TODO: persist to Google Sheet (Apps Script webhook) / Formspree — see README "free sink" options
  // e.g. await fetch(process.env.LEAD_SINK_WEBHOOK_URL, { method: "POST", body: JSON.stringify(body) });

  return NextResponse.json({ ok: true });
}
