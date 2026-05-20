"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  maxDeg?: number;
  perspective?: number;
};

export function useTilt<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { maxDeg = 6, perspective = 1100 }: Options = {},
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    let raf: number | null = null;
    let targetRX = 0;
    let targetRY = 0;

    const apply = () => {
      raf = null;
      if (!node) return;
      node.style.transform = `perspective(${perspective}px) rotateX(${targetRX.toFixed(2)}deg) rotateY(${targetRY.toFixed(2)}deg)`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;
      // rotateY 跟随 x（左右），rotateX 反向跟随 y（上下倒过来更像"卡片"）
      targetRY = (px - 0.5) * 2 * maxDeg;
      targetRX = -(py - 0.5) * 2 * maxDeg;
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
      if (node) node.style.transform = "";
    };
  }, [ref, maxDeg, perspective]);
}
