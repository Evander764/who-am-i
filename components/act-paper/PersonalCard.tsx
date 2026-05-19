import Image from "next/image";
import PaperBanner from "./PaperBanner";
import PaperCard from "./PaperCard";

export default function PersonalCard() {
  return (
    <section id="personal" className="section" aria-labelledby="personal-name">
      <PaperBanner
        left="MA XIN-CHUN · 马 新 淳 · 19"
        center="SELF-INTRO · v0.1 · 2026.05"
        right="HANDS-ON · BUILD · SHIP"
      />

      <div className="mx-auto mt-14 lg:mt-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-20 gap-y-12 items-center">
        <div className="lg:col-span-7">
          <p className="section-eyebrow">SECTION · 01 · 个人名片</p>
          <h1
            id="personal-name"
            className="mt-4 font-serif italic text-ink leading-[0.95]"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 7rem)" }}
          >
            马新淳
            <br />
            <span className="text-ink-soft">19</span>
            <span className="text-ink-faint">.折腾中</span>
          </h1>
          <p
            className="mt-6 max-w-md text-ink-soft leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)" }}
          >
            这是一份会被反复改写的自我介绍。
            <br />
            把脑子里的事变成可看见的东西——
            <br />
            网站 / 应用 / 一间住得下的宿舍。
          </p>
          <p className="mt-10 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint">
            STATUS · IN PROGRESS
          </p>
        </div>

        <div className="lg:col-span-5">
          <PaperCard className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              01 · NAMECARD
            </p>
            <div className="mt-5 flex gap-5 items-start">
              <div className="shrink-0 rounded-full overflow-hidden border border-rule"
                   style={{ width: 112, height: 112 }}>
                <Image
                  src="/images/portrait/main.jpg"
                  alt="马新淳人像"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <dl className="text-sm leading-relaxed text-ink-soft">
                <div className="flex gap-2">
                  <dt className="text-ink-faint font-mono text-[10px] tracking-[0.18em] uppercase pt-1 w-12 shrink-0">name</dt>
                  <dd className="font-serif italic text-lg text-ink">马新淳 · Ma Xin-chun</dd>
                </div>
                <div className="flex gap-2 mt-3">
                  <dt className="text-ink-faint font-mono text-[10px] tracking-[0.18em] uppercase pt-1 w-12 shrink-0">age</dt>
                  <dd>19 岁 · 2026 · 折腾中</dd>
                </div>
                <div className="flex gap-2 mt-3">
                  <dt className="text-ink-faint font-mono text-[10px] tracking-[0.18em] uppercase pt-1 w-12 shrink-0">court</dt>
                  <dd>高中羽毛球校队 / 大学羽毛球院队</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-4 border-t border-rule-soft">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-faint">
                现在做的事
              </p>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                AI 工具 · 软件开发 · 图像生成 · 审美 · 学习方法 · 职业方向——
                先试，再问，再拆。
              </p>
            </div>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}
