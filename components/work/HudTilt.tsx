"use client";

import { useRef, type ReactNode } from "react";
import { useTilt } from "@/components/fx/useTilt";

type Props = { children: ReactNode };

export default function HudTilt({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useTilt(ref, { maxDeg: 5, perspective: 1200 });

  return (
    <div ref={ref} className="tilt hud-frame">
      <span className="hud-corner-tr" aria-hidden />
      <span className="hud-corner-bl" aria-hidden />
      {children}
    </div>
  );
}
