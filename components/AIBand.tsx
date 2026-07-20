"use client";

import { CircleCheck } from "lucide-react";
import { useChat } from "@/components/ChatProvider";

const benefits = [
  "Understand your body better",
  "Build consistent healthy habits",
  "Improve performance & recovery",
  "Stay motivated with community",
  "Achieve long-term wellness",
];

export default function AIBand() {
  const { openChat } = useChat();

  return (
    <section className="aiband" id="ai">
      <div className="wrap">
        <div className="inner">
          <div>
            <h2>
              AI-Assisted.
              <span className="g">Human-Centered.</span>
            </h2>
            <p>
              KAC uses intelligent technology to analyse your activity,
              recovery, lifestyle and goals — so we can recommend the right
              programs, the right support, at the right time.
            </p>
            <div className="foot">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openChat}
              >
                Discover AI Wellness →
              </button>
            </div>
          </div>
          <ul className="benes">
            {benefits.map((b) => (
              <li key={b}>
                <span className="ic">
                  <CircleCheck strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
