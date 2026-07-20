"use client";

import { Footprints, Briefcase, Trophy, BrainCircuit } from "lucide-react";
import { useChat } from "@/components/ChatProvider";

export default function OfferCards() {
  const { openChat } = useChat();

  return (
    <section className="section" id="offer">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">What we offer</span>
          <h2 className="sec-title">Programs for every body, every goal.</h2>
          <p className="sec-sub">
            From community runs to corporate wellness and AI-personalised
            coaching — find the path that fits your life.
          </p>
        </div>
      </div>
      <div className="offer">
        <div className="ocard">
          <div className="ic">
            <Footprints strokeWidth={2} />
          </div>
          <h3>
            Community
            <br />
            Programs
          </h3>
          <ul>
            <li>Community Runs</li>
            <li>Walking Clubs</li>
            <li>Cycling Groups</li>
            <li>Yoga &amp; Mobility</li>
            <li>Strength &amp; Conditioning</li>
            <li>Outdoor Adventures</li>
            <li>And more…</li>
          </ul>
          <div className="foot">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openChat}
            >
              Explore →
            </button>
          </div>
        </div>
        <div className="ocard">
          <div className="ic">
            <Briefcase strokeWidth={2} />
          </div>
          <h3>
            Corporate
            <br />
            Wellness
          </h3>
          <ul>
            <li>Employee Wellness Programs</li>
            <li>Workplace Challenges</li>
            <li>Health Assessments (AI)</li>
            <li>Nutrition &amp; Lifestyle Coaching</li>
            <li>Stress Management</li>
            <li>Team Building</li>
            <li>And more…</li>
          </ul>
          <div className="foot">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openChat}
            >
              Explore →
            </button>
          </div>
        </div>
        <div className="ocard">
          <div className="ic">
            <Trophy strokeWidth={2} />
          </div>
          <h3>
            Sports &amp;
            <br />
            Performance
          </h3>
          <ul>
            <li>Athletic Conditioning</li>
            <li>Endurance Training</li>
            <li>Running Coaching</li>
            <li>Performance Testing</li>
            <li>Injury Prevention</li>
            <li>Recovery Planning</li>
            <li>And more…</li>
          </ul>
          <div className="foot">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openChat}
            >
              Explore →
            </button>
          </div>
        </div>
        <div className="ocard dark">
          <div className="ic">
            <BrainCircuit strokeWidth={2} />
          </div>
          <h3>
            AI-Powered
            <br />
            Wellness
          </h3>
          <p>
            Our AI platform understands your lifestyle, goals, habits and
            health patterns to personalise your fitness journey with
            data-driven insights and expert guidance.
          </p>
          <div className="foot">
            <button
              type="button"
              className="btn btn-primary"
              onClick={openChat}
            >
              Learn more →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
