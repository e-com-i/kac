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
  return (
    <div className={styles.done}>
      <h4 className={styles.doneTitle}>✓ Shared with KAC</h4>
      {ROWS.map(({ key, label }) => (
        <div key={key} className={styles.doneRow}>
          <b className={styles.doneLabel}>{label}</b>
          <span>{lead[key]}</span>
        </div>
      ))}
    </div>
  );
}
