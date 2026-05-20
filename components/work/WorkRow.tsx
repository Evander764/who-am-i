import Image from "next/image";
import { withBasePath } from "@/app/_lib/basePath";
import type { Work } from "@/app/_data/works";

type Props = {
  work: Work;
  reverse?: boolean;
};

export default function WorkRow({ work, reverse = false }: Props) {
  const mediaCol = (
    <div className="media-frame">
      {work.image ? (
        <Image
          src={withBasePath(work.image)}
          alt={`${work.title} 预览图`}
          width={1280}
          height={800}
          className="object-cover"
        />
      ) : work.motif ? (
        <div className="work-motif">
          <div>
            <p className="motif-big">{work.motif.big}</p>
            <p className="motif-sub">{work.motif.sub}</p>
          </div>
        </div>
      ) : null}
    </div>
  );

  const textCol = (
    <div>
      <h3 className="headline" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
        {work.title}
      </h3>
      <p className="lede mt-4">{work.tagline}</p>

      {work.outcome ? <p className="body-lg mt-5">{work.outcome}</p> : null}

      {work.tech && work.tech.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {work.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {(work.liveUrl || work.repoUrl) ? (
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
          {work.liveUrl ? (
            <a
              className="link-gold"
              href={work.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              查看线上 <span aria-hidden>→</span>
            </a>
          ) : null}
          {work.repoUrl ? (
            <a
              className="link-gold"
              href={work.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              查看源码 <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16 gap-y-10"
      aria-labelledby={`work-${work.id}`}
    >
      <div className={reverse ? "lg:order-2" : "lg:order-1"}>{mediaCol}</div>
      <div className={reverse ? "lg:order-1" : "lg:order-2"} id={`work-${work.id}`}>
        {textCol}
      </div>
    </article>
  );
}
