// Provider-agnostic chat engine contract.
//
// `ChatEngine` is the seam between the Chatbot UI and whatever powers its
// replies. Today `scriptedEngine.ts` implements it with a deterministic,
// zero-cost script (Option A from the README). Later, an LLM-backed engine
// (Gemini, Groq/OpenRouter, or Anthropic Claude via `app/api/chat/route.ts`)
// can implement the same interface and be swapped in without touching any
// component in `components/Chatbot/`.

/** The six fields the chatbot collects from a visitor. */
export interface Lead {
  name: string;
  phone: string;
  email: string;
  city: string;
  interests: string;
  help: string;
}

export function emptyLead(): Lead {
  return { name: "", phone: "", email: "", city: "", interests: "", help: "" };
}

/** Canonical capture order: name -> phone -> email -> city -> interests -> goals. */
export const LEAD_FIELDS: (keyof Lead)[] = [
  "name",
  "phone",
  "email",
  "city",
  "interests",
  "help",
];

export function isLeadComplete(lead: Lead): boolean {
  return LEAD_FIELDS.every((field) => Boolean(lead[field] && lead[field].trim()));
}

/** A single turn in the conversation transcript. */
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Result of asking an engine to respond to the latest user input. */
export interface ChatEngineResult {
  /** The assistant's reply text to render as a bot bubble. */
  text: string;
  /** The (possibly updated) lead after processing this turn. */
  lead: Lead;
  /** Optional tappable quick-reply chips to render above the composer. */
  quickReplies?: string[];
}

/** Pluggable brain behind the Chatbot UI. */
export interface ChatEngine {
  /** The greeting shown as the first assistant message when the panel opens. */
  greeting: string;
  /**
   * Default set of tappable quick-reply chip labels rendered above the
   * composer (e.g. "See programs", "Talk to a human"). A `reply()` result
   * may override this per-turn via `ChatEngineResult.quickReplies`.
   */
  quickReplies?: string[];
  /**
   * Process one piece of user input and produce the next reply.
   * Implementations may be deterministic (scripted) or call out to an LLM.
   */
  reply(
    input: string,
    lead: Lead,
    messages: ChatMessage[]
  ): Promise<ChatEngineResult>;
}
