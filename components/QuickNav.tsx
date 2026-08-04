"use client";

import { useEffect, useState, useCallback } from "react";

const sections = [
  { id: "checkin", label: "签到" },
  { id: "continue", label: "继续阅读" },
  { id: "daily", label: "每日推荐" },
  { id: "features", label: "功能" },
  { id: "quiz", label: "问答" },
  { id: "stats", label: "数据" },
  { id: "achievements", label: "成就" },
];

export default function QuickNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = useCallback(() => {
    // Show after scrolling past 70% of hero height
    setVisible(window.scrollY > window.innerHeight * 0.7);

    // Find active section based on scroll position
    const navbarAndNavHeight = 112; // navbar (64px) + quicknav (~48px)
    let current = "";
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section is "active" if its top has passed the navbar+quicknav bar
      if (rect.top <= navbarAndNavHeight + 20) {
        current = section.id;
      }
    }
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarAndNavHeight = 112;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarAndNavHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 border-b border-ink/5 bg-xuan/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`flex-shrink-0 rounded-full px-3 py-1 font-serif text-xs transition-colors ${
                activeSection === section.id
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-muted hover:text-light-ink hover:bg-ink/5"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
