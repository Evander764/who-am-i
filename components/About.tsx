import Reveal from "@/components/ui/Reveal";
import { PROFILE } from "@/app/_data/profile";

export default function About() {
  return (
    <section id="about" className="stage" aria-labelledby="about-heading">
      <div className="wrap">
        <Reveal>
          <p className="kicker">关于 · ABOUT</p>
        </Reveal>

        <Reveal delayMs={120}>
          <h2
            id="about-heading"
            className="headline mt-6"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            {PROFILE.oneLiner}
          </h2>
        </Reveal>

        <Reveal delayMs={260}>
          <div className="mt-10 space-y-5 max-w-[58ch]">
            {PROFILE.bio.map((p, i) => (
              <p key={i} className="body-lg">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={400}>
          <p className="mt-10 text-sm tracking-[0.05em] text-[color:var(--ink-faint)]">
            {PROFILE.age} 岁 · 在交付路上
          </p>
        </Reveal>
      </div>
    </section>
  );
}
