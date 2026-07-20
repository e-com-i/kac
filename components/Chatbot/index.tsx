"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useChat } from "@/components/ChatProvider";
import { scriptedEngine } from "@/lib/chat/scriptedEngine";
import { emptyLead, isLeadComplete } from "@/lib/chat/types";
import type { ChatMessage, Lead } from "@/lib/chat/types";
import styles from "./chatbot.module.css";
import { Message, TypingIndicator } from "./Message";
import { Chips } from "./Chips";
import { SummaryCard } from "./SummaryCard";
import { QuickReplies } from "./QuickReplies";
import { Composer } from "./Composer";

// The engine that powers replies. Swap this for an LLM-backed implementation
// of ChatEngine (see lib/chat/types.ts) to enable free-form conversation —
// no changes needed anywhere else in this file.
const engine = scriptedEngine;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function postLead(lead: Lead) {
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  })
    .then((res) => {
      if (!res.ok) console.warn("[chat] lead submission failed:", res.status);
    })
    .catch((err) => console.warn("[chat] lead submission failed:", err));
}

export default function Chatbot() {
  const { open, openChat, closeChat } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "assistant", content: engine.greeting },
  ]);
  const [lead, setLead] = useState<Lead>(() => emptyLead());
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(
    engine.quickReplies ?? []
  );

  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message / typing indicator.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeChat();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeChat]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    const wasComplete = isLeadComplete(lead);
    const delayMs = 500 + Math.random() * 300;

    try {
      const [result] = await Promise.all([
        engine.reply(trimmed, lead, nextMessages),
        wait(delayMs),
      ]);

      setMessages((m) => [
        ...m,
        { role: "assistant", content: result.text },
      ]);
      setLead(result.lead);
      if (result.quickReplies) setQuickReplies(result.quickReplies);

      if (!wasComplete && isLeadComplete(result.lead)) {
        postLead(result.lead);
      }
    } finally {
      setTyping(false);
    }
  }

  function handleSend() {
    submit(input);
  }

  function handleQuickReply(option: string) {
    submit(option);
  }

  if (!open) {
    return (
      <button
        type="button"
        className={styles.fab}
        onClick={openChat}
        aria-label="Open KAC Assistant chat"
      >
        <MessageSquare aria-hidden="true" />
        Ask KAC
      </button>
    );
  }

  const done = isLeadComplete(lead);

  return (
    <div className={styles.panel} role="dialog" aria-label="KAC Assistant">
      <div className={styles.head}>
        <div className={styles.avatar}>K</div>
        <div>
          <div className={styles.title}>KAC Assistant</div>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            Online · here to help
          </div>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeChat}
          aria-label="Close chat"
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <Chips lead={lead} />

      <div className={styles.body} ref={bodyRef}>
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {done && <SummaryCard lead={lead} />}

      <QuickReplies
        options={quickReplies}
        onSelect={handleQuickReply}
        disabled={typing}
      />

      <Composer
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={typing || !input.trim()}
      />
    </div>
  );
}
