"use client";

const fallingChars = [
  { char: "山", left: "8%", delay: "0s", duration: "14s", size: "2.5rem" },
  { char: "海", left: "22%", delay: "2s", duration: "18s", size: "2rem" },
  { char: "经", left: "75%", delay: "1s", duration: "16s", size: "2.2rem" },
  { char: "诗", left: "88%", delay: "3s", duration: "20s", size: "1.8rem" },
  { char: "赋", left: "15%", delay: "5s", duration: "17s", size: "1.6rem" },
  { char: "道", left: "82%", delay: "4s", duration: "15s", size: "2rem" },
];

// Simplified SVG paths approximating each character's strokes
const charPaths: Record<string, string[]> = {
  古: [
    "M 18 24 Q 40 22 62 24",
    "M 40 24 L 40 92",
    "M 22 58 Q 40 56 58 58",
    "M 26 58 L 26 86",
    "M 54 58 L 54 86",
    "M 26 86 Q 40 88 54 86",
  ],
  籍: [
    "M 18 18 Q 20 27 24 37",
    "M 30 18 Q 28 27 24 37",
    "M 50 18 Q 52 27 56 37",
    "M 62 18 Q 60 27 56 37",
    "M 14 42 Q 40 40 66 42",
    "M 28 42 L 26 90",
    "M 52 42 L 54 90",
    "M 26 64 Q 40 62 54 64",
    "M 26 86 Q 40 84 54 86",
  ],
  焕: [
    "M 22 22 Q 26 28 22 34",
    "M 34 22 Q 30 28 34 34",
    "M 28 36 L 28 90",
    "M 46 30 Q 56 28 66 30",
    "M 56 30 L 56 90",
    "M 46 52 L 66 72",
    "M 66 52 L 46 72",
    "M 46 90 Q 56 92 66 90",
  ],
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-32 pb-28 md:pt-40 md:pb-32">
      {/* Side ink wash decorations */}
      <div
        className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full ink-wash"
        style={{
          background:
            "radial-gradient(circle, rgba(26,26,46,0.08) 0%, rgba(26,26,46,0.03) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 h-[28rem] w-[28rem] rounded-full ink-wash"
        style={{
          background:
            "radial-gradient(circle, rgba(26,26,46,0.06) 0%, rgba(26,26,46,0.02) 40%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Falling characters */}
      {fallingChars.map((item, index) => (
        <span
          key={index}
          className="pointer-events-none fixed hidden md:block font-calligraphy text-ink/10 animate-fall-char z-0"
          style={{
            left: item.left,
            top: "-10vh",
            fontSize: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.char}
        </span>
      ))}

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-cinnabar/40 bg-seal-bg/60 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-cinnabar" />
          <span className="font-serif text-xs tracking-widest text-cinnabar">
            TRAE AI 创造力大赛 · 参赛作品
          </span>
        </div>

        {/* Main title */}
        <h1 className="mb-8 font-calligraphy text-7xl md:text-8xl text-ink tracking-wider">
          古籍焕新
        </h1>

        {/* Subtitle */}
        <p className="font-handwrite mb-6 text-2xl md:text-3xl text-light-ink tracking-wide">
          让千年文字“活”起来
        </p>

        {/* Intro stat */}
        <p className="font-serif max-w-md text-base md:text-lg text-muted leading-relaxed">
          95%的人知道《山海经》，但不到5%的人读过原文
        </p>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-1 animate-bounce-down">
          <span className="font-serif text-xs text-muted">向下探索</span>
          <span className="text-lg text-cinnabar">▼</span>
        </div>
      </div>
    </section>
  );
}
