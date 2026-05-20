import Reveal from "@/components/ui/Reveal";
import { PROFILE } from "@/app/_data/profile";

export default function About() {
  return (
    <section id="about" className="stage" aria-labelledby="about-heading">
      <div className="wrap">
        <Reveal>
          <p className="kicker">SECTION 03 / ABOUT</p>
        </Reveal>

        <Reveal delayMs={120}>
          <h2
            id="about-heading"
            className="mt-8 font-mono"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              textShadow: "0 0 22px rgba(214,169,87,0.22)",
            }}
          >
            {PROFILE.oneLiner}
          </h2>
        </Reveal>

        <Reveal delayMs={260}>
          <div className="mt-10 space-y-4 max-w-[62ch]">
            {PROFILE.bio.map((p, i) => (
              <p
                key={i}
                className="terminal-line"
                style={{
                  fontSize: "clamp(.95rem, 1.18vw, 1.08rem)",
                  lineHeight: 1.85,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={420}>
          <p
            className="mt-10 font-mono text-sm"
            style={{
              letterSpacing: "0.16em",
              color: "var(--ink-faint)",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "var(--accent-cyan)" }}>[</span>{" "}
            AGE {PROFILE.age} · ON DELIVERY{" "}
            <span style={{ color: "var(--accent-cyan)" }}>]</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
