"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { IconDownload, IconCopy } from "@/components/icons";
import { useToast } from "@/components/Toast";
import ModalCloseButton from "@/components/ModalCloseButton";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

interface QuizShareModalProps {
  open: boolean;
  onClose: () => void;
  score: number;
  total: number;
  ratingTitle: string;
  ratingColor: string;
}

export default function QuizShareModal({
  open,
  onClose,
  score,
  total,
  ratingTitle,
  ratingColor,
}: QuizShareModalProps) {
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const savingRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();

  // 关闭弹窗时强制重置 saving 状态，避免卡在"保存中"
  useEffect(() => {
    if (!open) {
      savingRef.current = false;
      setSaving(false);
    }
  }, [open]);

  // Responsive card scaling
  useEffect(() => {
    if (!open) return;
    const updateScale = () => {
      const maxW = window.innerWidth - 32;
      const maxH = window.innerHeight * 0.85;
      const scaleW = Math.min(1, maxW / 600);
      const scaleH = Math.min(1, maxH / 800);
      setScale(Math.min(scaleW, scaleH));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [open]);

  // Animate in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useBodyScrollLock(open);

  // Focus management
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      const el = previousFocusRef.current;
      previousFocusRef.current = null;
      if (el && document.contains(el)) {
        requestAnimationFrame(() => el.focus());
      }
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const root = overlayRef.current;

    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current || savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    try {
      const card = cardRef.current;

      // 克隆节点到离屏容器，避免修改可见 DOM 导致闪烁/弹窗放大
      const clone = card.cloneNode(true) as HTMLElement;
      const offscreen = document.createElement("div");
      offscreen.style.cssText =
        "position:fixed;left:-99999px;top:0;width:600px;height:800px;overflow:hidden;opacity:0;pointer-events:none;";
      offscreen.appendChild(clone);
      document.body.appendChild(offscreen);

      try {
        const { default: html2canvas } = await import("html2canvas");

        // 超时兜底：30 秒后强制放弃（PC 端 html2canvas 较慢，给足时间）
        const renderScale = window.devicePixelRatio > 1.5 ? 1.5 : 2;
        const canvas = await Promise.race([
          html2canvas(clone, {
            scale: renderScale,
            useCORS: true,
            backgroundColor: "#f5f0e8",
            logging: false,
            width: 600,
            height: 800,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 30000)
          ),
        ]);

        const link = document.createElement("a");
        link.download = `国学问答-${score}分-古籍焕新.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } finally {
        document.body.removeChild(offscreen);
      }
    } catch (err) {
      console.error("Save image failed:", err);
      toast(
        err instanceof Error && err.message === "timeout"
          ? "保存超时，请截图分享"
          : "图片保存失败，请截图分享",
        "error"
      );
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [score, toast]);

  const handleCopyText = useCallback(async () => {
    const text = `我在「国学问答」中答对了 ${score}/${total} 题，获得「${ratingTitle}」称号！来古籍焕新挑战吧！`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy text");
      toast("复制失败，请长按手动复制", "error");
    }
  }, [score, total, ratingTitle, toast]);

  if (!visible) return null;

  const ratio = total > 0 ? score / total : 0;
  const percent = Math.round(ratio * 100);

  // Rating-specific colors
  const accentColor =
    ratio >= 0.8 ? "#b8860b" : ratio >= 0.6 ? "#2c3e6b" : ratio >= 0.4 ? "#6a6050" : "#c84032";

  const modal = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm transition-all duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="分享答题成绩"
    >
      <div
        className={`relative mx-4 flex flex-col items-center transition-all duration-200 ${
          open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Card preview wrapper */}
        <div className="relative overflow-hidden rounded-lg" style={{ width: 600 * scale, height: 800 * scale }}>
          <ModalCloseButton onClick={onClose} variant="light" className="absolute right-3 top-3 z-20" />
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {/* Share card - the element to capture */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-lg"
              style={{
                width: 600,
                height: 800,
                backgroundColor: "#f5f0e8",
                backgroundImage: "linear-gradient(180deg, #f5f0e8 0%, #ede6d8 40%, #f5f0e8 100%)",
                fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", "Songti SC", "SimSun", serif',
              }}
            >
              {/* Top decorative area */}
              <div className="relative" style={{ height: 280 }}>
                {/* Background gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${accentColor}12 0%, ${accentColor}06 60%, transparent 100%)`,
                  }}
                />

                {/* Corner ornaments - top left */}
                <div
                  className="absolute left-8 top-8"
                  style={{
                    width: 36,
                    height: 36,
                    borderTop: "2px solid rgba(200,64,50,0.5)",
                    borderLeft: "2px solid rgba(200,64,50,0.5)",
                  }}
                />
                {/* Corner ornaments - top right */}
                <div
                  className="absolute right-8 top-8"
                  style={{
                    width: 36,
                    height: 36,
                    borderTop: "2px solid rgba(200,64,50,0.5)",
                    borderRight: "2px solid rgba(200,64,50,0.5)",
                  }}
                />

                {/* Title area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    style={{
                      fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                      fontSize: 16,
                      color: "#8b7355",
                      letterSpacing: 6,
                      marginBottom: 16,
                    }}
                  >
                    国学问答
                  </span>
                  {/* Rating title */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                      fontSize: 56,
                      color: accentColor,
                      letterSpacing: 8,
                      textShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {ratingTitle}
                  </h2>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-16" style={{ height: 1, background: "rgba(200,64,50,0.2)" }} />

              {/* Score area */}
              <div
                className="flex flex-col items-center justify-center px-12"
                style={{ height: 300 }}
              >
                {/* Big score */}
                <div className="flex items-baseline gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                      fontSize: 96,
                      color: "#c84032",
                      lineHeight: 1,
                    }}
                  >
                    {score}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                      fontSize: 36,
                      color: "#8b7355",
                    }}
                  >
                    / {total}
                  </span>
                </div>

                {/* Percentage bar */}
                <div className="mt-6 w-full" style={{ maxWidth: 360 }}>
                  <div
                    className="relative overflow-hidden rounded-full"
                    style={{
                      height: 10,
                      backgroundColor: "rgba(26,26,46,0.06)",
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, ${accentColor}, #c84032)`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span
                      style={{
                        fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 13,
                        color: "#8b7355",
                      }}
                    >
                      正确率 {percent}%
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 13,
                        color: "#8b7355",
                      }}
                    >
                      答对 {score} 题 / 答错 {total - score} 题
                    </span>
                  </div>
                </div>

                {/* Encouragement text */}
                <p
                  className="mt-8 text-center"
                  style={{
                    fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 15,
                    color: "#6a6050",
                    lineHeight: 1.8,
                    letterSpacing: 2,
                  }}
                >
                  {ratio >= 0.8
                    ? "博古通今，学养深厚"
                    : ratio >= 0.6
                    ? "学有所成，继续精进"
                    : ratio >= 0.4
                    ? "初窥门径，未来可期"
                    : "再接再厉，勤学不辍"}
                </p>
              </div>

              {/* Bottom section: branding */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-8"
                style={{
                  height: 120,
                  paddingTop: 20,
                  background: "linear-gradient(180deg, rgba(245,240,232,0.98) 0%, rgba(245,240,232,1) 30%)",
                }}
              >
                {/* Corner ornaments - bottom left */}
                <div
                  className="absolute bottom-6 left-8"
                  style={{
                    width: 36,
                    height: 36,
                    borderBottom: "2px solid rgba(200,64,50,0.5)",
                    borderLeft: "2px solid rgba(200,64,50,0.5)",
                  }}
                />
                {/* Corner ornaments - bottom right */}
                <div
                  className="absolute bottom-6 right-8"
                  style={{
                    width: 36,
                    height: 36,
                    borderBottom: "2px solid rgba(200,64,50,0.5)",
                    borderRight: "2px solid rgba(200,64,50,0.5)",
                  }}
                />

                {/* Seal stamp + brand text — centered as a group */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Seal stamp */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 4,
                      border: "2px solid rgba(138,31,42,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(-3deg)",
                      backgroundColor: "rgba(138,31,42,0.08)",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                        fontSize: 13,
                        color: "#8a1f2a",
                        textAlign: "center",
                        lineHeight: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span>古籍</span>
                      <span>焕新</span>
                    </span>
                  </div>

                  {/* Brand text */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                        fontSize: 20,
                        color: "#1a1a2e",
                        letterSpacing: 4,
                      }}
                    >
                      古籍焕新
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 11,
                        color: "#8b7355",
                        marginTop: 4,
                        letterSpacing: 2,
                      }}
                    >
                      AI 驱动的古籍交互阅读平台
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSaveImage}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-cinnabar px-7 py-3 min-h-[48px] font-serif text-base text-surface transition-colors hover:bg-cinnabar/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDownload className="h-5 w-5" />
            {saving ? "保存中..." : "保存图片"}
          </button>
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-7 py-3 min-h-[48px] font-serif text-base text-ink transition-colors hover:bg-xuan-dark/50 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                已复制
              </>
            ) : (
              <>
                <IconCopy className="h-5 w-5" />
                复制文案
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
