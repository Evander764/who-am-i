import Image from "next/image";
import { withBasePath } from "@/app/_lib/basePath";
import type { Work } from "@/app/_data/works";
import GalleryRotator from "@/components/work/GalleryRotator";
import HudTilt from "@/components/work/HudTilt";
import CodeSnippet from "@/components/work/CodeSnippet";

type Props = {
  work: Work;
  reverse?: boolean;
};

export default function WorkRow({ work, reverse = false }: Props) {
  const hasMainMedia =
    (work.gallery && work.gallery.length > 0) || Boolean(work.image);

  const innerMedia =
    work.gallery && work.gallery.length > 0 ? (
      <GalleryRotator images={work.gallery} />
    ) : work.image ? (
      <div className="media-frame">
        <Image
          src={withBasePath(work.image)}
          alt={`${work.title} 预览图`}
          width={1280}
          height={800}
          className="object-cover"
        />
      </div>
    ) : work.codeSnippet ? (
      <CodeSnippet
        variant="media"
        caption={work.codeSnippet.caption}
        lang={work.codeSnippet.lang}
        code={work.codeSnippet.code}
      />
    ) : work.motif ? (
      <div className="media-frame">
        <div className="work-motif">
          <div>
            <p className="motif-big">{work.motif.big}</p>
            <p className="motif-sub">{work.motif.sub}</p>
          </div>
        </div>
      </div>
    ) : null;

  const mediaCol = <HudTilt>{innerMedia}</HudTilt>;
  const showInlineCode = hasMainMedia && work.codeSnippet;

  const textCol = (
    <div>
      <h3
        className="font-mono"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          letterSpacing: "0.02em",
          color: "var(--ink)",
          textShadow: "0 0 16px rgba(214,169,87,0.2)",
        }}
      >
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

      {work.features && work.features.length > 0 ? (
        <p className="feature-line">{work.features.join(" · ")}</p>
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

      {showInlineCode && work.codeSnippet ? (
        <div className="mt-9">
          <CodeSnippet
            variant="inline"
            caption={work.codeSnippet.caption}
            lang={work.codeSnippet.lang}
            code={work.codeSnippet.code}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16 gap-y-6 sm:gap-y-10"
      aria-labelledby={`work-${work.id}`}
    >
      <div className={reverse ? "lg:order-2" : "lg:order-1"}>{mediaCol}</div>
      <div className={reverse ? "lg:order-1" : "lg:order-2"} id={`work-${work.id}`}>
        {textCol}
      </div>
    </article>
  );
}
