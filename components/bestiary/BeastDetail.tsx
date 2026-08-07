"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { Beast } from "@/data/beasts";
import { beasts, categoryLabels, categoryIconNames } from "@/data/beasts";
import { beastImageExists } from "@/lib/knownImages";
import {
  IconBookOpen,
  IconHeart,
  IconHeartOutline,
  IconPaw,
  IconBird,
  IconFish,
  IconSnake,
  IconGod,
  IconArrowRight,
} from "@/components/icons";
import { chapters } from "@/data/shanhaijing";
import ModalCloseButton from "@/components/ModalCloseButton";
import AiDescribeButton from "./AiDescribeButton";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

interface BeastDetailProps {
  beast: Beast | null;
  collected: boolean;
  collectedCount: number;
  currentDescription: string;
  onClose: () => void;
  onToggleCollect: (id: string) => void;
  onDescription: (description: string) => void;
  onShare?: (beast: Beast) => void;
}

export default function BeastDetail({
  beast: beastProp,
  collected,
  collectedCount,
  currentDescription,
  onClose,
  onToggleCollect,
  onDescription,
  onShare,
}: BeastDetailProps) {
  const [mounted, setMounted] = useState(false);
  const [displayBeast, setDisplayBeast] = useState<Beast | null>(null);
  const [imgError, setImgError] = useState(false);
  const imgAvailable = displayBeast ? beastImageExists(displayBeast.imagePath) : false;
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 切换异兽时重置图片错误状态
  useEffect(() => {
    setImgError(false);
  }, [beastProp?.id]);

  // 引用计数滚动锁：使用 displayBeast 确保退出动画期间仍保持锁定
  useBodyScrollLock(!!displayBeast);

  // 入场/退场动画控制：beast 变化时更新 displayBeast，退出时延迟卸载以播放动画
  useEffect(() => {
    if (beastProp) {
      // 打开或切换：立即更新显示数据，下一帧触发入场动画
      if (closingTimerRef.current) {
        clearTimeout(closingTimerRef.current);
        closingTimerRef.current = null;
      }
      setDisplayBeast(beastProp);
      previousFocusRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => setMounted(true));
    } else if (displayBeast) {
      // 关闭：触发退场动画，延迟 300ms 后卸载
      setMounted(false);
      closingTimerRef.current = setTimeout(() => {
        setDisplayBeast(null);
        closingTimerRef.current = null;
        // 退场动画完成后还原焦点
        previousFocusRef.current?.focus?.();
        previousFocusRef.current = null;
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beastProp]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    };
  }, []);

  // ESC to close
  useEffect(() => {
    if (!beastProp) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // 嵌套弹窗（分享卡片）打开时，由上层弹窗消费 ESC，详情弹窗不响应
      if (e.defaultPrevented) return;
      onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [beastProp, onClose]);

  // Focus trap
  useEffect(() => {
    if (!beastProp || !mounted || !modalRef.current) return;

    const modal = modalRef.current;

    // Set initial focus: prefer close button, otherwise first focusable element
    const closeBtn = modal.querySelector('[aria-label="关闭"]') as HTMLElement | null;
    const initialFocusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (initialFocusable.length > 0) {
      (closeBtn || initialFocusable[0]).focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const modal = modalRef.current;
      if (!modal) return;
      // Real-time query each time Tab is pressed
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [beastProp, mounted]);

  if (!displayBeast) return null;
  const beast = displayBeast;

  const content = (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`relative flex h-full max-h-full w-full flex-col overflow-hidden bg-xuan shadow-2xl transition-all duration-300 rounded-none md:h-auto md:max-h-[90vh] md:max-w-[640px] md:rounded-2xl ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={`${beast.name}详情`}
      >
        {/* Top image banner - full-bleed cover */}
        <div className="relative h-[300px] flex-shrink-0 overflow-hidden md:h-[340px]">
          {imgAvailable && !imgError ? (
            <Image
              src={beast.imagePath}
              alt={beast.name}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover img-placeholder"
              loading="eager"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${beast.gradient[0]}, ${beast.gradient[1]})`,
              }}
            >
              {/* 对角线装饰 */}
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 49%, rgba(255,255,255,0.04) 50%, transparent 51%)" }} />
              {/* 水墨大字水印 */}
              <span
                className="font-calligraphy text-8xl text-white/15 select-none"
                aria-hidden="true"
              >
                {beast.name}
              </span>
              {/* 分类图标 */}
              <span className="absolute bottom-4 right-4 text-white/40" aria-hidden="true">
                {categoryIconNames[beast.category] === "IconPaw" ? <IconPaw className="h-6 w-6" /> :
                 categoryIconNames[beast.category] === "IconBird" ? <IconBird className="h-6 w-6" /> :
                 categoryIconNames[beast.category] === "IconFish" ? <IconFish className="h-6 w-6" /> :
                 categoryIconNames[beast.category] === "IconSnake" ? <IconSnake className="h-6 w-6" /> :
                 <IconGod className="h-6 w-6" />}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-xuan/40 via-transparent to-transparent" />

          <ModalCloseButton onClick={onClose} variant="light" />
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
          <div className="mb-6 mt-4">
            <Link
              href={`/reading?chapter=${chapters.find((c) => c.name === beast.chapter)?.id || "nanshan"}&beast=${encodeURIComponent(beast.name)}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border border-cinnabar/30 bg-cinnabar/5 px-4 py-2.5 font-serif text-sm text-cinnabar transition-all duration-200 hover:border-cinnabar/50 hover:bg-cinnabar/10 active:scale-[0.98]"
            >
              <IconBookOpen className="h-4 w-4" />
              去读这段原文
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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

          {/* AI 重新解读 */}
          <div className="mb-6">
            <AiDescribeButton
              name={beast.name}
              originalText={beast.originalText}
              currentDescription={currentDescription}
              onDescription={onDescription}
            />
          </div>

          {/* Share button - uses onShare prop to delegate to BestiaryClient */}
          {onShare && (
            <button
              onClick={() => onShare(beast)}
              className="mb-3 w-full rounded-xl border border-ink/10 py-3 font-serif text-base text-light-ink transition-all hover:bg-ink/5 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.59 13.51 6.83 3.98" />
                <path d="M15.41 6.51 8.59 10.49" />
              </svg>
              分享异兽
            </button>
          )}

          {/* Large collect button */}
          <button
            onClick={() => onToggleCollect(beast.id)}
            className={`w-full rounded-xl py-3 min-h-[44px] font-serif text-base transition-all active:scale-95 ${
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
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
