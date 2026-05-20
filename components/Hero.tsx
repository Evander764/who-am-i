import Image from "next/image";
import { withBasePath } from "@/app/_lib/basePath";
import Reveal from "@/components/ui/Reveal";
import { PROFILE } from "@/app/_data/profile";

export default function Hero() {
  return (
    <section id="hero" className="stage" aria-labelledby="hero-claim">
      <div className="wrap">
        <Reveal>
          <p className="kicker">自我介绍 · 2026</p>
        </Reveal>

        <Reveal delayMs={120}>
          <h1 id="hero-claim" className="display mt-6">
            在 AI 时代，
            <br />
            想象，是最重要的事情。
          </h1>
        </Reveal>

        <Reveal delayMs={260}>
          <hr className="accent-rule mt-10" />
        </Reveal>

        <Reveal delayMs={380}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-8 sm:gap-12">
            <div
              className="rounded-full overflow-hidden border border-[color:var(--hair)] bg-[color:var(--stage-2)]"
              style={{ width: 128, height: 128 }}
            >
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
              <p className="headline" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}>
                {PROFILE.name}
              </p>
              <p className="lede mt-2">独立开发者 · 在做能用的产品。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
