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

export default function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const pathname = usePathname();

 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 40);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
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

 {/* Search button + Desktop nav */}
 <div className="hidden md:flex items-center gap-4">
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
   <ul className="flex items-center gap-8">
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
 </div>

 {/* Mobile search + hamburger */}
 <div className="flex md:hidden items-center gap-2">
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
