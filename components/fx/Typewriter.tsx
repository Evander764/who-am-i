"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  lines: string[];
  speedMs?: number;
  startDelayMs?: number;
  caret?: boolean;
  className?: string;
  onDone?: () => void;
};

export default function Typewriter({
  lines,
  speedMs = 55,
  startDelayMs = 400,
  caret = true,
  className = "",
  onDone,
}: Props) {
  const total = lines.reduce((s, l) => s + l.length, 0);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) {
      setShown(total);
      setDone(true);
      onDone?.();
      return;
    }
    let itv: number | null = null;
    const start = window.setTimeout(() => {
      itv = window.setInterval(() => {
        setShown((p) => {
          if (p >= total) {
            if (itv !== null) window.clearInterval(itv);
            itv = null;
            setDone(true);
            onDone?.();
            return p;
          }
          return p + 1;
        });
      }, speedMs);
    }, startDelayMs);
    return () => {
      window.clearTimeout(start);
      if (itv !== null) window.clearInterval(itv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, speedMs, startDelayMs]);

  // 把 shown 个字符分摊到各行
  let remaining = shown;
  const rendered: string[] = [];
  for (const l of lines) {
    if (remaining <= 0) {
      rendered.push("");
      continue;
    }
    if (remaining >= l.length) {
      rendered.push(l);
      remaining -= l.length;
    } else {
      rendered.push(l.slice(0, remaining));
      remaining = 0;
    }
  }

  return (
    <span className={className} aria-label={lines.join(" ")}>
      {rendered.map((seg, idx) => (
        <span key={idx}>
          {seg}
          {idx < rendered.length - 1 ? <br /> : null}
        </span>
      ))}
      {caret ? <span className={`tw-caret${done ? " is-done" : ""}`} aria-hidden>▋</span> : null}
    </span>
  );
}
