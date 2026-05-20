export type Work = {
  id: string;
  title: string;
  tagline: string;
  role?: string;
  tech?: string[];
  outcome?: string;
  features?: string[];
  image?: string;
  gallery?: { src: string; alt: string }[];
  motif?: { big: string; sub: string };
  codeSnippet?: { caption?: string; lang?: string; code: string };
  liveUrl?: string;
  repoUrl?: string;
};

export const WORKS: Work[] = [
  {
    id: "beauty-gallery",
    title: "Beauty · 暗夜画廊",
    tagline:
      "为「双阶段审美坐标系生图法」做的纯静态图集。Three.js portal 着色器、速度感失真、横向滚动 brutalist 卡片。",
    role: "独立设计 + 开发",
    tech: ["Three.js", "GSAP", "Sharp", "esbuild", "WebGL", "原生 JS"],
    outcome:
      "v2 已上线 · 113 张图 · 多档 WebP + LQIP 自动管线 · 速度感与无障碍兼顾",
    features: [
      "全屏 Hero · WebGL Portal",
      "自定义三环涟漪光标",
      "横向滚动画廊",
      "速度感失真",
      "Prompt 浮出面板",
      "焦点追踪",
      "触屏 / Reduced-Motion 降级",
      "键盘可达",
    ],
    gallery: [
      { src: "/images/works/beauty/shulin-001-960.webp", alt: "Beauty · 暗夜画廊 · 木椅旷野" },
      { src: "/images/works/beauty/shulin-002-960.webp", alt: "Beauty · 暗夜画廊 · 树林系列 002" },
      { src: "/images/works/beauty/shulin-003-960.webp", alt: "Beauty · 暗夜画廊 · 树林系列 003" },
      { src: "/images/works/beauty/shulin-004-960.webp", alt: "Beauty · 暗夜画廊 · 树林系列 004" },
      { src: "/images/works/beauty/feng-shen-040-960.webp", alt: "Beauty · 暗夜画廊 · 风神 040" },
    ],
    liveUrl: "https://evander764.github.io/beauty-gallery/",
    repoUrl: "https://github.com/Evander764/beauty-gallery",
  },
  {
    id: "timetable",
    title: "Timetable",
    tagline:
      "本地优先的 Windows 桌面课表 App。把课程、任务、目标、倒计时、桌面 Widget 与每日仪式，收拢到一处。",
    role: "独立设计 + 开发",
    tech: ["Electron", "React 19", "TypeScript", "Zustand", "Tailwind v4", "Web Audio"],
    outcome:
      "v0.3.8 · 9 个核心模块 · 5 种桌面 Widget · 4 种入场仪式动画 · 已打包 Windows 安装包",
    features: [
      "课程",
      "日常任务",
      "长期目标",
      "备忘",
      "倒计时",
      "原则卡",
      "桌面 Widget",
      "时间审计",
      "每日仪式",
    ],
    gallery: [
      { src: "/images/timetable-ui/home.svg", alt: "Timetable 首页：核心信息一屏看全" },
      { src: "/images/timetable-ui/schedule.svg", alt: "Timetable 课表：当周日程" },
      { src: "/images/timetable-ui/ritual.svg", alt: "Timetable 仪式：日开 / 日结动画" },
      {
        src: "/images/timetable-ui/settings.svg",
        alt: "Timetable 设置：偏好与桌面 Widget 配置",
      },
      { src: "/images/timetable-ui/stats.svg", alt: "Timetable 统计：时间审计" },
    ],
    codeSnippet: {
      caption: "src/shared/utils/countdownEvents.ts",
      lang: "ts",
      code: `export function getRemainingBeijingDayTime(now = new Date()): string {
  const diff = Math.max(0, getBeijingDayExpiryDate(formatBeijingDateKey(now)).getTime() - now.getTime())
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return [hours, minutes, seconds].map(pad2).join(':')
}`,
    },
    repoUrl: "https://github.com/Evander764/Timetable",
  },
  {
    id: "video-maker",
    title: "Video-maker",
    tagline:
      "文案进、单文件 HTML 视频出。音频做时间标准、字幕逐句精确同步、9 种场景轮换，浏览器打开即播。",
    role: "独立设计 + 开发",
    tech: ["Python 3", "edge-tts", "MiniMax T2A", "HTML5 Canvas", "Base64 内嵌音频"],
    outcome:
      "9 种场景 · 2 套 TTS 引擎 · 3 种主题预设 · 7 个可用 demo · 零外链单文件 HTML",
    features: [
      "中文分句引擎",
      "Edge TTS 字级同步",
      "MiniMax 句级字幕",
      "时间轴构建",
      "场景库（标题 / 引文 / 数字 / 终端 / 数据条 / 粒子 / 水墨 / 线 / 字符）",
      "主题预设",
      "Prompt 工程库",
      "单文件 HTML 渲染",
    ],
    motif: { big: "{ SCRIPT → MP4? }", sub: "TXT TO PLAYABLE HTML" },
  },
  {
    id: "contemporary-contact",
    title: "Contemporary-contact",
    tagline: "一个会过期的小群。开 60 分钟，聊完就散，没有账号、没有历史。",
    role: "独立设计 + 开发",
    tech: ["Next.js", "Supabase", "Vercel", "TypeScript", "Server Actions"],
    outcome: "线上可用 · 房间到期自动销毁 · HMAC 派生开发者密钥",
    features: [
      "无账号 · 无历史 · 无云端复印",
      "60 分钟自动到期销毁",
      "邀请码 + 双角色（开张 / 入伙）",
      "HMAC-SHA256 派生授权密钥",
      "Server Actions",
    ],
    codeSnippet: {
      caption: "lib/rooms.ts",
      lang: "ts",
      code: `import "server-only";
import { createHash, createHmac, randomBytes, randomUUID } from "node:crypto";
import { db } from "./supabase-server";
import { hashToken, setTokenCookie, signToken } from "./tokens";

export const ROOM_TTL_SEC = 60 * 60;

/**
 * 从 invite_secret 派生开发者授权密钥（确定性、无需额外列）。
 * HMAC-SHA256(invite_secret, "developer_key") → base64url 前 16 字符。
 */
export function deriveDeveloperKey(inviteSecret: string): string {
  const mac = createHmac("sha256", inviteSecret)
    .update("developer_key")
    .digest("base64url");
  return \`dev_key_\${mac.slice(0, 16)}\`;
}`,
    },
    liveUrl: "https://contemporary-contact.vercel.app/",
  },
];
