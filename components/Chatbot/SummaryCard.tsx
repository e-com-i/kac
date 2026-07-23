"use client";

import { useState } from "react";
import styles from "./chatbot.module.css";
import type { Lead } from "@/lib/chat/types";

const ROWS: { key: keyof Lead; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "city", label: "City" },
  { key: "interests", label: "Interests" },
  { key: "help", label: "Goals" },
];

export function SummaryCard({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.done}>
      <button
        type="button"
        className={styles.doneToggle}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>✓ Shared with KAC</span>
        <span className={styles.doneChevron}>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className={styles.doneBody}>
          {ROWS.map(({ key, label }) => (
            <div key={key} className={styles.doneRow}>
              <b className={styles.doneLabel}>{label}</b>
              <span>{lead[key]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
