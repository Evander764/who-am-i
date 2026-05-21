"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/app/_lib/basePath";

type Props = {
  src?: string;
};

const STORAGE_KEY = "ambient-on";

export default function AmbientPlayer({ src = "/audio/ambient.mp3" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  // 首次挂载：如果用户上次开过，尝试自动 unmute
  useEffect(() => {
    if (typeof window === "undefined") return;
    const remembered = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (!remembered) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio
      .play()
      .then(() => setEnabled(true))
      .catch(() => {
        // 浏览器拒绝（无 user gesture）→ 维持 muted，等用户点击
        audio.muted = true;
        setEnabled(false);
      });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.muted = true;
      setEnabled(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, "0");
      } catch {
        /* ignore */
      }
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setEnabled(true);
          try {
            window.localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        })
        .catch(() => {
          // 极少数情况下播放被拒
          audio.muted = true;
          setEnabled(false);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={withBasePath(src)}
        autoPlay
        loop
        muted
        preload="auto"
        aria-hidden
      />
      <button
        type="button"
        className="ambient-toggle"
        data-on={enabled ? "true" : "false"}
        onClick={toggle}
        aria-label={enabled ? "关闭背景音乐" : "开启背景音乐"}
        aria-pressed={enabled}
        style={{
          color: enabled ? "#D6A957" : "rgba(255,250,230,0.7)",
          borderColor: enabled ? "#D6A957" : "rgba(255,250,230,0.3)",
        }}
      >
        <span className="pulse" aria-hidden />
        <span className="ambient-toggle-text">{enabled ? "♪ SOUND ON" : "♪ SOUND OFF"}</span>
        <span className="ambient-toggle-icon" aria-hidden>♪</span>
      </button>
    </>
  );
}
