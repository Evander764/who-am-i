"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      raf = null;
      const node = ref.current;
      if (node) node.style.transform = `translate3d(${tx - 240}px, ${ty - 240}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shownRef.current) {
        shownRef.current = true;
        setShow(true);
      }
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`cursor-glow${show ? " is-on" : ""}`}
      aria-hidden
    />
  );
}
