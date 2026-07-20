import styles from "./chatbot.module.css";

export function QuickReplies({
  options,
  onSelect,
  disabled,
}: {
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  if (options.length === 0) return null;

  return (
    <div className={styles.quickReplies}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.quickReply}
          onClick={() => onSelect(option)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
