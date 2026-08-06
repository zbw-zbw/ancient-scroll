import Link from "next/link";

const navItems = [
  { label: "双语阅读", href: "/reading" },
  { label: "异兽图鉴", href: "/bestiary" },
  { label: "诗境漫游", href: "/poetry" },
  { label: "古今对话", href: "/dialogue" },
];

const personalItems = [
  { label: "我的笔记", href: "/notes" },
  { label: "我的收藏", href: "/favorites" },
  { label: "成就之路", href: "/achievements" },
  { label: "设置", href: "/settings" },
];

export default function Footer() {
  return (
    <footer className="relative w-full py-8 md:py-12">
      {/* Decorative top line */}
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="h-px w-full bg-seal-red/20" />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 md:px-6 pt-6 md:pt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Left column - Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-seal-bg rotate-[-3deg] shadow-sm">
              <span className="font-calligraphy text-center text-base leading-tight text-seal-red">
                古籍
                <br />
                焕新
              </span>
            </div>
            <p className="mt-3 font-calligraphy text-base text-ink leading-tight text-center md:text-left">
              为最古老的文字
              <br />
              造一个最现代的家
            </p>
          </div>

          {/* Middle column - Navigation (two sub-columns) */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-x-6 md:gap-x-10">
              {/* Left sub-column: core feature pages */}
              <ul className="flex flex-col items-center gap-2 md:items-start">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-sm text-light-ink hover:text-cinnabar transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Right sub-column: personal center pages */}
              <ul className="flex flex-col items-center gap-2 md:items-start">
                {personalItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-sm text-muted hover:text-cinnabar transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Brand tagline on desktop */}
          <div className="hidden md:flex flex-col items-end justify-center">
            <span className="font-serif text-xs tracking-widest text-muted">
              古籍活化 · 数字传承
            </span>
          </div>
        </div>

        {/* Bottom bar: tech stack + GitHub */}
        <div className="mt-6 flex items-center justify-center gap-3 border-t border-ink/5 pt-4 md:justify-between">
          <p className="font-serif text-xs text-muted">
            Powered by Next.js & DeepSeek AI
          </p>
          <a
            href="https://github.com/zbw-zbw/ancient-scroll"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-1.5 font-serif text-xs text-muted hover:text-cinnabar transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
