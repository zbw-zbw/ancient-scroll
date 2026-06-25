const stats = [
  { value: "20", unit: "篇", label: "首批收录" },
  { value: "100+", unit: "", label: "AI神兽插画" },
  { value: "3", unit: "秒", label: "AI响应速度" },
  { value: "∞", unit: "", label: "探索可能" },
];

export default function DataStats() {
  return (
    <section className="fade-in relative w-full py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 md:px-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex items-baseline justify-center gap-1">
                  <span className="font-calligraphy text-4xl text-gold md:text-5xl">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="font-serif text-sm text-gold/80">{stat.unit}</span>
                  )}
                </div>
                <p className="font-serif text-sm text-xuan/70">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Watermark */}
          <span
            className="pointer-events-none absolute -bottom-6 -right-4 font-calligraphy text-[140px] leading-none opacity-10 select-none"
            style={{ color: "var(--gold)" }}
          >
            數
          </span>
        </div>
      </div>
    </section>
  );
}
