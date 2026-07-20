"use client";

import { useChat } from "@/components/ChatProvider";

export default function CTA() {
  const { openChat } = useChat();

  return (
    <section className="cta" id="join">
      <div className="wrap">
        <div className="inner">
          <div>
            <h2>Ready to start your journey?</h2>
            <p>Join Kolkata&apos;s most vibrant fitness community today.</p>
          </div>
          <button type="button" className="btn" onClick={openChat}>
            Become a member →
          </button>
        </div>
      </div>
    </section>
  );
}
