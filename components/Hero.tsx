"use client";

import { useChat } from "@/components/ChatProvider";

export default function Hero() {
  const { openChat } = useChat();

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Kolkata Athletic Community — KAC</p>
            <h1>
              Stronger Together.
              <br />
              <span className="g">Healthier Together.</span>
            </h1>
            <p className="lede">
              A community. A movement. A healthier Kolkata.
            </p>
            <p className="sub">
              KAC brings together people of all ages and fitness levels to
              move, learn, grow and inspire one another.
            </p>
            <div className="row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openChat}
              >
                Join the community →
              </button>
              <a
                href="#offer"
                className="btn btn-ghost"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.5)" }}
              >
                See programs
              </a>
            </div>
          </div>
          <div className="hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero.png"
              alt="Runners on Howrah Bridge at sunrise"
              className="grayscale-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
