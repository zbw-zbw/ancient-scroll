function PersonaAvatar({ color, type }: { color: string; type: "girl" | "adult" | "teacher" }) {
  const darker = (hex: string, amount = 40) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max((num >> 16) - amount, 0);
    const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
    const b = Math.max((num & 0x0000ff) - amount, 0);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };
  const strokeColor = darker(color, 50);

  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      {/* Head */}
      <circle cx="32" cy="22" r="12" fill={color} stroke={strokeColor} strokeWidth="2" />
      {/* Body */}
      <path
        d="M 12 58 Q 12 38 32 38 Q 52 38 52 58"
        fill={color}
        stroke={strokeColor}
        strokeWidth="2"
      />
      {type === "girl" && (
        <>
          {/* Short hair / bangs */}
          <path d="M 20 18 Q 32 10 44 18" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {type === "teacher" && (
        <>
          {/* Glasses */}
          <circle cx="28" cy="22" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="36" cy="22" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="31" y1="22" x2="33" y2="22" stroke={strokeColor} strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

const personas = [
  {
    name: "小林",
    age: "16岁",
    role: "高中生",
    avatarColor: "#e8d5b7",
    avatarType: "girl" as const,
    quote: "文言文是语文里最恐怖的部分",
    pains: [
      "翻译只有干巴巴的文字对照",
      "完全无法想象古文描述的场景",
      "教材注释太学术，读完更懵",
    ],
  },
  {
    name: "阿远",
    age: "28岁",
    role: "文化爱好者",
    avatarColor: "#d5e0d5",
    avatarType: "adult" as const,
    quote: "想读《山海经》，但第一页就劝退了",
    pains: [
      "市面古籍App全是电子字典模式",
      "没有沉浸式的阅读体验",
      "想了解神兽形象只能搜同人图",
    ],
  },
  {
    name: "王老师",
    age: "35岁",
    role: "语文教师",
    avatarColor: "#d5d8e8",
    avatarType: "teacher" as const,
    quote: "PPT讲文言文，学生全在走神",
    pains: [
      "缺乏生动的数字化教学工具",
      "学生觉得古文与自己无关",
      "想让学生感受古文之美，但找不到好素材",
    ],
  },
];

function CornerMark() {
  return (
    <div className="absolute left-4 top-4 h-8 w-8">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-cinnabar/40" />
      <div className="absolute left-0 top-0 h-0.5 w-full bg-cinnabar/40" />
    </div>
  );
}

export default function UserPersonas() {
  return (
    <section className="fade-in relative w-full border-t border-ink/[0.06] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* Section title */}
        <div className="relative mb-12 md:mb-16">
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink relative z-10">
            谁需要古籍焕新
          </h2>
          <span
            className="pointer-events-none absolute -top-8 left-0 md:left-4 font-calligraphy text-[140px] leading-none opacity-[0.08] select-none"
            style={{ color: "var(--ink)" }}
          >
            贰
          </span>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="group cursor-pointer rounded-xl bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface hover:shadow-lg md:p-8"
            >
              <CornerMark />

              <div className="mb-5 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full shadow-inner overflow-hidden"
                  style={{ backgroundColor: persona.avatarColor }}
                >
                  <PersonaAvatar color={persona.avatarColor} type={persona.avatarType} />
                </div>
                <div>
                  <h3 className="font-calligraphy text-2xl text-ink">
                    {persona.name}
                  </h3>
                  <p className="font-serif text-sm text-muted">
                    {persona.age} · {persona.role}
                  </p>
                </div>
              </div>

              <p className="font-handwrite mb-5 text-lg italic text-light-ink">
                &ldquo;{persona.quote}&rdquo;
              </p>

              <ul className="space-y-2">
                {persona.pains.map((pain, pIndex) => (
                  <li key={pIndex} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cinnabar" />
                    <span className="font-serif text-sm leading-relaxed text-light-ink">
                      {pain}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
