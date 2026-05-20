import Image from "next/image";
import { withBasePath } from "@/app/_lib/basePath";
import Reveal from "@/components/ui/Reveal";
import Typewriter from "@/components/fx/Typewriter";
import { PROFILE } from "@/app/_data/profile";

export default function Hero() {
  return (
    <section id="hero" className="stage" aria-labelledby="hero-claim">
      <div className="wrap">
        <Reveal>
          <p className="kicker">SECTION 01 / SELF-INTRO</p>
        </Reveal>

        <Reveal delayMs={120}>
          <h1 id="hero-claim" className="display mt-8">
            <Typewriter
              lines={["在 AI 时代，", "想象，是最重要的事情。"]}
              speedMs={58}
              startDelayMs={500}
              caret
            />
          </h1>
        </Reveal>

        <Reveal delayMs={260}>
          <hr className="accent-rule mt-12" />
        </Reveal>

        <Reveal delayMs={380}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-8 sm:gap-12">
            <div
              className="overflow-hidden bg-[color:var(--stage-2)] hud-frame"
              style={{
                width: 132,
                height: 132,
                borderRadius: 4,
                border: "1px solid var(--hair)",
                boxShadow:
                  "0 0 0 1px rgba(127,230,255,0.1) inset, 0 0 32px rgba(214,169,87,0.18)",
              }}
            >
              <span className="hud-corner-tr" aria-hidden />
              <span className="hud-corner-bl" aria-hidden />
              <Image
                src={withBasePath("/images/portrait/main.jpg")}
                alt={`${PROFILE.name} 人像`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <p
                className="font-mono"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  textShadow: "0 0 18px rgba(214,169,87,0.25)",
                }}
              >
                {PROFILE.name}
              </p>
              <p className="lede mt-3">独立开发者 · 在做能用的产品。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
