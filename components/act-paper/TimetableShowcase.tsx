// §05 作品 02 · Timetable
// 左：应用 UI 概念展示画廊
// 右：日出破晓 CSS 动画作为产品 demo 预览 (循环播放)
//    动画样式定义在 globals.css，移植自 ritualHtml.ts:1026-1046
import Image from "next/image";
import { withBasePath } from "@/app/_lib/basePath";

const SHOTS = [
  { src: "/images/timetable-ui/home.svg",     label: "HOME · 主页"    },
  { src: "/images/timetable-ui/schedule.svg", label: "SCHEDULE · 课表" },
  { src: "/images/timetable-ui/ritual.svg",   label: "RITUAL · 仪式"   },
  { src: "/images/timetable-ui/settings.svg", label: "SETTINGS · 设置" },
  { src: "/images/timetable-ui/stats.svg",    label: "STATS · 统计"    },
];

export default function TimetableShowcase() {
  return (
    <section
      id="work-timetable"
      className="section"
      aria-labelledby="timetable-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="section-eyebrow">SECTION · 05 · WORK 02</p>
        <div className="flex items-end justify-between flex-wrap gap-x-6 gap-y-2">
          <h2 id="timetable-title" className="section-title">
            Timetable
          </h2>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
            Electron · React · Canvas · 仪式感桌面应用
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
          一个会做仪式感的桌面课表 / 仪式空间。
          每天打开它的时候，先看一段动画——日出 / 创世纪 / 月升，
          再进入今天的安排。这里保留的是展示用概念预览，不当作真实截图。
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* 左：5 张 UI 概念展示图 */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SHOTS.map((s, i) => (
              <figure
                key={s.src}
                className={`tt-screenshot ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <Image
                  src={withBasePath(s.src)}
                  alt={s.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="tt-label">{s.label}</span>
              </figure>
            ))}
          </div>

          {/* 右：日出破晓 CSS 动画 */}
          <div className="lg:col-span-5">
            <div className="paper-card overflow-hidden p-0">
              <div className="sunrise-stage" aria-label="日出破晓动画预览">
                <span className="sky" aria-hidden />
                <span className="sun" aria-hidden />
                <span className="mountains" aria-hidden />
              </div>
              <figcaption className="p-4 border-t border-rule-soft">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
                  RITUAL · SUNRISE_LEDGER · loop preview
                </p>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  日出破晓——10.6 秒 CSS 关键帧，
                  从靛蓝夜空升到金色 sunrise，
                  山的剪影 + 体积感雾。用于展示动效方向，不代表最终界面截图。
                </p>
              </figcaption>
            </div>

            <div className="mt-5 paper-card p-5">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint">
                ABOUT · TIMETABLE
              </p>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                还有创世纪和月升——
                创世纪你已经在开场看过了，月升则会在这一页的最后出现。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
