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
      "一份纯静态图集展示站。Three.js portal 着色器、速度感失真、横向滚动 brutalist 卡片。",
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
      { src: "/images/works/timetable/01-home.png", alt: "Timetable 首页：核心信息一屏看全" },
      { src: "/images/works/timetable/02-schedule.png", alt: "Timetable 课表：当周日程" },
      { src: "/images/works/timetable/03-ritual.png", alt: "Timetable 仪式：日开 / 日结动画" },
      { src: "/images/works/timetable/04-settings.png", alt: "Timetable 设置：偏好与桌面 Widget 配置" },
      { src: "/images/works/timetable/05-stats.png", alt: "Timetable 统计：时间审计" },
    ],
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
      "14 种场景库",
      "主题预设",
      "Prompt 工程库",
      "单文件 HTML 渲染",
    ],
    gallery: [
      { src: "/images/works/video-maker/01-establishing.png", alt: "Video-maker · 「诚实，是对自己的」开场镜头" },
      { src: "/images/works/video-maker/02-single.png", alt: "Video-maker · single 场景：「实」字字源" },
      { src: "/images/works/video-maker/03-pair.png", alt: "Video-maker · pair 场景：言行合一" },
      { src: "/images/works/video-maker/04-rain.png", alt: "Video-maker · rain 场景：第一站是自己" },
      { src: "/images/works/video-maker/05-scale.png", alt: "Video-maker · scale 场景：认出 / 感受 / 接纳" },
    ],
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
    gallery: [
      { src: "/images/works/contemporary-contact/01-landing.png", alt: "Contemporary-contact · 首页：来挂个临时号子" },
      { src: "/images/works/contemporary-contact/02-host.png", alt: "Contemporary-contact · 递个开房申请" },
      { src: "/images/works/contemporary-contact/03-join.png", alt: "Contemporary-contact · 入伙：聊个天" },
    ],
    liveUrl: "https://contemporary-contact.vercel.app/",
  },
];
