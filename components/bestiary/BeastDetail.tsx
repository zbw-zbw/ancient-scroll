"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { Beast } from "@/data/beasts";
import { beasts, categoryLabels } from "@/data/beasts";
import {
  IconClose,
  IconBookOpen,
  IconHeart,
  IconHeartOutline,
} from "@/components/icons";
import { chapters } from "@/data/shanhaijing";
import AiDescribeButton from "./AiDescribeButton";

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
  beast,
  collected,
  collectedCount,
  currentDescription,
  onClose,
  onToggleCollect,
  onDescription,
  onShare,
}: BeastDetailProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (beast) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [beast]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (!beast || !mounted || !modalRef.current) return;

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
  }, [beast, mounted]);

  if (!beast) return null;

  const content = (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 backdrop-blur-sm transition-opacity duration-300 md:items-center ${mounted ? "opacity-100" : "opacity-0"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-xuan shadow-2xl transition-all duration-300 md:max-w-[640px] md:rounded-2xl ${
          mounted ? "translate-y-0" : "translate-y-8"
        }`}
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
              href={`/reading?chapter=${chapters.find((c) => c.name === beast.chapter)?.id || "nanshan"}`}
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

          {/* Share button - uses onShare prop to delegate to BestiaryClient */}
          {onShare && (
            <button
              onClick={() => onShare(beast)}
              className="mb-3 w-full rounded-xl border border-ink/10 py-3 font-serif text-base text-light-ink transition-all hover:bg-ink/5 active:scale-[0.98] flex items-center justify-center gap-2"
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
            className={`w-full rounded-xl py-3 min-h-[44px] font-serif text-base transition-all active:scale-[0.98] ${
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
