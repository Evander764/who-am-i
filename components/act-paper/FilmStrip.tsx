"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { frames } from "@/app/_data/renovation";
import { withBasePath } from "@/app/_lib/basePath";

export default function FilmStrip() {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !inView) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (e.deltaY === 0) return;
      e.preventDefault();
      strip.scrollLeft += e.deltaY * 1.4;
    };
    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="renovation"
      className="section-tight bg-paper"
      aria-labelledby="renovation-title"
    >
      <div className="mx-auto w-full max-w-6xl px-2">
        <p className="section-eyebrow">SECTION · 03 · CASE STUDY</p>
        <div className="flex items-end justify-between flex-wrap gap-x-6 gap-y-2">
          <h2 id="renovation-title" className="section-title">
            重装宿舍
          </h2>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
            hands-on · 18 frames · 一卷胶片
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
          从测量到完工，把一间宿舍当成一个小项目。
          下面是按时间顺序的 18 帧，
          {inView
            ? "鼠标滚轮已转为横向。"
            : "滚到这里后，鼠标滚轮会自动横向。"}
        </p>
      </div>

      <div className="relative mt-10">
        <span className="film-hint">SCROLL</span>

        <div ref={stripRef} className="film-strip" tabIndex={0}>
          <div className="film-track">
            {frames.map((f) => (
              <figure key={f.id} className="film-frame">
                <div className="film-image">
                  <Image
                    src={withBasePath(f.src)}
                    alt={`宿舍整改 ${f.step}`}
                    fill
                    sizes="(max-width: 768px) 70vw, 28vw"
                    style={{ objectFit: "cover" }}
                    priority={f.id <= 3}
                  />
                </div>
                <figcaption>
                  <span className="film-step">{f.step}</span>
                  <span className="film-caption">{f.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
