export type WorkCategory =
  | "desktop-ai"
  | "content-systems"
  | "workflow-infra"
  | "creative-systems"
  | "product-apps";

export type WorkStatus =
  | "已打包"
  | "本地可用"
  | "线上可用"
  | "进行中"
  | "实验";

export type WorkPrivacy = "公开" | "私有高层展示" | "本地高层展示";

export type WorkLink = {
  label: string;
  href: string;
};

export type Work = {
  id: string;
  title: string;
  tagline: string;
  category: WorkCategory;
  status: WorkStatus;
  privacy: WorkPrivacy;
  featured?: boolean;
  role?: string;
  tech?: string[];
  outcome?: string;
  summary?: string[];
  proof?: string[];
  features?: string[];
  image?: string;
  gallery?: { src: string; alt: string }[];
  motif?: { big: string; sub: string };
  codeSnippet?: { caption?: string; lang?: string; code: string };
  liveUrl?: string;
  repoUrl?: string;
  links?: WorkLink[];
};

export type CapabilityLine = {
  id: WorkCategory;
  label: string;
  title: string;
  thesis: string;
  examples: string[];
};

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  "desktop-ai": "AI 接入真实桌面",
  "content-systems": "内容生产系统化",
  "workflow-infra": "个人工作流基础设施",
  "creative-systems": "内容创作系统",
  "product-apps": "产品应用",
};

export const CAPABILITY_LINES: CapabilityLine[] = [
  {
    id: "desktop-ai",
    label: "LINE 01",
    title: "把 AI 接到真实桌面",
    thesis:
      "不是让模型停在聊天窗口里，而是让它能看见屏幕、理解界面、执行动作，并且被权限和日志约束住。",
    examples: ["AI Desktop Pilot", "AI Mouse", "AI Mouse Plus"],
  },
  {
    id: "content-systems",
    label: "LINE 02",
    title: "把内容生产变成系统",
    thesis:
      "从选题巡检、证据采集、日报导出，到风格蒸馏、字幕时间轴和发布资产，把内容工作流拆成可复用的机器流程。",
    examples: ["Viral Brief Plus", "AI Writer · Shulin", "Video-maker"],
  },
  {
    id: "workflow-infra",
    label: "LINE 03",
    title: "把个人工作流产品化",
    thesis:
      "当工具越来越多，就继续造中控台、权限控制器和本地 API，让自己的日常工作少一点摩擦。",
    examples: ["Local Agent Infrastructure", "Auto Agree", "ControlDeck"],
  },
];

