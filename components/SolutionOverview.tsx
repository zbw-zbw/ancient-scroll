import Link from "next/link";

const features = [
  { icon: "🔤", label: "智能双语阅读", href: "/reading", position: "left-0 top-1/2 -translate-y-1/2" },
  { icon: "🐉", label: "AI异兽图鉴", href: "/bestiary", position: "right-0 top-1/2 -translate-y-1/2" },
  { icon: "🌸", label: "诗境漫游", href: "/poetry", position: "top-0 left-1/2 -translate-x-1/2" },
  { icon: "💬", label: "古今对话", href: "/dialogue", position: "bottom-0 left-1/2 -translate-x-1/2" },
];

export default function SolutionOverview() {
  return (
    <section className="fade-in relative w-full border-t border-ink/[0.06] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* Section title */}
        <div className="relative mb-12 md:mb-16">
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink relative z-10">
            古籍焕新，用AI重新定义阅读
          </h2>
          <span
            className="pointer-events-none absolute -top-8 left-0 md:left-4 font-calligraphy text-[140px] leading-none opacity-[0.08] select-none"
            style={{ color: "var(--ink)" }}
          >
            叁
          </span>
        </div>

        {/* Device mockup with floating feature tags */}
        <div className="relative mx-auto max-w-3xl">
          {/* Feature tags - desktop */}
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className={`group absolute ${feature.position} hidden md:flex items-center gap-2 rounded-full border border-rule bg-surface/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:border-cinnabar/40 hover:shadow-md hover:bg-surface`}
            >
              <span className="emoji text-lg">{feature.icon}</span>
              <span className="font-serif text-sm text-ink whitespace-nowrap">
                {feature.label}
              </span>
              <span className="text-xs text-muted opacity-0 group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}

          {/* Device */}
          <div className="relative mx-auto w-full max-w-[360px] rounded-[2.5rem] border-[8px] border-ink/80 bg-ink/80 p-3 shadow-2xl">
            <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-ink/60" />
            <div className="mt-5 overflow-hidden rounded-[1.8rem] bg-xuan">
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-2 bg-xuan-dark/70">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
                </div>
                <span className="font-serif text-xs text-muted">山海经·南山经</span>
                <span className="font-serif text-xs text-muted">12:00</span>
              </div>

              {/* Content */}
              <div className="px-5 py-4 space-y-4">
                <div className="border-b border-rule/50 pb-3">
                  <p className="font-serif text-sm leading-7 text-ink/90">
                    南山之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。
                  </p>
                </div>
                <div>
                  <p className="font-serif text-sm leading-7 text-muted">
                    南方群山的第一座叫鹊山。鹊山最高处叫招摇山，矗立在西海边上，山上桂树成林，遍布金石美玉。
                  </p>
                </div>
                <div className="rounded-md bg-surface p-3 border-l-2 border-cinnabar">
                  <p className="font-serif text-xs text-cinnabar mb-1">字词解读 · 䧿</p>
                  <p className="font-serif text-xs text-light-ink">古“鹊”字，指喜鹊，此处为山名。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile feature tags */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="flex items-center justify-center gap-2 rounded-full border border-rule bg-surface/80 px-3 py-2.5"
              >
                <span className="emoji text-lg">{feature.icon}</span>
                <span className="font-serif text-sm text-ink">{feature.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
