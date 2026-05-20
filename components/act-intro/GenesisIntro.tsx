"use client";

import { useEffect, useRef } from "react";

// §00 创世纪开场
// 黑底 + 升起恒星 + 闪光 + 1 颗彗星 + 少量粒子上升
type Props = {
  durationMs?: number;
  onComplete?: () => void;
};

export default function GenesisIntro({ durationMs = 8400, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onComplete?.();
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = window.setTimeout(finish, 1600);
      return () => window.clearTimeout(t);
    }

    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    const bgCanvas = document.createElement("canvas");
    const bgCtx = bgCanvas.getContext("2d");
    if (!bgCtx) return;

    function fit() {
      if (!c || !ctx || !bgCtx) return;
      W = window.innerWidth;
      H = window.innerHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      c.style.width = W + "px";
      c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCanvas.width = W * dpr;
      bgCanvas.height = H * dpr;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderBgStars();
    }

    const TOTAL = durationMs;
    const STAR_RISE_START = 800;
    const STAR_RISE_END = 2600;
    const STAR_HOLD_END = 3100;
    const FLASH_BUILD_END = 3320;
    const FLASH_RECEDE_END = 4500;
    const STAR_TARGET_X = 0.75;
    const STAR_TARGET_Y = 0.25;
    const STAR_START_X = 1.15;
    const STAR_START_Y = 1.1;

    const stars: { x: number; y: number; size: number; base: number }[] = [];
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.35 + Math.random() * 1.4,
        base: 0.25 + Math.random() * 0.5,
      });
    }

    function renderBgStars() {
      if (!bgCtx) return;
      bgCtx.clearRect(0, 0, W, H);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        bgCtx.fillStyle = "rgba(255,250,235," + s.base + ")";
        bgCtx.beginPath();
        bgCtx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2);
        bgCtx.fill();
      }
    }

    const comets = [
      { delay: 5500, x0: -0.08, y0: 0.66, x1: 1.08, y1: 0.32, life: 1600, size: 2.0 },
    ];
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      life: number; born: number; size: number; warm: number;
    };
    const particles: Particle[] = [];
    const MAX_PARTICLES = 40;
    const start = performance.now();
    let last = start;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t: number) => t * t;

    function drawBackgroundStars(t: number) {
      if (!ctx) return;
      const fadein = Math.min(1, t / 2200);
      const boost = t > FLASH_BUILD_END ? 1 + Math.min(1, (t - FLASH_BUILD_END) / 2400) * 0.55 : 1;
      const breath = 1 + 0.04 * Math.sin(t * 0.0009);
      ctx.save();
      ctx.globalAlpha = fadein * boost * breath;
      ctx.drawImage(bgCanvas, 0, 0, W, H);
      ctx.restore();
    }

    function drawSunStar(x: number, y: number, size: number, brightness: number, spike: number) {
      if (!ctx) return;
      const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 10);
      halo.addColorStop(0, "rgba(255,255,255," + Math.min(1, brightness * 0.9) + ")");
      halo.addColorStop(0.1, "rgba(255,250,225," + Math.min(1, brightness * 0.7) + ")");
      halo.addColorStop(0.3, "rgba(255,200,140," + Math.min(1, brightness * 0.32) + ")");
      halo.addColorStop(0.6, "rgba(255,140,70," + Math.min(1, brightness * 0.12) + ")");
      halo.addColorStop(1, "rgba(255,80,30,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(x - size * 10, y - size * 10, size * 20, size * 20);
      const core = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8);
      core.addColorStop(0, "rgba(255,255,255," + Math.min(1, brightness) + ")");
      core.addColorStop(0.5, "rgba(255,250,235," + Math.min(1, brightness * 0.85) + ")");
      core.addColorStop(1, "rgba(255,200,140,0)");
      ctx.fillStyle = core;
      ctx.fillRect(x - size * 1.8, y - size * 1.8, size * 3.6, size * 3.6);
      if (spike > 0.3) {
        ctx.save();
        ctx.translate(x, y);
        const sp = size * 18 * Math.min(2, spike);
        const sa = Math.min(1, spike) * 0.6;
        const grad = ctx.createLinearGradient(-sp, 0, sp, 0);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.42, "rgba(255,248,220," + sa * 0.5 + ")");
        grad.addColorStop(0.5, "rgba(255,255,255," + sa + ")");
        grad.addColorStop(0.58, "rgba(255,248,220," + sa * 0.5 + ")");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(-sp, -1.5, sp * 2, 3);
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = grad;
        ctx.fillRect(-sp, -1.5, sp * 2, 3);
        ctx.rotate(-Math.PI / 4);
        const sa2 = sa * 0.5;
        const grad2 = ctx.createLinearGradient(-sp * 0.6, 0, sp * 0.6, 0);
        grad2.addColorStop(0, "rgba(255,255,255,0)");
        grad2.addColorStop(0.5, "rgba(255,250,220," + sa2 + ")");
        grad2.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad2;
        ctx.fillRect(-sp * 0.6, -1, sp * 1.2, 2);
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = grad2;
        ctx.fillRect(-sp * 0.6, -1, sp * 1.2, 2);
        ctx.restore();
      }
    }

    function drawRisingTrail(x: number, y: number, progress: number) {
      if (!ctx) return;
      const dx = STAR_TARGET_X - STAR_START_X;
      const dy = STAR_TARGET_Y - STAR_START_Y;
      const len = Math.sqrt(dx * dx * W * W + dy * dy * H * H);
      const ux = (dx * W) / len;
      const uy = (dy * H) / len;
      const trailLen = 90;
      const tx = x - ux * trailLen;
      const ty = y - uy * trailLen;
      const grad = ctx.createLinearGradient(tx, ty, x, y);
      grad.addColorStop(0, "rgba(255,250,220,0)");
      grad.addColorStop(0.6, "rgba(255,240,200," + 0.22 * progress + ")");
      grad.addColorStop(1, "rgba(255,255,255," + 0.55 * progress + ")");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    function drawRisingStar(t: number) {
      if (t < STAR_RISE_START) return;
      let x: number, y: number, size: number, brightness: number, spike = 0;
      if (t < STAR_RISE_END) {
        const p = easeOut((t - STAR_RISE_START) / (STAR_RISE_END - STAR_RISE_START));
        x = STAR_START_X + (STAR_TARGET_X - STAR_START_X) * p;
        y = STAR_START_Y + (STAR_TARGET_Y - STAR_START_Y) * p;
        size = 2 + p * 3.5;
        brightness = 0.35 + p * 0.45;
        spike = brightness * 0.3;
        drawRisingTrail(x * W, y * H, p);
      } else if (t < STAR_HOLD_END) {
        x = STAR_TARGET_X; y = STAR_TARGET_Y;
        const hold = (t - STAR_RISE_END) / (STAR_HOLD_END - STAR_RISE_END);
        const pulse = Math.sin(hold * Math.PI * 3) * 0.1;
        size = 5.5 + pulse;
        brightness = 0.8 + pulse * 0.1;
        spike = brightness * 0.4;
      } else if (t < FLASH_BUILD_END) {
        x = STAR_TARGET_X; y = STAR_TARGET_Y;
        const fp = easeIn((t - STAR_HOLD_END) / (FLASH_BUILD_END - STAR_HOLD_END));
        size = 5.5 + fp * 45;
        brightness = 0.8 + fp * 3.2;
        spike = brightness * 1.5;
      } else if (t < FLASH_RECEDE_END) {
        x = STAR_TARGET_X; y = STAR_TARGET_Y;
        const fr = (t - FLASH_BUILD_END) / (FLASH_RECEDE_END - FLASH_BUILD_END);
        size = 50 - easeOut(fr) * 32;
        brightness = 4 - easeOut(fr) * 2.2;
        spike = brightness * 1.2;
      } else {
        x = STAR_TARGET_X; y = STAR_TARGET_Y;
        const pulse2 = Math.sin(t * 0.0012) * 0.8 + 1;
        size = 18 + pulse2;
        brightness = 1.8;
        spike = 2;
      }
      drawSunStar(x * W, y * H, size, brightness, spike);
    }

    function drawFlash(t: number) {
      if (!ctx) return;
      if (t < STAR_HOLD_END || t > FLASH_RECEDE_END + 500) return;
      const fx = STAR_TARGET_X * W, fy = STAR_TARGET_Y * H;
      let a;
      if (t < FLASH_BUILD_END) {
        a = easeIn((t - STAR_HOLD_END) / (FLASH_BUILD_END - STAR_HOLD_END));
      } else {
        a = 1 - easeOut((t - FLASH_BUILD_END) / (FLASH_RECEDE_END + 500 - FLASH_BUILD_END));
      }
      a = Math.max(0, Math.min(1, a));
      ctx.fillStyle = "rgba(255,250,230," + a * 0.7 + ")";
      ctx.fillRect(0, 0, W, H);
      const burst = ctx.createRadialGradient(fx, fy, 0, fx, fy, Math.max(W, H) * 1.2);
      burst.addColorStop(0, "rgba(255,255,255," + a + ")");
      burst.addColorStop(0.08, "rgba(255,250,220," + a * 0.95 + ")");
      burst.addColorStop(0.25, "rgba(255,200,130," + a * 0.55 + ")");
      burst.addColorStop(0.55, "rgba(255,130,60," + a * 0.22 + ")");
      burst.addColorStop(1, "rgba(255,80,30,0)");
      ctx.fillStyle = burst;
      ctx.fillRect(0, 0, W, H);
    }

    function drawShockwaves(t: number) {
      if (!ctx) return;
      if (t < FLASH_BUILD_END) return;
      const fx = STAR_TARGET_X * W, fy = STAR_TARGET_Y * H;
      const maxR = Math.max(W, H);
      for (let k = 0; k < 3; k++) {
        const sStart = FLASH_BUILD_END + k * 420;
        if (t < sStart) continue;
        const age = t - sStart;
        const dur = 2800;
        if (age > dur) continue;
        const p = age / dur;
        const r = easeOut(p) * maxR;
        const a = (1 - p) * (1 - p) * 0.55;
        ctx.strokeStyle = "rgba(255,235,180," + a + ")";
        ctx.lineWidth = 2 + (1 - p) * 4;
        ctx.beginPath();
        ctx.arc(fx, fy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawComets(t: number) {
      if (!ctx) return;
      for (let i = 0; i < comets.length; i++) {
        const co = comets[i];
        if (t < co.delay) continue;
        const age = t - co.delay;
        if (age > co.life + 200) continue;
        const prog = Math.min(1, age / co.life);
        const x = (co.x0 + (co.x1 - co.x0) * prog) * W;
        const y = (co.y0 + (co.y1 - co.y0) * prog) * H;
        const dx = (co.x1 - co.x0) * W, dy = (co.y1 - co.y0) * H;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len, uy = dy / len;
        let a;
        if (prog < 0.15) a = prog / 0.15;
        else if (prog < 0.85) a = 1;
        else a = (1 - prog) / 0.15;
        a = Math.max(0, Math.min(1, a)) * 0.92;
        const tailLen = 110;
        const tx = x - ux * tailLen, ty = y - uy * tailLen;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, "rgba(255,240,200,0)");
        grad.addColorStop(0.55, "rgba(255,235,180," + a * 0.4 + ")");
        grad.addColorStop(1, "rgba(255,255,255," + a + ")");
        ctx.strokeStyle = grad;
        ctx.lineCap = "round";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        const hg = ctx.createRadialGradient(x, y, 0, x, y, co.size * 5);
        hg.addColorStop(0, "rgba(255,255,255," + a + ")");
        hg.addColorStop(0.25, "rgba(255,245,210," + a * 0.7 + ")");
        hg.addColorStop(0.55, "rgba(255,200,140," + a * 0.3 + ")");
        hg.addColorStop(1, "rgba(255,150,80,0)");
        ctx.fillStyle = hg;
        ctx.fillRect(x - co.size * 5, y - co.size * 5, co.size * 10, co.size * 10);
      }
    }

    function drawParticles(t: number, dt: number) {
      if (!ctx) return;
      if (t > FLASH_BUILD_END && t < TOTAL - 800 && particles.length < MAX_PARTICLES) {
        const rate = t < FLASH_RECEDE_END + 1500 ? 0.8 : 0.3;
        const exp = rate * (dt / 16.67);
        let n = Math.floor(exp) + (Math.random() < exp - Math.floor(exp) ? 1 : 0);
        n = Math.min(n, MAX_PARTICLES - particles.length);
        for (let i = 0; i < n; i++) {
          particles.push({
            x: Math.random() * W,
            y: H + 8 + Math.random() * 20,
            vx: (Math.random() - 0.5) * 0.01,
            vy: -(0.0125 + Math.random() * 0.025),
            life: 3500 + Math.random() * 4000,
            born: performance.now(),
            size: 0.4 + Math.random() * 1.4,
            warm: 0.65 + Math.random() * 0.35,
          });
        }
      }
      for (let j = particles.length - 1; j >= 0; j--) {
        const p = particles[j];
        const age = performance.now() - p.born;
        if (age > p.life || p.y < -10) {
          particles.splice(j, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const pr = age / p.life;
        let pa = pr < 0.15 ? pr / 0.15 : (1 - pr) / 0.85;
        pa = Math.max(0, Math.min(1, pa)) * 0.65;
        const gC = Math.round(180 + p.warm * 60);
        const bC = Math.round(110 + p.warm * 70);
        ctx.fillStyle = "rgba(255," + gC + "," + bC + "," + pa + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now: number) {
      if (!ctx || completedRef.current) return;
      const t = now - start;
      const dt = Math.min(33, now - last);
      last = now;
      ctx.clearRect(0, 0, W, H);
      drawBackgroundStars(t);
      drawShockwaves(t);
      drawComets(t);
      drawParticles(t, dt);
      drawRisingStar(t);
      drawFlash(t);
      if (t < TOTAL) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        finish();
      }
    }

    fit();
    window.addEventListener("resize", fit);
    rafRef.current = requestAnimationFrame(frame);

    const safetyTimer = window.setTimeout(finish, TOTAL + 500);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", fit);
      window.clearTimeout(safetyTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <section className="cosmos-stage genesis-stage" aria-label="开场动画">
      <span className="deep-space" aria-hidden />
      <span className="nebula-glow" aria-hidden />
      <canvas ref={canvasRef} className="genesis-canvas" aria-hidden />
      <span className="atmos-veil" aria-hidden />
      <span className="vignette" aria-hidden />
      <span className="grain" aria-hidden />

      <div className="cosmos-title">
        <h1>Who am I · 马新淳</h1>
        <p className="sub">[ BOOT · 自我介绍 · 寻求合作 · 2026 ]</p>
      </div>

      <p className="cosmos-hint">scroll ↓ or wait</p>
      <button
        type="button"
        className="cosmos-skip"
        onClick={() => finish()}
        aria-label="跳过开场动画"
      >
        skip →
      </button>
    </section>
  );
}