export const WORKS: Work[] = [
  {
    id: "ai-desktop-pilot",
    title: "AI Desktop Pilot",
    tagline:
      "一个可控的 macOS 桌面自动化窗口应用：让 AI 操作真实 App，但把不可逆动作挡在安全边界外。",
    category: "desktop-ai",
    status: "已打包",
    privacy: "私有高层展示",
    featured: true,
    role: "独立设计 + 开发",
    tech: ["Swift", "AppKit", "Accessibility", "Screen Capture", "Hermes", "OpenClaw"],
    outcome:
      "已形成独立 bundle id、原生窗口、CLI 入口、权限身份和任务日志；首个工作流写入微信草稿但不会发送。",
    summary: [
      "读取前台 App 的辅助功能树，必要时用窗口截图兜底。",
      "把截图、OCR 和 AX 摘要交给本地 planner，再执行经过白名单验证的动作。",
      "每个任务保存输入、状态事件、截图和错误，便于复盘。",
    ],
    proof: ["微信草稿安全流", "任务串行锁", "逐步截图日志"],
    features: [
      "AX target 优先",
      "坐标兜底",
      "不可逆动作确认",
      "紧急停止",
      "本地 run log",
      "原生窗口",
    ],
    motif: { big: "AX", sub: "CONTROLLED DESKTOP AGENT" },
  },
  {
    id: "viral-brief-plus",
    title: "Viral Brief Plus",
    tagline:
      "本地内容情报工作台：巡检小红书、抖音、视频号和公众号，把候选内容整理成可复核日报。",
    category: "content-systems",
    status: "本地可用",
    privacy: "公开",
    featured: true,
    role: "独立设计 + 开发",
    tech: ["Node.js", "JavaScript", "SQLite", "Chrome Automation", "macOS WeChat", "Local Web UI"],
    outcome:
      "从账号池、平台巡检、证据保存、阈值筛选到 Markdown / HTML / CSV / ZIP 导出，形成完整本地流程。",
    summary: [
      "网页平台先采集后筛选，稳定 DOM 和页面数据优先，弱证据只进待复核。",
      "视频号只操作 macOS 微信客户端，不把网页兜底当作真实路径。",
      "AI 只用于整理和聚类，不参与入选互动数据判断。",
    ],
    proof: ["账号池", "巡检顺序", "截图证据", "日报导出"],
    features: [
      "小红书巡检",
      "抖音详情翻页",
      "视频号桌面流",
      "公众号导入",
      "本地数据库",
      "日报导出",
    ],
    motif: { big: "VB+", sub: "LOCAL CONTENT RADAR" },
    repoUrl: "https://github.com/Evander764/ViralBrief-Plus",
  },
  {
    id: "dokiiiii",
    title: "心动作战室",
    tagline:
      "把恋爱课程、聊天截图 OCR、skill 路由和会员权益做成一个 AI 恋爱沟通助手。",
    category: "product-apps",
    status: "线上可用",
    privacy: "私有高层展示",
    featured: true,
    role: "独立设计 + 开发",
    tech: ["Next.js", "Supabase", "DeepSeek", "Qwen-VL", "TypeScript", "Prompt Routing"],
    outcome:
      "119 个 skill、双入口 prompt、OCR 聊天截图识别、Supabase Auth / sessions / feedback 和月度会员权益层。",
    summary: [
      "快速回复入口：上传聊天截图，输出三种风险偏好的可粘贴回复。",
      "长期陪伴入口：结构化表单进入深度分析报告。",
      "同一套 skill 库同时服务快速场景和长期关系分析。",
    ],
    proof: ["119 个 skill", "OCR 识别", "双入口架构", "会员权益"],
    features: ["快速回复", "长期咨询", "Qwen-VL OCR", "DeepSeek", "Supabase", "支付入口"],
    motif: { big: "119", sub: "SKILLS · TWO ENTRY PRODUCT" },
  },
  {
    id: "local-agent-infra",
    title: "Local Agent Infrastructure",
    tagline:
      "把权限审批、应用中控、能力目录和本地 API 收拢成一套可调用的 Agent 基础设施。",
    category: "workflow-infra",
    status: "本地可用",
    privacy: "本地高层展示",
    featured: true,
    role: "独立设计 + 开发",
    tech: ["Python", "FastAPI", "Swift", "AppKit", "REST API", "Local Config"],
    outcome:
      "从权限审批、应用中控到能力目录，都变成可调用、可恢复、可审计的本地能力。",
    summary: [
      "Auto Agree 管理多 Agent 审批策略，不靠鼠标点击伪自动化。",
      "ControlDeck 给散落的小应用提供统一控制台和 REST API。",
      "每个动作都需要明确入口、权限策略和结果记录。",
    ],
    proof: ["多 Agent 权限", "统一 API", "能力目录", "本地令牌保护"],
    features: ["Auto Agree", "ControlDeck", "能力目录", "审计日志", "本地 API"],
    motif: { big: "API", sub: "LOCAL TOOLCHAIN CONTROL" },
  },
  {
    id: "creative-systems",
    title: "Creative Systems",
    tagline:
      "把视频、写作和发布资产做成可复用系统：不是一次性作品，而是一条内容生产管线。",
    category: "creative-systems",
    status: "进行中",
    privacy: "公开",
    featured: true,
    role: "独立设计 + 开发",
    tech: ["Three.js", "GSAP", "Python", "TTS", "Canvas", "Markdown"],
    outcome:
      "包含 Video-maker、AI Writer · Shulin 和 Markdown 发布资产等不同层级的内容创作工具。",
    summary: [
      "Video-maker 把文案、TTS、字幕和场景时间轴打包成单文件 HTML 视频。",
      "AI Writer · Shulin 正在把公众号写作风格蒸馏成可调用 skill。",
      "Markdown 发布资产只保留为排版和分发流程，不展示外部视觉项目。",
    ],
    proof: ["字幕时间轴", "风格蒸馏", "发布资产"],
    features: ["视频生成", "写作 skill", "发布排版", "Prompt 管线"],
    gallery: [
      { src: "/images/works/video-maker/01-establishing.png", alt: "Video-maker · 开场镜头" },
      { src: "/images/works/video-maker/03-pair.png", alt: "Video-maker · pair 场景" },
      { src: "/images/works/video-maker/05-scale.png", alt: "Video-maker · scale 场景" },
    ],
  },
  {
    id: "ai-mouse",
    title: "AI Mouse",
    tagline:
      "独立的视觉桌面代理原型：调用多模态 API 看屏幕、返回动作、再由本地执行。",
    category: "desktop-ai",
    status: "已打包",
    privacy: "本地高层展示",
    role: "独立设计 + 开发",
    tech: ["Swift", "Gemini", "OpenAI-compatible APIs", "Accessibility", "Scheduled Tasks"],
    outcome: "支持多 Provider、后台 monitor、直播入口检测和本地工作流触发。",
    features: ["视觉 API", "动作白名单", "任务调度", "Live Watcher"],
    motif: { big: "AI", sub: "MOUSE · VISION TO ACTION" },
  },
  {
    id: "ai-mouse-plus",
    title: "AI Mouse Plus",
    tagline:
      "连接 Hermes / OpenClaw 与本地桌面执行器的菜单栏应用，是 AI Desktop Pilot 的前身。",
    category: "desktop-ai",
    status: "已打包",
    privacy: "本地高层展示",
    role: "独立设计 + 开发",
    tech: ["Swift", "Hermes", "OpenClaw", "OCR", "Accessibility"],
    outcome: "本地 planner 只生成动作计划，真正执行、校验和坐标转换由 App 完成。",
    features: ["planner stdout", "本地 OCR", "前台窗口坐标转换", "CLI launcher"],
    motif: { big: "OCR", sub: "PLANNER · EXECUTOR LOOP" },
  },
  {
    id: "auto-agree",
    title: "Auto Agree",
    tagline:
      "本地多 Agent 审批控制器：统一切换 Claude Code、Codex、Antigravity、Hermes 和 OpenClaw 的权限模式。",
    category: "workflow-infra",
    status: "已打包",
    privacy: "私有高层展示",
    role: "独立设计 + 开发",
    tech: ["Python", "AppKit", "Config Management", "Audit Log"],
    outcome: "提供 safe / all / off 模式、配置备份恢复、审计日志和菜单栏控制。",
    features: ["safe-all", "enable-all", "disable-all", "redacted audit log"],
    motif: { big: "OK", sub: "AGENT APPROVAL CONTROL" },
  },
  {
    id: "controldeck",
    title: "ControlDeck",
    tagline:
      "本地小应用中控台与统一 API 网关，让其他 Agent 可以发现和调用散落的工具。",
    category: "workflow-infra",
    status: "本地可用",
    privacy: "本地高层展示",
    role: "独立设计 + 开发",
    tech: ["Python", "FastAPI", "REST", "Adapters", "macOS App"],
    outcome: "接入 15 个本地应用，提供能力目录、动作历史、收藏能力和 token 保护。",
    features: ["adapter 模式", "OpenAPI", "能力目录", "动作历史", "本地 token"],
    motif: { big: "15", sub: "LOCAL APPS · ONE CONTROL SURFACE" },
  },
  {
    id: "ai-writer-shulin",
    title: "AI Writer · Shulin",
    tagline:
      "把公众号文章蒸馏成可调用写作 skill，之后给一个论点就能生成接近目标风格的长文。",
    category: "content-systems",
    status: "进行中",
    privacy: "本地高层展示",
    role: "独立设计 + 开发",
    tech: ["Python", "Markdown", "Claude Skills", "Style Distillation"],
    outcome: "规划了清洗、标注、主题聚类、风格蒸馏、skill 生成和盲测验证流程。",
    features: ["文章清洗", "单篇标注", "风格蒸馏", "结构蒸馏", "盲测验证"],
    motif: { big: "文", sub: "VOICE · STRUCTURE · ARGUMENT" },
  },
  {
    id: "video-maker",
    title: "Video-maker",
    tagline:
      "文案进、单文件 HTML 视频出。音频做时间标准，字幕逐句精确同步。",
    category: "content-systems",
    status: "本地可用",
    privacy: "本地高层展示",
    role: "独立设计 + 开发",
    tech: ["Python 3", "edge-tts", "MiniMax T2A", "HTML5 Canvas", "Base64 Audio"],
    outcome:
      "9 种场景 · 2 套 TTS 引擎 · 3 种主题预设 · 7 个 demo · 零外链单文件 HTML。",
    features: ["中文分句", "TTS 同步", "时间轴", "场景库", "单文件 HTML"],
    gallery: [
      { src: "/images/works/video-maker/01-establishing.png", alt: "Video-maker · 开场镜头" },
      { src: "/images/works/video-maker/02-single.png", alt: "Video-maker · single 场景" },
      { src: "/images/works/video-maker/03-pair.png", alt: "Video-maker · pair 场景" },
      { src: "/images/works/video-maker/04-rain.png", alt: "Video-maker · rain 场景" },
      { src: "/images/works/video-maker/05-scale.png", alt: "Video-maker · scale 场景" },
    ],
  },
];

export const FEATURED_WORKS = WORKS.filter((work) => work.featured);
