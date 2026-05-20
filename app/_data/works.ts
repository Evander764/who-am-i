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
  liveUrl?: string;
  repoUrl?: string;
};

export const WORKS: Work[] = [
  {
    id: "contemporary-contact",
    title: "Contemporary-contact",
    tagline: "一个会过期的小群。开 60 分钟，聊完就散，没有账号、没有历史。",
    role: "独立设计 + 开发",
    tech: ["Next.js", "Supabase", "Vercel"],
    outcome: "线上可用",
    liveUrl: "https://contemporary-contact.vercel.app/",
    motif: { big: "{ 60min }", sub: "TEMPORARY ROOM" },
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
    repoUrl: "https://github.com/Evander764/Timetable",
  },
];
