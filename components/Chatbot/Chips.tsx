import { Check } from "lucide-react";
import styles from "./chatbot.module.css";
import type { Lead } from "@/lib/chat/types";

// 5 progress chips derived from the lead — matches the prototype, which
// tracks phone/email/city/interests/help (name has no chip since it's
// always asked first and shown in the header context instead).
const CHIP_DEFS: { key: keyof Lead; label: string }[] = [
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "city", label: "City" },
  { key: "interests", label: "Interests" },
  { key: "help", label: "Goals" },
];

export function Chips({ lead }: { lead: Lead }) {
  return (
    <div className={styles.chips}>
      {CHIP_DEFS.map(({ key, label }) => {
        const on = Boolean(lead[key] && lead[key].trim());
        return (
          <span
            key={key}
            className={`${styles.chip} ${on ? styles.chipOn : ""}`}
          >
            {on && <Check strokeWidth={3} aria-hidden="true" />}
            {label}
          </span>
        );
      })}
    </div>
  );
}
