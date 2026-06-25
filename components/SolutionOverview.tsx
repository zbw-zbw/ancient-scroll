"use client";

const features = [
  {
    title: "智能双语阅读",
    description: "点击任意词语，原文翻译、语法解析即刻呈现",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {/* Text/translation two-column icon */}
        <rect x="2" y="3" width="6" height="14" rx="1" />
        <rect x="12" y="3" width="6" height="14" rx="1" />
        <line x1="4" y1="6" x2="6" y2="6" />
        <line x1="4" y1="9" x2="7" y2="9" />
        <line x1="4" y1="12" x2="5" y2="12" />
        <line x1="14" y1="6" x2="16" y2="6" />
        <line x1="14" y1="9" x2="17" y2="9" />
        <line x1="14" y1="12" x2="15" y2="12" />
      </svg>
    ),
  },
  {
    title: "AI 异兽图鉴",
    description: "为每只异兽生成专属水墨插画",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {/* Beast paw / claw mark icon */}
        <circle cx="10" cy="14" r="3" />
        <circle cx="6" cy="8" r="1.5" />
        <circle cx="10" cy="6" r="1.5" />
        <circle cx="14" cy="8" r="1.5" />
      </svg>
    ),
  },
  {
    title: "诗境漫游",
    description: "一句一景，AI 生成水墨意境图",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {/* Petal / poetry scroll icon */}
        <path d="M10 3 Q14 3 14 7 Q14 11 10 11 Q6 11 6 7 Q6 3 10 3" />
        <path d="M10 11 L10 17" />
        <path d="M7 14 Q10 17 13 14" />
      </svg>
    ),
  },
  {
    title: "古今对话",
    description: "穿越时空，与李白、苏轼畅聊诗词人生",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {/* Chat bubble icon */}
        <path d="M4 4 H16 A1 1 0 0 1 17 5 V13 A1 1 0 0 1 16 14 H10 L6 17 V14 H4 A1 1 0 0 1 3 13 V5 A1 1 0 0 1 4 4" />
        <line x1="6" y1="8" x2="10" y2="8" />
        <line x1="6" y1="11" x2="12" y2="11" />
      </svg>
    ),
  },
];

export default function SolutionOverview() {
  return (
    <section className="fade-in relative w-full border-t border-ink/[0.06] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* Section title */}
        <div className="relative mb-12 md:mb-16">
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink relative z-10">
            我们的方案
          </h2>
          <span
            className="pointer-events-none absolute -top-8 left-0 md:left-4 font-calligraphy text-[140px] leading-none opacity-[0.08] select-none"
            style={{ color: "var(--ink)" }}
          >
            叁
          </span>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-lg bg-surface/60 px-6 py-5 transition-all duration-300 hover:bg-surface hover:shadow-md md:px-8 md:py-6"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cinnabar/10 text-cinnabar transition-colors group-hover:bg-cinnabar/15">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-calligraphy mb-1 text-xl text-ink">
                  {feature.title}
                </h3>
                <p className="font-serif text-sm leading-relaxed text-light-ink">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
