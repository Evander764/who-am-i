import { traits } from "@/app/_data/traits";
import PaperCard from "./PaperCard";

export default function TraitsGrid() {
  return (
    <section id="traits" className="section bg-paper" aria-labelledby="traits-title">
      <div className="mx-auto w-full max-w-6xl">
        <p className="section-eyebrow">SECTION · 02 · TRAITS</p>
        <div className="flex items-end justify-between flex-wrap gap-x-6 gap-y-2">
          <h2 id="traits-title" className="section-title">
            别人怎么看我
          </h2>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
            via GPT · 2026.05
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
          下面六条来自一次与 GPT 的长对话，被原样保留。
          每条下面补一行自己的脚注，像给这份档案按下手印。
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {traits.map((t) => (
            <PaperCard key={t.id}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.24em] text-ink-faint">
                  {t.id}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                  trait
                </span>
              </div>
              <h3 className="mt-3 font-serif text-[2rem] tracking-[-0.015em] leading-[1.05] text-ink">
                {t.title}
              </h3>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                {t.gpt}
              </p>
              {t.note ? (
                <p className="mt-5 pt-4 border-t border-rule-soft font-mono text-[11px] text-ink-faint leading-relaxed">
                  {t.note}
                </p>
              ) : null}
            </PaperCard>
          ))}
        </div>
      </div>
    </section>
  );
}
