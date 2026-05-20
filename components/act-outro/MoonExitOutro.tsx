"use client";

// §07 月升归档收尾
// 移植自 D:/software/Timetable_latest_three/Timetable_source_code/src/main/ritualHtml.ts:1182-1197
// 纯 CSS keyframes，初始 paused，进入 viewport 后 data-active="true" 触发
import { useEffect, useRef, useState } from "react";

export default function MoonExitOutro() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio > 0.4) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.4, 1] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section id="outro" aria-label="月升归档收尾">
      <div
        ref={stageRef}
        className="moon-stage"
        data-active={active ? "true" : "false"}
      >
        <span className="sky" aria-hidden />
        <span className="night-overlay" aria-hidden />
        <span className="moon-stars" aria-hidden />
        <span className="moon-glow" aria-hidden />
        <span className="moon" aria-hidden />
        <span className="horizon" aria-hidden />

        <div className="moon-copy">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-75">
            <span style={{ color: "#7FE6FF" }}>[</span> END · 期待合作{" "}
            <span style={{ color: "#7FE6FF" }}>]</span>
          </p>
          <h2
            className="mt-4 font-serif italic leading-tight"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
          >
            期待一次
            <br />
            认真的合作。
          </h2>
          <p className="mt-6 font-mono text-[11px] tracking-[0.28em] uppercase opacity-65">
            CONTACT · 电话 / 微信：15919765137
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:15919765137"
              className="cta"
              style={{
                background: "#fffdf1",
                color: "#16140F",
                boxShadow:
                  "0 0 0 1px #fffdf1, 0 8px 32px -8px rgba(255,253,241,0.5)",
              }}
            >
              <span aria-hidden style={{ color: "#7FE6FF" }}>{"> "}</span>
              打电话
            </a>
            <a
              href="weixin://dl/chat?15919765137"
              className="cta-ghost"
              style={{
                borderColor: "rgba(255,253,241,0.8)",
                color: "#fffdf1",
              }}
            >
              <span aria-hidden style={{ color: "#7FE6FF" }}>{"> "}</span>
              加微信
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
