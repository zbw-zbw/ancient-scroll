const painPoints = [
  {
    icon: "📜",
    title: "读不懂",
    desc: "文言文像外语一样，逐字查字典太痛苦",
  },
  {
    icon: "🖼️",
    title: "没画面",
    desc: "九尾狐长什么样？想象不出古文描述的场景",
  },
  {
    icon: "😴",
    title: "没兴趣",
    desc: "干巴巴的文字翻译，完全感受不到古文之美",
  },
];

export default function PainPoints() {
  return (
    <section className="fade-in relative w-full border-t border-ink/[0.06] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* Section title */}
        <div className="relative mb-12 md:mb-16">
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink relative z-10">
            古籍之困
          </h2>
          <span
            className="pointer-events-none absolute -top-8 left-0 md:left-4 font-calligraphy text-[140px] leading-none opacity-[0.08] select-none"
            style={{ color: "var(--ink)" }}
          >
            壹
          </span>
        </div>

        {/* Quote block */}
        <blockquote className="relative mb-14 border-l-4 border-cinnabar bg-surface/50 px-6 py-6 md:px-10 md:py-8">
          <span className="pointer-events-none absolute left-3 top-2 font-serif text-6xl text-cinnabar/10 select-none">
            “
          </span>
          <p className="font-serif relative z-10 text-lg md:text-xl leading-loose text-ink/90">
            南山之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。有草焉，其状如韭而青华，其名曰祝余，食之不饥。
          </p>
          <footer className="relative z-10 mt-4 font-serif text-sm text-muted">
            —— 《山海经·南山经》
          </footer>
        </blockquote>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {painPoints.map((item, index) => (
          <div
            key={index}
            className="group relative cursor-pointer rounded-lg bg-surface/60 p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-surface"
          >
              <div className="emoji mb-4 text-4xl">{item.icon}</div>
              <h3 className="font-calligraphy mb-3 text-2xl text-ink">
                {item.title}
              </h3>
              <p className="font-serif text-sm leading-relaxed text-light-ink">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
