"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { PROFILE } from "@/app/_data/profile";
import {
  CAPABILITY_LINES,
  CATEGORY_LABELS,
  FEATURED_WORKS,
  WORKS,
  type Work,
  type WorkCategory,
} from "@/app/_data/works";
import { withBasePath } from "@/app/_lib/basePath";

type FilterId = "all" | WorkCategory;

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "全部" },
  { id: "desktop-ai", label: CATEGORY_LABELS["desktop-ai"] },
  { id: "content-systems", label: CATEGORY_LABELS["content-systems"] },
  { id: "workflow-infra", label: CATEGORY_LABELS["workflow-infra"] },
  { id: "creative-systems", label: CATEGORY_LABELS["creative-systems"] },
  { id: "product-apps", label: CATEGORY_LABELS["product-apps"] },
];

const SCENES = [
  { id: "hero", label: "开场" },
  { id: "systems", label: "能力线" },
  { id: "featured", label: "主作品" },
  { id: "craft", label: "方法" },
  { id: "archive", label: "项目库" },
  { id: "contact", label: "联系" },
] as const;

const PRINCIPLES = [
  {
    title: "做成入口",
    body: "先把想法推进到一个能打开、能运行、能留下证据的入口。",
  },
  {
    title: "写清边界",
    body: "桌面自动化、内容采集和本地工具，都必须有权限、确认和日志。",
  },
  {
    title: "留出复盘",
    body: "每一次任务都应该知道输入是什么、发生了什么、哪里失败。",
  },
];

const CRAFT_STEPS = [
  {
    title: "看见真实环境",
    body: "屏幕、窗口、账号池、素材库和本地日志都进入产品输入，而不是停在 prompt 里。",
  },
  {
    title: "拆成可控流程",
    body: "把不可逆动作、内容判断、知识产品和权限切换拆开，给每一步留确认和回滚。",
  },
  {
    title: "包装成日常工具",
    body: "最后把能力收进 App、CLI、飞书卡片或本地 API，让它能被反复使用。",
  },
];

function staggerStyle(index: number, stepMs = 90): CSSProperties {
  return { "--delay": `${index * stepMs}ms` } as CSSProperties;
}

function AnimatedText({ text, unit = "char" }: { text: string; unit?: "char" | "word" }) {
  const parts =
    unit === "word"
      ? text.split(" ").map((word, index, words) => (index === words.length - 1 ? word : `${word}\u00a0`))
      : Array.from(text);

  return (
    <span className="type-reveal" aria-label={text}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} aria-hidden="true" style={staggerStyle(index, unit === "word" ? 80 : 28)}>
          {part === " " ? "\u00a0" : part}
        </span>
      ))}
    </span>
  );
}

