"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/app/_lib/basePath";

type Img = { src: string; alt: string };
type Props = {
  images: Img[];
  intervalMs?: number;
};

export default function GalleryRotator({ images, intervalMs = 4500 }: Props) {
  const [i, setI] = useState(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const n = images.length;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (reducedRef.current || pausedRef.current || n <= 1) return;
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setI((p) => (p + 1) % n);
    }, intervalMs);
  }, [clearTimer, intervalMs, n]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const onEnter = () => {
    pausedRef.current = true;
    clearTimer();
  };
  const onLeave = () => {
    pausedRef.current = false;
    startTimer();
  };
  const jump = (target: number) => {
    setI(target);
    // 重置 timer，避免「刚点完就跳走」
    startTimer();
  };

  if (n === 0) return null;

  return (
    <div>
      <div
        className="media-frame"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        role="group"
        aria-roledescription="幻灯片"
        aria-label={`${n} 张作品截图，自动轮播`}
      >
        {images.map((img, idx) => (
          <Image
            key={img.src}
            src={withBasePath(img.src)}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`gallery-img${idx === i ? " is-active" : ""}`}
            priority={idx === 0}
          />
        ))}
      </div>
      {n > 1 ? (
        <div className="gallery-nav" role="tablist" aria-label="切换截图">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              className="gallery-dot"
              data-active={idx === i ? "true" : "false"}
              aria-label={`第 ${idx + 1} 张：${img.alt}`}
              aria-selected={idx === i}
              role="tab"
              onClick={() => jump(idx)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
