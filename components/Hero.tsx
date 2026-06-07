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
          <h1 id="hero-claim" className="display mt-6 sm:mt-8">
            <Typewriter
              lines={["19 岁，", "把 AI 做成真实产品。"]}
              speedMs={58}
              startDelayMs={500}
              caret
            />
          </h1>
        </Reveal>

        <Reveal delayMs={260}>
          <hr className="accent-rule mt-8 sm:mt-12" />
        </Reveal>

        <Reveal delayMs={380}>
          <div className="hero-id mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-5 sm:gap-12">
            <div
              className="hero-portrait overflow-hidden bg-[color:var(--stage-2)] hud-frame mx-auto sm:mx-0"
              style={{
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
                width={200}
                height={200}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="text-center sm:text-left">
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
              <p className="lede mt-3 mx-auto sm:mx-0">
                独立开发者 · AI 桌面自动化 · 内容系统 · 本地工具基础设施。
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
