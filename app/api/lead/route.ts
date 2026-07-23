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

const GOOGLE_FORM_ID =
  "1FAIpQLSfCI8PtRVBDm_f0HNAv5K2pVpyxbp8XeMFn1YOIkSxDCabctg";

const ENTRY_IDS = {
  name: "entry.661025279",
  phone: "entry.1041340059",
  email: "entry.1230124458",
  city: "entry.1500550885",
  interests: "entry.816613195",
  help: "entry.1635812692",
};

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

  const formData = new URLSearchParams();
  formData.append(ENTRY_IDS.name, body.name);
  formData.append(ENTRY_IDS.phone, body.phone);
  formData.append(ENTRY_IDS.email, body.email);
  formData.append(ENTRY_IDS.city, body.city);
  formData.append(ENTRY_IDS.interests, body.interests);
  formData.append(ENTRY_IDS.help, body.help);

  try {
    const res = await fetch(
      `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    console.log("[lead] submitted to Google Form:", body.name, res.status);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Google Form submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
