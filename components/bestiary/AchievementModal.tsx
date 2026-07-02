"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { beasts, categoryLabels, type BeastCategory } from "@/data/beasts";
import { getCollectedBeasts } from "@/lib/collection";
import { IconTrophy } from "@/components/icons";

interface AchievementModalProps {
 open: boolean;
 onClose: () => void;
}

export default function AchievementModal({ open, onClose }: AchievementModalProps) {
 useEffect(() => {
 if (!open) return;
 const handleEsc = (e: KeyboardEvent) => {
 if (e.key === "Escape") onClose();
 };
 window.addEventListener("keydown", handleEsc);
 return () => window.removeEventListener("keydown", handleEsc);
 }, [open, onClose]);

 const [visible, setVisible] = useState(false);

 useEffect(() => {
   if (open) {
     setVisible(true);
     document.body.style.overflow = "hidden";
   } else {
     document.body.style.overflow = "";
     const timer = setTimeout(() => setVisible(false), 200);
     return () => clearTimeout(timer);
   }
   return () => {
     document.body.style.overflow = "";
   };
 }, [open]);

 if (!visible) return null;

 const collected = getCollectedBeasts();
 const counts = beasts.reduce<Record<BeastCategory, number>>(
 (acc, beast) => {
 acc[beast.category] += 1;
 return acc;
 },
 { beast: 0, bird: 0, fish: 0, serpent: 0 }
 );
 const collectedCounts = beasts.reduce<Record<BeastCategory, number>>(
 (acc, beast) => {
 if (collected.includes(beast.id)) acc[beast.category] += 1;
 return acc;
 },
 { beast: 0, bird: 0, fish: 0, serpent: 0 }
 );

 const content = (
 <div
 className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm transition-all duration-200 ${
   open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
 }`}
 onClick={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div
 className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-xuan to-xuan-dark p-8 text-center shadow-2xl transition-all duration-200 ${
   open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
 }`}
 role="dialog"
 aria-modal="true"
 aria-label="全收集成就"
 >
 {/* Decorative gold glow */}
 <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
 <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />

 {/* Trophy icon */}
      <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 text-white shadow-lg animate-bounce">
        <IconTrophy className="h-10 w-10" />
      </div>

  <h2 className="font-calligraphy text-3xl text-ink md:text-4xl animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
 图鉴大师
 </h2>
 <p className="mt-2 font-serif text-base text-muted animate-fade-in" style={{ animationDelay: "0.35s", animationFillMode: "both" }}>
 恭喜！你已收集全部 {beasts.length} 只异兽！
 </p>
 <p className="mt-1 font-handwriting text-sm text-cinnabar animate-fade-in" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
 “博物君子，通识万物”
 </p>

 {/* Category stats */}
 <div className="relative mt-6 grid grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
 {(Object.keys(counts) as BeastCategory[]).map((cat) => (
 <div
 key={cat}
 className="rounded-xl bg-surface/60 p-3"
 >
 <p className="font-calligraphy text-xl text-cinnabar">
 {collectedCounts[cat]}
 </p>
 <p className="mt-1 font-serif text-xs text-muted">
 {categoryLabels[cat]}
 </p>
 </div>
 ))}
 </div>

 <button
 onClick={onClose}
 className="relative mt-8 w-full rounded-xl bg-cinnabar py-3 font-serif text-base text-white shadow-md transition-all hover:bg-cinnabar/90 active:scale-[0.98]"
 >
 太棒了！
 </button>
 </div>
 </div>
 );

 if (typeof document === "undefined") return null;
 return createPortal(content, document.body);
}
