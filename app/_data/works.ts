export type Work = {
  id: string;
  title: string;
  tagline: string;
  role?: string;
  tech?: string[];
  outcome?: string;
  image?: string;
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
    tagline: "把课表做成一个有仪式感的桌面应用，让上课这件事被认真对待。",
    role: "独立设计 + 开发",
    tech: ["Electron", "React", "Canvas"],
    outcome: "5 屏 UI 已成形：首页 / 课表 / 仪式 / 设置 / 统计",
    image: "/images/timetable-ui/home.svg",
  },
];
