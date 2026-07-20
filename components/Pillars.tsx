import { Users, Cpu, Settings2, Heart } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Community Driven",
    desc: "We move together, we grow together.",
  },
  {
    icon: Cpu,
    title: "AI Assisted",
    desc: "Smart insights for your unique journey.",
  },
  {
    icon: Settings2,
    title: "Expert Coaching",
    desc: "Guided by professionals, driven by passion.",
  },
  {
    icon: Heart,
    title: "Lifelong Wellness",
    desc: "For a stronger body, sharper mind & better life.",
  },
];

export default function Pillars() {
  return (
    <section className="pillars">
      <div className="wrap">
        <div className="grid">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div className="pillar" key={title}>
              <div className="ic">
                <Icon strokeWidth={2} />
              </div>
              <div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
