import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-xuan overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-ink/[0.03] to-transparent blur-3xl" />
        <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-cinnabar/[0.05] blur-2xl" />
        <div className="absolute bottom-20 left-20 h-24 w-24 rounded-full bg-gold/[0.05] blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Chinese numeral decoration */}
        <div className="font-calligraphy text-[120px] leading-none text-ink/[0.06] select-none md:text-[160px]" aria-hidden="true">
          四零四
        </div>

        {/* Main heading */}
        <h1 className="mt-[-2rem] font-calligraphy text-5xl text-ink md:text-6xl md:mt-[-3rem]">
          此卷尚未收录
        </h1>

        <p className="mx-auto mt-6 max-w-sm font-serif text-base leading-relaxed text-muted">
          你所寻找的篇章，似乎迷失在了古籍的尘埃之中。<br />
          不如回到首页，开启一段新的探索之旅。
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-cinnabar px-7 py-3 font-serif text-sm text-white transition-all hover:bg-cinnabar/90 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m3 9 9-7 9 7" />
              <path d="M9 22V12h6v10" />
            </svg>
            返回首页
          </Link>
          <Link
            href="/reading"
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 px-7 py-3 font-serif text-sm text-light-ink transition-colors hover:border-cinnabar/30 hover:text-cinnabar"
          >
            去阅读山海经
          </Link>
        </div>

        {/* Decorative seal */}
        <div className="mt-16 inline-flex h-16 w-16 items-center justify-center rounded-md border-2 border-cinnabar/20 text-cinnabar/30 transition-colors hover:border-cinnabar/40 hover:text-cinnabar/50" aria-hidden="true">
          <span className="font-calligraphy text-lg rotate-[-8deg]">卷</span>
        </div>
      </div>
    </main>
  );
}
