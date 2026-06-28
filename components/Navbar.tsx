"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
 { label: "双语阅读", href: "/reading" },
 { label: "异兽图鉴", href: "/bestiary" },
 { label: "诗境漫游", href: "/poetry" },
 { label: "古今对话", href: "/dialogue" },
];

export default function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const pathname = usePathname();

 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 40);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
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

 {/* Desktop nav */}
 <ul className="hidden md:flex items-center gap-8">
 {navItems.map((item) => {
 const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
 return (
 <li key={item.href}>
 <Link
 href={item.href}
 className={`font-serif text-sm transition-colors ${
              isActive ? "text-cinnabar" : "text-light-ink hover:text-cinnabar"
            }`}
 >
 {item.label}
 </Link>
 </li>
 );
 })}
 </ul>

 {/* Mobile hamburger */}
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
 className="font-serif text-base text-light-ink hover:text-cinnabar transition-colors"
 onClick={() => setMenuOpen(false)}
 >
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </header>
 );
}
