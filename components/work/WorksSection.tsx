import { WORKS } from "@/app/_data/works";
import Reveal from "@/components/ui/Reveal";
import WorkRow from "@/components/work/WorkRow";

export default function WorksSection() {
  return (
    <section id="works" className="stage" aria-labelledby="works-heading">
      <div className="wrap-wide">
        <Reveal>
          <p className="kicker">SECTION 02 / WORKS</p>
        </Reveal>
        <Reveal delayMs={120}>
          <h2
            id="works-heading"
            className="mt-8 font-mono"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              textShadow: "0 0 22px rgba(214,169,87,0.22)",
              lineHeight: 1.1,
            }}
          >
            最近在做、
            <br className="sm:hidden" />
            已经做出来的。
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-16 space-y-12 sm:space-y-20 lg:space-y-28">
          {WORKS.map((work, i) => (
            <div key={work.id}>
              <Reveal>
                <WorkRow work={work} reverse={i % 2 === 1} />
              </Reveal>
              {i < WORKS.length - 1 ? <hr className="hair-line mt-12 sm:mt-20 lg:mt-28" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
