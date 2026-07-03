"use client";

import { useState, useEffect } from "react";
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

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm shadow-md border border-ink/10 text-light-ink hover:text-cinnabar hover:border-cinnabar/30 transition-all duration-300 active:scale-90 md:bottom-8 md:right-8 md:h-11 md:w-11 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  return (
    <>
      <BackToTop />
      <footer className="relative w-full py-16 md:py-24">
        {/* Decorative top line */}
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="h-px w-full bg-seal-red/20" />
        </div>

        <div className="mx-auto max-w-[1100px] px-6 pt-10">
          {/* Three-column layout on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {/* Left column - Brand */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-20 w-20 items-center justify-center rounded-sm bg-seal-bg rotate-[-3deg] shadow-sm">
                <span className="font-calligraphy text-center text-lg leading-tight text-seal-red">
                  古籍
                  <br />
                  焕新
                </span>
              </div>
              <p className="mt-4 font-calligraphy text-lg text-ink leading-tight text-center md:text-left">
                为最古老的文字
                <br />
                造一个最现代的家
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface/60 px-3 py-1">
                <span className="font-serif text-xs tracking-widest text-muted">
                  古籍活化 · 数字传承
                </span>
              </div>
            </div>

            {/* Middle column - Navigation */}
            <div className="flex flex-col items-center">
              <h3 className="font-calligraphy text-base text-ink mb-4">导航</h3>
              <ul className="flex flex-col items-center gap-2.5">
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
                <li className="mt-1 h-px w-12 bg-ink/10" />
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

            {/* Right column - Info */}
            <div className="flex flex-col items-center md:items-end">
              <h3 className="font-calligraphy text-base text-ink mb-4">关于</h3>
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-surface/60 px-3 py-1 font-serif text-xs text-muted border border-ink/5">
                    Next.js
                  </span>
                  <span className="rounded-full bg-surface/60 px-3 py-1 font-serif text-xs text-muted border border-ink/5">
                    DeepSeek AI
                  </span>
                </div>
                <a
                  href="https://github.com/zbw-zbw/ancient-scroll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-serif text-sm text-light-ink hover:text-cinnabar transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 translate-y-px"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <span className="inline-flex items-center gap-1.5 font-serif text-xs text-muted">
                  <kbd className="bg-ink/5 rounded px-1.5 py-0.5 text-xs font-mono border border-ink/10">
                    {isMac ? "⌘K" : "Ctrl+K"}
                  </kbd>
                  搜索
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 font-serif text-xs text-muted md:flex-row">
            <span>2026 · 06</span>
            <span>让千年文字"活"起来</span>
          </div>
        </div>
      </footer>
    </>
  );
}
