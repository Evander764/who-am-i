"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delayMs?: number;
  as?: ElementType;
  className?: string;
};

export default function Reveal({
  children,
  delayMs = 0,
  as: Tag = "div",
  className = "",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = window.setTimeout(() => setVisible(true), delayMs);
            io.disconnect();
            return () => window.clearTimeout(t);
          }
        }
      },
      { threshold: 0.18 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delayMs]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
