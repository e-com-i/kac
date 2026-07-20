"use client";

import { useChat } from "@/components/ChatProvider";

export default function Nav() {
  const { openChat } = useChat();

  return (
    <nav className="kac-nav">
      <div className="brand">
        <div>
          <div className="mark">
            K<b>A</b>C
          </div>
          <div className="sub">Kolkata Athletic Community</div>
        </div>
      </div>
      <div className="links">
        <a href="#home" className="active">
          Home
        </a>
        <a href="#about">About KAC</a>
        <a href="#offer">Our Programs</a>
        <a href="#ai">AI Wellness</a>
        <a href="#gallery">Gallery</a>
        <a href="#join">Contact</a>
      </div>
      <button type="button" className="btn btn-primary" onClick={openChat}>
        Become a member
      </button>
    </nav>
  );
}
