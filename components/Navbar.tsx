"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useNavbarVisibility } from "./NavbarVisibilityContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

const navItems = [
  { label: "双语阅读", href: "/reading" },
  { label: "异兽图鉴", href: "/bestiary" },
  { label: "诗境漫游", href: "/poetry" },
  { label: "古今对话", href: "/dialogue" },
  { label: "知识问答", href: "/quiz" },
  { label: "关于", href: "/about" },
];

const secondaryNavItems = [
  { label: "我的笔记", href: "/notes", icon: "notes" as const },
  { label: "我的收藏", href: "/favorites", icon: "favorites" as const },
  { label: "成就之路", href: "/achievements", icon: "achievements" as const },
  { label: "设置", href: "/settings", icon: "settings" as const },
];

/**
 * 主题切换。
 * 对抗式审查修复 hydration 失配：原实现在 useState 初始化器中读 localStorage，
 * SSR 输出（恒浅色）与客户端首帧（深色用户）不一致，触发 React hydration 错误。
 * 现在图标显隐完全由 .dark class 的 CSS 驱动（layout 内联脚本在 hydration 前已设置），
 * React 状态只用于 aria-pressed 等辅助语义，且在挂载后才从 DOM 同步。
 */
function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // 内联脚本已在 hydration 前设置好真实主题，直接读取 DOM
    setIsDark(root.classList.contains("dark"));
    // Listen for external changes (e.g. OS preference)
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    if (next) {
      root.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch {}
    } else {
      root.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch {}
    }
    setIsDark(next);
  };

  return { isDark, toggle };
}

function isInputFocused() {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();
  const { isDark, toggle: toggleTheme } = useTheme();
  const { navbarVisible } = useNavbarVisibility();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const progressBarRef = document.querySelector<HTMLDivElement>("[data-scroll-progress]");
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        const clamped = Math.min(1, Math.max(0, progress));
        // Direct DOM update for progress bar (avoids setState per frame)
        if (progressBarRef) {
          progressBarRef.style.width = `${clamped * 100}%`;
        }
        // Only update scrolled state when threshold changes
        const isScrolled = window.scrollY > 40;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Ctrl/Cmd + K → open search (only when not typing in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        if (isInputFocused()) return;
        e.preventDefault();
        setSearchOpen(true);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 引用计数滚动锁：与搜索弹窗等其他遮罩共存时不互相解除
  useBodyScrollLock(menuOpen);

  // 移动端菜单：ESC 关闭 + 关闭后焦点还原到汉堡按钮（键盘/读屏用户不迷失）
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpenRef = useRef(false);
  useEffect(() => {
    if (!menuOpen) {
      if (menuWasOpenRef.current) {
        menuWasOpenRef.current = false;
        // 仅当焦点落在菜单内部时才还原到汉堡按钮，
        // 避免鼠标/触摸点击链接后产生突兀的焦点移动
        const menuEl = document.getElementById("mobile-menu");
        if (menuEl && menuEl.contains(document.activeElement)) {
          menuButtonRef.current?.focus();
        }
      }
      return;
    }
    menuWasOpenRef.current = true;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navbarVisible === false ? "-translate-y-full" : scrolled
            ? "bg-xuan/95 shadow-sm backdrop-blur-md"
            : "bg-xuan/70 backdrop-blur-sm"
        }`}
        style={{ paddingTop: "max(0px, env(safe-area-inset-top))" }}
      >
        <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center font-calligraphy text-2xl leading-none text-ink hover:text-cinnabar transition-colors"
          >
            古籍焕新
          </Link>

          {/* Center: Nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-full px-3 py-1.5 font-serif text-sm transition-colors ${
                      isActive
                        ? "bg-cinnabar/10 text-cinnabar"
                        : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Search first, then icon links + Theme toggle */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Search trigger - styled as input-like command palette (first) */}
            <button
              type="button"
              aria-label="搜索"
              title="搜索"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/40 px-3.5 py-1.5 font-serif text-xs text-muted hover:border-ink/20 hover:text-light-ink transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>搜索...</span>
              <kbd className="ml-auto rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] leading-none">{isMac ? "⌘K" : "Ctrl+K"}</kbd>
            </button>
            {/* Notes link */}
            <Link
              href="/notes"
              aria-label="我的笔记"
              title="我的笔记"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                pathname === "/notes"
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/10"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
            </Link>
            {/* Favorites link */}
            <Link
              href="/favorites"
              aria-label="我的收藏"
              title="我的收藏"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                pathname === "/favorites"
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/10"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </Link>
            {/* Achievements link */}
            <Link
              href="/achievements"
              aria-label="成就之路"
              title="成就之路"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                pathname === "/achievements"
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/10"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </Link>
            {/* Settings link */}
            <Link
              href="/settings"
              aria-label="设置"
              title="设置"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                pathname === "/settings"
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/10"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            {/* Theme toggle — 双图标 CSS 驱动，hydration 安全无闪烁 */}
            <button
              type="button"
              aria-label="切换深色模式"
              title="切换深色模式"
              aria-pressed={isDark}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors active:scale-[0.97]"
              onClick={toggleTheme}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon-sun h-4 w-4">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon-moon h-4 w-4">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>

          {/* Mobile: theme toggle + search + hamburger — all 44x44px touch targets */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              type="button"
              aria-label="切换深色模式"
              title="切换深色模式"
              aria-pressed={isDark}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors active:scale-[0.97]"
              onClick={toggleTheme}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon-sun h-5 w-5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon-moon h-5 w-5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="搜索"
              title="搜索"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors active:scale-[0.97]"
              onClick={() => setSearchOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="group inline-flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-full hover:bg-cinnabar/10 transition-colors active:scale-[0.97]"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={`block w-5 h-0.5 bg-ink group-hover:bg-cinnabar transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink group-hover:bg-cinnabar transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink group-hover:bg-cinnabar transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Scroll progress bar — 对话详情页使用局部进度条，隐藏全局的 */}
        {pathname !== "/dialogue" && (
        <div
          className="global-scroll-progress absolute left-0 right-0 bottom-0 h-[2px] bg-cinnabar/10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            data-scroll-progress
            className="h-full bg-gradient-to-r from-cinnabar to-gold"
            style={{ width: "0%" }}
          />
        </div>
        )}

        {/* Mobile menu — 使用原生导航列表语义；menu/menuitem 角色要求完整方向键交互，此处并不适用 */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`lg:hidden overflow-y-auto overscroll-contain transition-all duration-300 ${
            menuOpen ? "max-h-[calc(100dvh-4rem)]" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-1 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 bg-xuan/95 backdrop-blur-md lg:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // 菜单关闭时仅视觉裁剪，链接仍在 Tab 序列中，需显式移出
                    tabIndex={menuOpen ? undefined : -1}
                    className={`inline-flex items-center rounded-full px-4 py-2.5 min-h-[44px] font-serif text-base transition-colors ${
                      isActive
                        ? "bg-cinnabar/10 text-cinnabar"
                        : "text-light-ink hover:text-cinnabar hover:bg-cinnabar/5"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {/* Divider */}
            <li className="my-2 h-px w-32 bg-ink/10" aria-hidden="true" />
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={menuOpen ? undefined : -1}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 min-h-[44px] font-serif text-sm transition-colors ${
                      isActive
                        ? "bg-cinnabar/10 text-cinnabar"
                        : "text-muted hover:text-cinnabar hover:bg-cinnabar/5"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon === "notes" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {item.icon === "favorites" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    )}
                    {item.icon === "achievements" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    )}
                    {item.icon === "settings" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
