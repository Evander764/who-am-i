import Image from "next/image";
import PaperCard from "./PaperCard";
import { withBasePath } from "@/app/_lib/basePath";

export default function BadmintonCard() {
  return (
    <section
      id="court"
      className="section-tight bg-paper"
      aria-labelledby="court-title"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="section-eyebrow">SECTION · 05 · COURT</p>
        <h2 id="court-title" className="section-title">
          球场身份
        </h2>

        <PaperCard className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          <div className="shrink-0 grid place-items-center w-24 h-24 rounded-full bg-paper border border-rule">
            <Image
              src={withBasePath("/icons/badminton.svg")}
              alt="羽毛球图标"
              width={72}
              height={72}
            />
          </div>
          <div className="flex-1">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint">
              ROLE · BADMINTON
            </p>
            <h3 className="mt-2 font-serif italic text-2xl text-ink leading-tight">
              高中羽毛球校队 / 大学羽毛球院队
            </h3>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-prose">
              一直在打。和折腾东西一样，
              是一件不需要理由也会接着做下去的事。
            </p>
          </div>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint self-start sm:self-end">
            2022 — 至今
          </span>
        </PaperCard>
      </div>
    </section>
  );
}
