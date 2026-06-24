export type ParticleType =
  | "petals"
  | "snow"
  | "rain"
  | "leaves"
  | "stars"
  | "fireflies";

export interface PoemLine {
  text: string;
  annotation: string;
  mood: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: "light" | "dark";
  particleType?: ParticleType;
}

export interface Poem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  lines: PoemLine[];
  theme: string;
  description: string;
}

export const poems: Poem[] = [
  {
    id: "chunxiao",
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    theme: "#f59e0b",
    description: "一首关于春日清晨的恬淡小诗",
    lines: [
      {
        text: "春眠不觉晓",
        annotation: "春天的夜晚太舒适，不知不觉天就亮了",
        mood: "晨·恬静",
        emoji: "🌅",
        gradientFrom: "#fef3c7",
        gradientTo: "#fde68a",
        textColor: "dark",
        particleType: "petals",
      },
      {
        text: "处处闻啼鸟",
        annotation: "到处都能听到鸟儿清脆的啼鸣声",
        mood: "生·灵动",
        emoji: "🐦",
        gradientFrom: "#d9f99d",
        gradientTo: "#a3e635",
        textColor: "dark",
        particleType: "petals",
      },
      {
        text: "夜来风雨声",
        annotation: "回想起昨夜那一阵风雨交加的声音",
        mood: "夜·沉郁",
        emoji: "🌧️",
        gradientFrom: "#bfdbfe",
        gradientTo: "#60a5fa",
        textColor: "dark",
        particleType: "rain",
      },
      {
        text: "花落知多少",
        annotation: "不知道有多少花儿被风雨打落了呢",
        mood: "叹·惜春",
        emoji: "🌸",
        gradientFrom: "#fce7f3",
        gradientTo: "#f9a8d4",
        textColor: "dark",
        particleType: "petals",
      },
    ],
  },
  {
    id: "jingyesi",
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    theme: "#6366f1",
    description: "千古思乡第一诗",
    lines: [
      {
        text: "床前明月光",
        annotation: "床前洒满了皎洁的月光",
        mood: "月·清冷",
        emoji: "🌕",
        gradientFrom: "#e0e7ff",
        gradientTo: "#c7d2fe",
        textColor: "dark",
        particleType: "stars",
      },
      {
        text: "疑是地上霜",
        annotation: "恍惚间以为是地上结了一层白霜",
        mood: "幻·朦胧",
        emoji: "❄️",
        gradientFrom: "#f1f5f9",
        gradientTo: "#e2e8f0",
        textColor: "dark",
        particleType: "stars",
      },
      {
        text: "举头望明月",
        annotation: "抬起头来仰望天上的明月",
        mood: "望·孤寂",
        emoji: "🌙",
        gradientFrom: "#312e81",
        gradientTo: "#4338ca",
        textColor: "light",
        particleType: "stars",
      },
      {
        text: "低头思故乡",
        annotation: "低下头来不禁思念起远方的故乡",
        mood: "思·乡愁",
        emoji: "🏠",
        gradientFrom: "#1e1b4b",
        gradientTo: "#312e81",
        textColor: "light",
        particleType: "fireflies",
      },
    ],
  },
  {
    id: "dengguan",
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    theme: "#ea580c",
    description: "壮阔山河中的人生哲理",
    lines: [
      {
        text: "白日依山尽",
        annotation: "夕阳沿着西山缓缓落下",
        mood: "落·壮美",
        emoji: "🌄",
        gradientFrom: "#fed7aa",
        gradientTo: "#fb923c",
        textColor: "dark",
        particleType: "leaves",
      },
      {
        text: "黄河入海流",
        annotation: "黄河滚滚向东奔流入海",
        mood: "阔·奔涌",
        emoji: "🌊",
        gradientFrom: "#bae6fd",
        gradientTo: "#38bdf8",
        textColor: "dark",
      },
      {
        text: "欲穷千里目",
        annotation: "想要把千里之外的风景都看尽",
        mood: "志·高远",
        emoji: "🦅",
        gradientFrom: "#fef9c3",
        gradientTo: "#fde047",
        textColor: "dark",
      },
      {
        text: "更上一层楼",
        annotation: "就得再登上更高的一层楼",
        mood: "悟·超越",
        emoji: "🏯",
        gradientFrom: "#fecaca",
        gradientTo: "#f87171",
        textColor: "dark",
      },
    ],
  },
  {
    id: "lushan",
    title: "望庐山瀑布",
    author: "李白",
    dynasty: "唐",
    theme: "#0ea5e9",
    description: "飞流直下的磅礴气势",
    lines: [
      {
        text: "日照香炉生紫烟",
        annotation: "阳光照耀下的香炉峰升起了紫色的云烟",
        mood: "幻·瑰丽",
        emoji: "☀️",
        gradientFrom: "#fae8ff",
        gradientTo: "#e879f9",
        textColor: "dark",
      },
      {
        text: "遥看瀑布挂前川",
        annotation: "远远望去，瀑布像一条白练挂在山前",
        mood: "远·壮观",
        emoji: "🏔️",
        gradientFrom: "#ecfeff",
        gradientTo: "#67e8f9",
        textColor: "dark",
      },
      {
        text: "飞流直下三千尺",
        annotation: "水流飞泻直下仿佛有三千尺高",
        mood: "势·磅礴",
        emoji: "💧",
        gradientFrom: "#dbeafe",
        gradientTo: "#3b82f6",
        textColor: "dark",
        particleType: "rain",
      },
      {
        text: "疑是银河落九天",
        annotation: "让人怀疑是银河从天上倾泻而下",
        mood: "奇·震撼",
        emoji: "✨",
        gradientFrom: "#0c4a6e",
        gradientTo: "#0284c7",
        textColor: "light",
        particleType: "stars",
      },
    ],
  },
  {
    id: "jiangxue",
    title: "江雪",
    author: "柳宗元",
    dynasty: "唐",
    theme: "#64748b",
    description: "天地间最孤独的一幅画",
    lines: [
      {
        text: "千山鸟飞绝",
        annotation: "所有的山上都看不到飞鸟的影子",
        mood: "绝·空寂",
        emoji: "🏔️",
        gradientFrom: "#f8fafc",
        gradientTo: "#f1f5f9",
        textColor: "dark",
        particleType: "snow",
      },
      {
        text: "万径人踪灭",
        annotation: "所有的小路上都没有人的踪迹",
        mood: "灭·荒寒",
        emoji: "👣",
        gradientFrom: "#f1f5f9",
        gradientTo: "#e2e8f0",
        textColor: "dark",
        particleType: "snow",
      },
      {
        text: "孤舟蓑笠翁",
        annotation: "只有一条小船上坐着一个披蓑戴笠的老翁",
        mood: "孤·苍茫",
        emoji: "🛶",
        gradientFrom: "#e2e8f0",
        gradientTo: "#cbd5e1",
        textColor: "dark",
        particleType: "snow",
      },
      {
        text: "独钓寒江雪",
        annotation: "独自在寒冷的江面上垂钓着漫天飞雪",
        mood: "独·超然",
        emoji: "🎣",
        gradientFrom: "#cbd5e1",
        gradientTo: "#94a3b8",
        textColor: "dark",
        particleType: "snow",
      },
    ],
  },
  {
    id: "fengqiao",
    title: "枫桥夜泊",
    author: "张继",
    dynasty: "唐",
    theme: "#b45309",
    description: "秋夜江南的千古愁思",
    lines: [
      {
        text: "月落乌啼霜满天",
        annotation: "月亮落下去了，乌鸦啼叫着，寒霜布满了天空",
        mood: "寒·萧瑟",
        emoji: "🌑",
        gradientFrom: "#1c1917",
        gradientTo: "#292524",
        textColor: "light",
        particleType: "leaves",
      },
      {
        text: "江枫渔火对愁眠",
        annotation: "江边的枫树和渔船上的灯火，伴着我满怀愁绪难以入眠",
        mood: "愁·辗转",
        emoji: "🔥",
        gradientFrom: "#292524",
        gradientTo: "#44403c",
        textColor: "light",
        particleType: "fireflies",
      },
      {
        text: "姑苏城外寒山寺",
        annotation: "姑苏城外的寒山寺",
        mood: "古·悠远",
        emoji: "🏛️",
        gradientFrom: "#44403c",
        gradientTo: "#57534e",
        textColor: "light",
      },
      {
        text: "夜半钟声到客船",
        annotation: "半夜里悠扬的钟声传到了我乘坐的客船上",
        mood: "钟·余韵",
        emoji: "🔔",
        gradientFrom: "#57534e",
        gradientTo: "#78716c",
        textColor: "light",
      },
    ],
  },
];