function useActiveScene() {
  const [activeScene, setActiveScene] = useState<(typeof SCENES)[number]["id"]>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveScene(visible.target.id as (typeof SCENES)[number]["id"]);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.36, 0.52, 0.68],
      },
    );

    SCENES.forEach((scene) => {
      const element = document.getElementById(scene.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return activeScene;
}

function primaryMedia(work: Work) {
  if (work.gallery?.length) return work.gallery[0];
  if (work.image) return { src: work.image, alt: `${work.title} 预览图` };
  return null;
}

function categoryCount(category: WorkCategory) {
  return WORKS.filter((work) => work.category === category).length;
}

function WorkVisual({ work }: { work: Work }) {
  const media = primaryMedia(work);

  if (media) {
    return (
      <div className="cinema-visual" aria-label={`${work.title} 视觉预览`}>
        <Image
          src={withBasePath(media.src)}
          alt={media.alt}
          width={1280}
          height={900}
          className="cinema-visual-image"
          priority={work.featured}
        />
      </div>
    );
  }

  return (
    <div className="evidence-preview" aria-label={`${work.title} 公开能力摘要`}>
      <span>{work.motif?.big ?? work.title.slice(0, 2)}</span>
      <p>{work.motif?.sub ?? CATEGORY_LABELS[work.category]}</p>
      <div>
        {(work.proof ?? work.features ?? []).slice(0, 4).map((item) => (
          <em key={item}>{item}</em>
        ))}
      </div>
    </div>
  );
}

function SceneShell({
  id,
  transition,
  children,
}: {
  id: (typeof SCENES)[number]["id"];
  transition: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="story-scene" data-transition={transition}>
      {children}
    </section>
  );
}

export default function Home() {
  const activeScene = useActiveScene();
  const [activeId, setActiveId] = useState(FEATURED_WORKS[0]?.id ?? "");
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const activeWork =
    FEATURED_WORKS.find((work) => work.id === activeId) ?? FEATURED_WORKS[0];

  const visibleWorks = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return WORKS.filter((work) => {
      const categoryMatch = filter === "all" || work.category === filter;
      if (!categoryMatch) return false;
      if (!normalized) return true;

      const haystack = [
        work.title,
        work.tagline,
        CATEGORY_LABELS[work.category],
        work.status,
        work.privacy,
        ...(work.tech ?? []),
        ...(work.features ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [filter, query]);

  return (
    <main className="apple-studio" data-active-scene={activeScene}>
      <header className="apple-nav" aria-label="站点导航">
        <a className="nav-brand" href="#hero" aria-label="回到首页">
          <span>MXC</span>
          <strong>Product Works</strong>
        </a>
        <nav className="nav-links" aria-label="页面段落">
          {SCENES.slice(1).map((scene) => (
            <a key={scene.id} href={`#${scene.id}`} data-active={activeScene === scene.id}>
              {scene.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="scene-rail" aria-hidden="true">
        {SCENES.map((scene, index) => (
          <a key={scene.id} href={`#${scene.id}`} data-active={activeScene === scene.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </div>

      <SceneShell id="hero" transition="cinematic-fade">
        <div className="hero-cinema">
          <div className="hero-copy">
            <p className="eyebrow">19 岁 · 独立开发者 · 本地 AI 产品</p>
            <h1>
              <AnimatedText text="把 AI 做成真实产品。" />
            </h1>
            <p className="hero-lede">
              桌面代理、内容情报、知识产品、本地工具。每个项目都要有入口、权限、日志和可运行流程。
            </p>
            <div className="hero-actions" aria-label="主要操作">
              <a className="button-dark" href="#featured">
                看主作品
              </a>
              <a className="button-light" href="#archive">
                浏览全部项目
              </a>
            </div>
          </div>

          <aside className="hero-device" aria-label="人物和作品概览">
            <div className="portrait-stage">
              <Image
                src={withBasePath("/images/portrait/main.jpg")}
                alt={`${PROFILE.name} 人像`}
                width={720}
                height={940}
                className="portrait-image"
                priority
              />
            </div>
            <div className="identity-strip">
              <p>{PROFILE.name}</p>
              <span>{PROFILE.oneLiner}</span>
            </div>
            <dl className="hero-metrics" aria-label="作品集概览">
              <div>
                <dt>{WORKS.length}</dt>
                <dd>自制应用</dd>
              </div>
              <div>
                <dt>{FEATURED_WORKS.length}</dt>
                <dd>主作品</dd>
              </div>
              <div>
                <dt>{CAPABILITY_LINES.length}</dt>
                <dd>能力线</dd>
              </div>
            </dl>
          </aside>
        </div>
      </SceneShell>

      <SceneShell id="systems" transition="soft-lift">
        <div className="scene-heading narrow">
          <p className="eyebrow">System Map</p>
          <h2>三个方向，构成我做产品的底层方法。</h2>
          <p>看起来分散的项目，其实都在回答同一个问题：怎样让 AI、内容和个人工作流变成稳定的生产系统。</p>
        </div>

        <div className="capability-stack">
          {CAPABILITY_LINES.map((line, index) => (
            <article key={line.id} className="capability-card" style={staggerStyle(index)}>
              <div>
                <span>{line.label}</span>
                <strong>{categoryCount(line.id)} 个项目</strong>
              </div>
              <h3>{line.title}</h3>
              <p>{line.thesis}</p>
              <footer>
                {line.examples.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </footer>
            </article>
          ))}
        </div>
      </SceneShell>

      <SceneShell id="featured" transition="side-write">
        <div className="feature-stage">
          <div className="scene-heading">
            <p className="eyebrow">Featured Work</p>
            <h2>{FEATURED_WORKS.length} 个主作品，按产品问题来讲。</h2>
            <p>私有项目只展示能力、结构和结果，不展示本地路径、凭据、内部配置或不可公开细节。</p>
          </div>

          <div className="feature-composer">
            <div className="feature-tabs" role="listbox" aria-label="选择主作品">
              {FEATURED_WORKS.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  role="option"
                  aria-selected={activeWork.id === work.id}
                  data-active={activeWork.id === work.id}
                  style={staggerStyle(index)}
                  onClick={() => setActiveId(work.id)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{work.title}</strong>
                  <small>{CATEGORY_LABELS[work.category]}</small>
                </button>
              ))}
            </div>

            <article key={activeWork.id} className="feature-panel" aria-labelledby={`active-${activeWork.id}`}>
              <div className="feature-text">
                <div className="meta-pills">
                  <span>{CATEGORY_LABELS[activeWork.category]}</span>
                  <span>{activeWork.status}</span>
                  <span>{activeWork.privacy}</span>
                </div>
                <h3 id={`active-${activeWork.id}`}>
                  <AnimatedText text={activeWork.title} unit="word" />
                </h3>
                <p className="feature-tagline">{activeWork.tagline}</p>
                {activeWork.outcome ? <p className="feature-outcome">{activeWork.outcome}</p> : null}

                {activeWork.summary?.length ? (
                  <ul className="feature-points">
                    {activeWork.summary.map((item, index) => (
                      <li key={item} style={staggerStyle(index)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="proof-row">
                  {(activeWork.proof ?? []).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="tech-row">
                  {(activeWork.tech ?? []).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <WorkVisual work={activeWork} />
            </article>
          </div>
        </div>
      </SceneShell>

      <SceneShell id="craft" transition="cascade-drop">
        <div className="craft-layout">
          <div className="scene-heading">
            <p className="eyebrow">Builder Profile</p>
            <h2>高级感不是装饰，是把复杂事情做得安静。</h2>
          </div>
          <div className="craft-grid">
            {CRAFT_STEPS.map((step, index) => (
              <article key={step.title} className="craft-card" style={staggerStyle(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="principle-strip">
            {PRINCIPLES.map((item, index) => (
              <div key={item.title} style={staggerStyle(index + 3)}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </SceneShell>

      <SceneShell id="archive" transition="gallery-rise">
        <div className="archive-head">
          <div className="scene-heading">
            <p className="eyebrow">Project Archive</p>
            <h2>完整项目库。</h2>
            <p>主作品负责讲深度，项目库负责不遗漏。可以按能力线筛选，也可以直接搜索技术、状态或项目名。</p>
          </div>

          <div className="archive-controls">
            <label className="search-box">
              <span>搜索项目</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例如：Swift、飞书、OCR、内容"
                type="search"
              />
            </label>
            <div className="filter-row" aria-label="筛选项目类型">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-active={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="archive-count" aria-live="polite">
          当前显示 {visibleWorks.length} / {WORKS.length} 个项目
        </div>

        <div className="archive-grid">
          {visibleWorks.map((work, index) => (
            <article key={work.id} className="archive-card" style={staggerStyle(index % 14)}>
              <div className="archive-card-top">
                <span>{CATEGORY_LABELS[work.category]}</span>
                <strong>{work.status}</strong>
              </div>
              <h3>{work.title}</h3>
              <p>{work.tagline}</p>
              <footer>
                <span>{work.privacy}</span>
                {work.featured ? <span>主作品</span> : null}
              </footer>
              {work.tech?.length ? (
                <div className="archive-tech">
                  {work.tech.slice(0, 4).map((tech) => (
                    <em key={tech}>{tech}</em>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </SceneShell>

      <SceneShell id="contact" transition="curtain-close">
        <div className="contact-card">
          <p className="eyebrow">Public Contact</p>
          <h2>下一个项目，继续做出来。</h2>
          <p>公开联系方式只保留 GitHub。这里展示的是能公开讲清楚的产品能力，不包含私密配置、凭据或个人联系方式。</p>
          <a className="button-dark" href={PROFILE.contacts.githubUrl} target="_blank" rel="noreferrer noopener">
            GitHub · {PROFILE.contacts.github}
          </a>
        </div>
      </SceneShell>
    </main>
  );
}
