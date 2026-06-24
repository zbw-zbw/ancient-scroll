import Link from "next/link";

function FeatureTag({ number }: { number: string }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cinnabar/40 bg-seal-bg font-calligraphy text-sm text-cinnabar">
      {number}
    </span>
  );
}

function ReadingMockup() {
  return (
    <div className="rounded-2xl border border-rule bg-surface p-4 shadow-lg">
      <div className="mb-4 flex items-center gap-2 border-b border-rule/50 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-cinnabar/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-indigo/60" />
        <span className="ml-auto font-calligraphy text-sm text-ink">山海经·南山经</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <span className="mb-2 block font-serif text-xs text-cinnabar">原文</span>
          <p className="font-serif text-sm leading-7 text-ink/90">
            南山之首曰<span className="rounded bg-cinnabar/10 px-1 text-cinnabar">䧿</span>山。其首曰招摇之山，临于西海之上，多桂，多金玉。
          </p>
        </div>
        <div>
          <span className="mb-2 block font-serif text-xs text-muted">译文</span>
          <p className="font-serif text-sm leading-7 text-light-ink">
            南方群山的第一座叫鹊山。鹊山最高处叫招摇山，矗立在西海边上，山上桂树成林，遍布金石美玉。
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-cinnabar/30 bg-seal-bg p-3">
        <p className="font-serif text-xs text-cinnabar mb-1">深度解读 · 䧿（què）</p>
        <p className="font-serif text-xs text-light-ink">古“鹊”字。古人以鹊名山，取其灵秀吉祥之意。</p>
      </div>
    </div>
  );
}

function BestiaryMockup() {
  const cards = [
    { name: "九尾狐", text: "有兽焉，其状如狐而九尾", emoji: "🦊", gradient: "from-rose-200 to-amber-100" },
    { name: "鹿蜀", text: "其状如马而白首，其文如虎而赤尾", emoji: "🦌", gradient: "from-amber-200 to-orange-100" },
    { name: "狌狌", text: "其状如禺而白耳，伏行人走", emoji: "🐵", gradient: "from-stone-200 to-stone-100" },
  ];

  return (
    <div className="relative h-80 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute w-44 rounded-xl border border-rule bg-surface p-3 shadow-lg transition-all hover:scale-105 hover:z-50 ${
            index === 0 ? "left-0 top-0 rotate-[-6deg] z-30" :
            index === 1 ? "left-16 top-16 rotate-[3deg] z-20" :
            "left-32 top-32 rotate-[-2deg] z-10"
          }`}
        >
          <div className={`emoji mb-3 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br ${card.gradient} text-4xl`}>
            {card.emoji}
          </div>
          <h4 className="font-calligraphy text-lg text-ink">{card.name}</h4>
          <p className="font-serif text-xs leading-relaxed text-light-ink mt-1">{card.text}</p>
        </div>
      ))}
    </div>
  );
}

function PoetryMockup() {
  const lines = [
    { text: "春眠不觉晓", emoji: "🌅", gradient: "from-orange-200 to-amber-100", tag: "晨·恬静" },
    { text: "处处闻啼鸟", emoji: "🐦", gradient: "from-emerald-200 to-green-100", tag: "生·灵动" },
    { text: "夜来风雨声", emoji: "🌧️", gradient: "from-blue-300 to-indigo-200", tag: "夜·沉郁" },
    { text: "花落知多少", emoji: "🌸", gradient: "from-pink-200 to-rose-100", tag: "叹·惜春" },
  ];

  return (
    <div className="rounded-2xl border border-rule bg-surface p-6 shadow-lg">
      <div className="flex flex-col items-center gap-4">
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-surface to-xuan-dark/50 p-3"
          >
            <div className="flex items-center gap-3">
              <span className="emoji text-xl">{line.emoji}</span>
              <span className="font-calligraphy text-lg text-ink">{line.text}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-8 w-16 rounded-full bg-gradient-to-br ${line.gradient}`} />
              <span className="font-serif text-xs text-muted">{line.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DialogueMockup() {
  return (
    <div className="rounded-2xl border border-rule bg-surface p-4 shadow-lg">
      <div className="mb-4 border-b border-rule/50 pb-3 text-center">
        <h4 className="font-calligraphy text-lg text-ink">对话 · 孔子</h4>
        <p className="font-serif text-xs text-muted">至圣先师 · 春秋时期</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-indigo/90 px-4 py-3">
            <p className="font-serif text-xs leading-relaxed text-surface">
              子曰学而时习之，不亦说乎。这句话到底是什么意思？
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-xuan-dark px-4 py-3">
            <p className="font-serif text-xs leading-relaxed text-ink">
              此言甚好。吾之本意，并非今人所解的“学了要按时复习”。“习”者，实践也……
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-full border border-rule bg-xuan px-4 py-2">
        <span className="font-serif text-xs text-muted">请输入你的问题……</span>
      </div>
    </div>
  );
}

const features = [
  {
    number: "壹",
    title: "智能双语阅读",
    desc: "AI逐句翻译古文，点击任意字词获得深度解读",
    href: "/reading",
    mockup: <ReadingMockup />,
  },
  {
    number: "贰",
    title: "AI异兽图鉴",
    desc: "AI生成国风神兽插画，收集你的专属图鉴",
    href: "/bestiary",
    mockup: <BestiaryMockup />,
  },
  {
    number: "叁",
    title: "诗境漫游",
    desc: "一首诗，一段沉浸式视觉旅程",
    href: "/poetry",
    mockup: <PoetryMockup />,
  },
  {
    number: "肆",
    title: "古今对话",
    desc: "穿越时空，与孔子李白畅聊古今",
    href: "/dialogue",
    mockup: <DialogueMockup />,
  },
];

export default function Features() {
  return (
    <section className="relative w-full border-t border-ink/[0.06] py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6 space-y-20 md:space-y-28">
        {features.map((feature, index) => {
          const isOdd = index % 2 === 0;
          return (
            <div
              key={index}
              className={`fade-in grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${
                isOdd ? "" : "md:[direction:rtl]"
              }`}
            >
              <div className={`space-y-4 ${isOdd ? "" : "md:[direction:ltr]"}`}>
                <FeatureTag number={feature.number} />
                <h3 className="font-calligraphy text-3xl md:text-4xl text-ink">
                  {feature.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-light-ink max-w-md">
                  {feature.desc}
                </p>
                <Link
                  href={feature.href}
                  className="inline-flex items-center gap-2 font-serif text-sm text-cinnabar hover:underline"
                >
                  探索功能 <span>→</span>
                </Link>
              </div>

              <div className={`${isOdd ? "" : "md:[direction:ltr]"}`}>
                {feature.mockup}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
