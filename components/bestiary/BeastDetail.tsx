"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Beast } from "@/data/beasts";
import { beasts, categoryLabels } from "@/data/beasts";
import {
  IconClose,
  IconBookOpen,
  IconHeart,
  IconHeartOutline,
} from "@/components/icons";
import AiDescribeButton from "./AiDescribeButton";

const chapterMap: Record<string, string> = {
 "南山经": "nanshan",
 "西山经": "xishan",
 "北山经": "beishan",
 "东山经": "dongshan",
 "海内经": "hainei",
};

interface BeastDetailProps {
 beast: Beast | null;
 collected: boolean;
 collectedCount: number;
 currentDescription: string;
 onClose: () => void;
 onToggleCollect: (id: string) => void;
 onDescription: (description: string) => void;
}

export default function BeastDetail({
 beast,
 collected,
 collectedCount,
 currentDescription,
 onClose,
 onToggleCollect,
 onDescription,
}: BeastDetailProps) {
 useEffect(() => {
 if (beast) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }
 return () => {
 document.body.style.overflow = "";
 };
 }, [beast]);

 useEffect(() => {
 const handleEsc = (e: KeyboardEvent) => {
 if (e.key === "Escape") onClose();
 };
 window.addEventListener("keydown", handleEsc);
 return () => window.removeEventListener("keydown", handleEsc);
 }, [onClose]);

 if (!beast) return null;

 const content = (
 <div
 className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 backdrop-blur-sm transition-opacity duration-300 md:items-center"
 onClick={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div
 className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-xuan shadow-2xl transition-all duration-300 md:max-w-[640px] md:rounded-2xl`}
 role="dialog"
 aria-modal="true"
 aria-label={`${beast.name}详情`}
 >
 {/* Top image banner - full-bleed cover */}
 <div className="relative h-[300px] flex-shrink-0 overflow-hidden md:h-[340px]">
 <Image
 src={beast.imagePath}
 alt={beast.name}
 fill
 sizes="(max-width: 768px) 100vw, 640px"
 className="object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-xuan/40 via-transparent to-transparent" />

 <button
 onClick={onClose}
 className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/20 text-white transition-colors hover:bg-ink/30"
 aria-label="关闭"
 >
 <IconClose className="h-4 w-4" />
 </button>
 </div>

 {/* Scrollable content */}
 <div className="flex-1 overflow-y-auto p-6">
 {/* Title */}
 <div className="mb-4 flex flex-wrap items-center gap-3">
 <h2 className="font-calligraphy text-3xl text-ink md:text-4xl">
 {beast.name}
 </h2>
 <span className="rounded-full bg-cinnabar/10 px-3 py-1 font-serif text-sm text-cinnabar">
 {categoryLabels[beast.category]}
 </span>
 <span className="font-serif text-sm text-muted">{beast.chapter}</span>
 </div>

 {/* Original text quote */}
 <blockquote className="mb-3 rounded-lg bg-xuan-dark/60 p-4">
 <p className="font-serif text-base leading-relaxed text-ink">
 {beast.originalText}
 </p>
 </blockquote>
 <div className="mb-5">
 <Link
          href={`/reading?chapter=${chapterMap[beast.chapter] || "nanshan"}`}
          onClick={onClose}
          className="inline-flex items-center gap-1 font-serif text-xs text-cinnabar hover:underline"
        >
          <IconBookOpen className="h-3.5 w-3.5" /> 在原文中阅读
        </Link>
 </div>

 {/* Translation */}
 <div className="mb-5">
 <p className="mb-1 font-serif text-xs text-muted">白话翻译</p>
 <p className="font-serif text-sm leading-relaxed text-light-ink">
 {beast.translation}
 </p>
 </div>

 {/* Traits */}
 <div className="mb-5 flex flex-wrap gap-2">
 {beast.traits.map((trait) => (
 <span
 key={trait}
 className="rounded-full bg-cinnabar/10 px-3 py-1 font-serif text-xs text-cinnabar"
 >
 {trait}
 </span>
 ))}
 </div>

 {/* Description */}
 <div className="mb-6">
 <p className="mb-2 font-serif text-xs text-muted">现代描述</p>
 <p className="font-serif text-base leading-relaxed text-light-ink">
 {currentDescription}
 </p>
 </div>

 {/* AI button */}
 <div className="mb-6">
 <AiDescribeButton
 name={beast.name}
 originalText={beast.originalText}
 currentDescription={currentDescription}
 onDescription={onDescription}
 />
 </div>

 {/* Large collect button */}
 <button
 onClick={() => onToggleCollect(beast.id)}
 className={`w-full rounded-xl py-3 font-serif text-base transition-all active:scale-[0.98] ${
 collected
 ? "bg-cinnabar/10 text-cinnabar"
 : "bg-cinnabar text-white shadow-md hover:bg-cinnabar/90"
 }`}
 >
 <span className={`mr-1 inline-block ${collected ? "animate-heart-beat" : ""}`}>
        {collected ? (
          <IconHeart className="h-4 w-4" />
        ) : (
          <IconHeartOutline className="h-4 w-4" />
        )}
      </span>
      {collected ? `已收入图鉴 · ${collectedCount}/${beasts.length}` : "收入图鉴"}
    </button>
    <p className="mt-2 text-center font-serif text-xs text-muted">
      {collected
        ? `已收入图鉴 · ${collectedCount}/${beasts.length}`
        : "收入图鉴 — 收集所有异兽解锁成就"}
    </p>
 </div>
 </div>
 </div>
 );

 if (typeof document === "undefined") return null;
 return createPortal(content, document.body);
}
