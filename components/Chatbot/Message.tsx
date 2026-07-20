import styles from "./chatbot.module.css";
import type { ChatMessage } from "@/lib/chat/types";

export function Message({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.msgRowUser : ""}`}>
      <div
        className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className={styles.msgRow} aria-live="polite" aria-label="KAC Assistant is typing">
      <div className={styles.typing}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
