// Option A from the README: a free, deterministic, no-API-key chat flow.
//
// Asks for name -> phone -> email -> city -> interests -> goals, one field
// at a time, validates each answer, and produces warm, short replies. Also
// handles a small set of canned "quick reply" FAQs without consuming the
// field currently being asked about. This is a pure, synchronous-feeling
// implementation (no network calls) — the UI layer is responsible for the
// ~500-800ms typing-indicator delay described in the design spec.

import { LEAD_FIELDS } from "./types";
import type { ChatEngine, ChatEngineResult, ChatMessage, Lead } from "./types";

const FIELD_ORDER = LEAD_FIELDS;

/** The bare question text for each field — reused for re-asks and after quick replies. */
const QUESTIONS: Record<keyof Lead, string> = {
  name: "What's your name?",
  phone: "What's the best phone number to reach you on?",
  email: "And what's a good email address for you?",
  city: "Which city are you in?",
  interests:
    "What kind of fitness activities are you most interested in — running, yoga, strength training, cycling, or something else?",
  help: "Last one — what would you like KAC to help you with? Joining a program, corporate wellness, personalised coaching…",
};

const ERROR_MESSAGES: Record<keyof Lead, string> = {
  name: "I didn't quite catch a name there — could you tell me what to call you?",
  phone:
    "That doesn't look like a valid phone number — could you share one with 8–15 digits (e.g. +91 98765 43210)?",
  email:
    "Hmm, that doesn't look like a valid email address — mind double-checking it?",
  city: "Sorry, I didn't catch that — which city are you in?",
  interests:
    "Could you tell me a little about what fitness activities interest you?",
  help: "Could you tell me a bit more about what you'd like KAC to help you with?",
};

const VALIDATORS: Record<keyof Lead, (value: string) => boolean> = {
  name: (v) => v.trim().length > 0,
  phone: (v) => {
    const trimmed = v.trim();
    if (!/^[+\d][\d\s-]*$/.test(trimmed)) return false;
    const digits = trimmed.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  },
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  city: (v) => v.trim().length > 0,
  interests: (v) => v.trim().length > 0,
  help: (v) => v.trim().length > 0,
};

export const QUICK_REPLIES = [
  "See programs",
  "Where are you located?",
  "Talk to a human",
] as const;

const QUICK_REPLY_ANSWERS: Record<string, string> = {
  "see programs":
    "KAC programs include Community Runs, Walking Clubs, Cycling Groups, Yoga & Mobility, Strength & Conditioning, Outdoor Adventures, Corporate Wellness, Sports & Performance coaching, and AI-Powered personalised wellness.",
  "where are you located?":
    "We're based in Kolkata, West Bengal, India — and we run programs across the city.",
  "talk to a human":
    "Of course! You can reach the KAC team directly at kolkataathleticcommunity@gmail.com or +91 81050 60097.",
};

function nextPendingField(lead: Lead): keyof Lead | null {
  for (const field of FIELD_ORDER) {
    if (!lead[field] || !lead[field].trim()) return field;
  }
  return null;
}

function transitionMessage(justCaptured: keyof Lead, lead: Lead): string {
  switch (justCaptured) {
    case "name":
      return `Nice to meet you, ${lead.name.trim()}! ${QUESTIONS.phone}`;
    case "phone":
      return `Got it, thanks! ${QUESTIONS.email}`;
    case "email":
      return `Perfect, noted. ${QUESTIONS.city}`;
    case "city":
      return `Thanks! ${QUESTIONS.interests}`;
    case "interests":
      return `Love it — KAC runs community programs like Yoga & Mobility, Strength & Conditioning, Cycling Groups and Sports & Performance coaching that could be a great fit. ${QUESTIONS.help}`;
    case "help":
      // "help" is the last field — this branch is unreachable in practice
      // because reply() calls finalMessage() instead once it's captured.
      return QUESTIONS.help;
  }
}

function finalMessage(lead: Lead): string {
  return `Thank you, ${lead.name.trim()}! 🎉 I've got everything I need — a KAC coach will reach out within 1-2 days to help you get started. Feel free to ask me anything else in the meantime!`;
}

const COMPLETE_FOLLOWUP =
  "Let me know if there's anything else — a KAC coach will be in touch within 1-2 days!";

export const scriptedEngine: ChatEngine = {
  greeting:
    "Hi! I'm the KAC assistant 👋\n\nI'd love to connect you with the right programs at Kolkata Athletic Community. Can I grab a few quick details? First — what's your name?",

  quickReplies: [...QUICK_REPLIES],

  async reply(
    input: string,
    lead: Lead,
    _messages: ChatMessage[]
  ): Promise<ChatEngineResult> {
    void _messages; // scripted flow only needs current lead state, not history
    const trimmed = input.trim();
    const currentField = nextPendingField(lead);

    // Quick-reply FAQ: answer, then re-ask the pending question without
    // consuming it as the answer to that field.
    const canned = QUICK_REPLY_ANSWERS[trimmed.toLowerCase()];
    if (canned) {
      const followUp = currentField ? QUESTIONS[currentField] : COMPLETE_FOLLOWUP;
      return {
        text: `${canned}\n\n${followUp}`,
        lead,
        quickReplies: [...QUICK_REPLIES],
      };
    }

    if (!currentField) {
      return {
        text: "You're all set! A KAC coach will be in touch within 1-2 days. Anything else I can help with in the meantime?",
        lead,
        quickReplies: [...QUICK_REPLIES],
      };
    }

    if (!VALIDATORS[currentField](trimmed)) {
      return {
        text: ERROR_MESSAGES[currentField],
        lead,
        quickReplies: [...QUICK_REPLIES],
      };
    }

    const updatedLead: Lead = { ...lead, [currentField]: trimmed };
    const nextField = nextPendingField(updatedLead);
    const text = nextField
      ? transitionMessage(currentField, updatedLead)
      : finalMessage(updatedLead);

    return { text, lead: updatedLead, quickReplies: [...QUICK_REPLIES] };
  },
};
