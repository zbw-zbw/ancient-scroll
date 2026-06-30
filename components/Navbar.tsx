"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const navItems = [
 { label: "双语阅读", href: "/reading" },
 { label: "异兽图鉴", href: "/bestiary" },
 { label: "诗境漫游", href: "/poetry" },
 { label: "古今对话", href: "/dialogue" },
];

function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return { isDark, toggle };
}

export default function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const pathname = usePathname();
 const { isDark, toggle: toggleTheme } = useTheme();

 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 40);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 // Ctrl/Cmd + K → open search
 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     if ((e.metaKey || e.ctrlKey) && e.key === "k") {
       e.preventDefault();
       setSearchOpen(true);
       setMenuOpen(false);
     }
   };
   document.addEventListener("keydown", handleKeyDown);
   return () => document.removeEventListener("keydown", handleKeyDown);
 }, []);

 return (
 <>
 <header
 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
 scrolled
 ? "bg-xuan/95 shadow-sm backdrop-blur-md"
 : "bg-xuan/70 backdrop-blur-sm"
 }`}
 >
 <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
 <Link
 href="/"
 className="flex items-center font-calligraphy text-2xl leading-none text-ink hover:text-cinnabar transition-colors"
 >
 古籍焕新
 </Link>

 {/* Center: Nav links */}
 <ul className="hidden md:flex items-center gap-8">
 {navItems.map((item) => {
 const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
 return (
 <li key={item.href}>
 <Link
 href={item.href}
 className={`font-serif text-sm transition-colors ${
              isActive
                ? "rounded-full bg-cinnabar/10 px-3 py-1 text-cinnabar"
                : "text-light-ink hover:text-cinnabar"
            }`}
 >
 {item.label}
 </Link>
 </li>
 );
 })}
 </ul>

 {/* Right: Search + Theme toggle */}
 <div className="hidden md:flex items-center gap-3">
   {/* Search trigger - styled as input-like command palette */}
   <button
     type="button"
     aria-label="搜索"
     className="flex items-center gap-2 rounded-full border border-ink/10 bg-surface/40 px-3.5 py-1.5 font-serif text-xs text-muted hover:border-ink/20 hover:text-light-ink transition-colors"
     onClick={() => setSearchOpen(true)}
   >
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
       <circle cx="11" cy="11" r="8" />
       <path d="m21 21-4.3-4.3" />
     </svg>
     搜索...
     <kbd className="ml-4 rounded bg-ink/5 px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
   </button>
   <button
     type="button"
     aria-label="切换深色模式"
     className="flex items-center justify-center w-9 h-9 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors"
     onClick={toggleTheme}
   >
     {isDark ? (
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
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
     ) : (
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
       </svg>
     )}
   </button>
 </div>

 {/* Mobile theme toggle + search + hamburger */}
 <div className="flex md:hidden items-center gap-2">
   <button
     type="button"
     aria-label="切换深色模式"
     className="flex items-center justify-center w-9 h-9 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors"
     onClick={toggleTheme}
   >
     {isDark ? (
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
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
     ) : (
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
       </svg>
     )}
   </button>
   <button
     type="button"
     aria-label="搜索"
     className="flex items-center justify-center w-9 h-9 rounded-full text-light-ink hover:text-cinnabar hover:bg-cinnabar/10 transition-colors"
     onClick={() => setSearchOpen(true)}
   >
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
       <circle cx="11" cy="11" r="8" />
       <path d="m21 21-4.3-4.3" />
     </svg>
   </button>
 <button
 type="button"
 aria-label="切换菜单"
 className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
 onClick={() => setMenuOpen((v) => !v)}
 >
 <span
 className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${
 menuOpen ? "rotate-45 translate-y-2" : ""
 }`}
 />
 <span
 className={`block w-6 h-0.5 bg-ink transition-opacity duration-300 ${
 menuOpen ? "opacity-0" : ""
 }`}
 />
 <span
 className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${
 menuOpen ? "-rotate-45 -translate-y-2" : ""
 }`}
 />
 </button>
 </div>
 </nav>

 {/* Mobile menu */}
 <div
 className={`md:hidden overflow-hidden transition-all duration-300 ${
 menuOpen ? "max-h-80" : "max-h-0"
 }`}
 >
 <ul className="flex flex-col items-center gap-4 pb-6 pt-2 bg-xuan/95 backdrop-blur-md">
 {navItems.map((item) => (
 <li key={item.href}>
 <Link
 href={item.href}
 className={`font-serif text-base transition-colors ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "rounded-full bg-cinnabar/10 px-3 py-1 text-cinnabar"
                  : "text-light-ink hover:text-cinnabar"
              }`}
              onClick={() => setMenuOpen(false)}
 >
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </header>

 <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
 </>
 );
}
