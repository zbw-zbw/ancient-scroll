const painPoints = [
 {
 icon: (
 <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
 {/* Scroll / bamboo slip icon */}
 <rect x="10" y="6" width="28" height="36" rx="2" />
 <line x1="16" y1="6" x2="16" y2="42" />
 <line x1="24" y1="6" x2="24" y2="42" />
 <line x1="32" y1="6" x2="32" y2="42" />
 <line x1="10" y1="14" x2="38" y2="14" />
 <line x1="10" y1="22" x2="38" y2="22" />
 <line x1="10" y1="30" x2="38" y2="30" />
 </svg>
 ),
 title: "读不懂",
 desc: "文言文像外语一样，逐字查字典太痛苦",
 },
 {
 icon: (
 <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
 {/* Empty picture frame icon */}
 <rect x="6" y="10" width="36" height="28" rx="2" />
 <line x1="6" y1="18" x2="42" y2="18" />
 <circle cx="20" cy="28" r="4" />
 <path d="M28 32 L32 24 L36 28" />
 </svg>
 ),
 title: "没画面",
 desc: "九尾狐长什么样？想象不出古文描述的场景",
 },
 {
 icon: (
 <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
 {/* Closed book icon */}
 <path d="M8 10 C8 10, 16 6, 24 10 C32 6, 40 10, 40 10 V38 C40 38, 32 34, 24 38 C16 34, 8 38, 8 38 V10 Z" />
 <line x1="24" y1="10" x2="24" y2="38" />
 </svg>
 ),
 title: "没兴趣",
 desc: "干巴巴的文字翻译，完全感受不到古文之美",
 },
];

export default function PainPoints() {
 return (
 <section className="fade-in relative w-full py-16 md:py-24">
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
 <blockquote className="relative mb-14 bg-surface/50 px-6 py-6 md:px-10 md:py-8">
 <span className="pointer-events-none absolute left-3 top-2 font-serif text-6xl text-cinnabar/10 select-none">
 &ldquo;
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
 <div className="mb-4 text-cinnabar">{item.icon}</div>
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
