"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { Beast } from "@/data/beasts";
import { IconDownload, IconCopy, IconPaw } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { beastImageExists } from "@/lib/knownImages";
import ModalCloseButton from "@/components/ModalCloseButton";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

interface BeastShareModalProps {
  open: boolean;
  onClose: () => void;
  beast: Beast | null;
}

export default function BeastShareModal({
  open,
  onClose,
  beast,
}: BeastShareModalProps) {
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const [imgError, setImgError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();

  // Reset image error when beast changes
  useEffect(() => {
    setImgError(false);
  }, [beast]);

  // Responsive card scaling
  useEffect(() => {
    if (!open) return;
    const updateScale = () => {
      const maxW = window.innerWidth - 32; // 16px padding each side
      const maxH = window.innerHeight * 0.85;
      const scaleW = Math.min(1, maxW / 750);
      const scaleH = Math.min(1, maxH / 1000);
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

  // 引用计数滚动锁：作为嵌套弹窗叠在详情弹窗上时，关闭不会误解除外层的锁
  useBodyScrollLock(open);

  // 打开时保存焦点，关闭时还原（通常还原到详情弹窗的“分享异兽”按钮）
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
      if (e.key === "Escape") {
        // preventDefault 标记事件已被本层消费：
        // 下层的 BeastDetail 通过 e.defaultPrevented 判断后不再响应，避免两层同时关闭
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // 焦点陷阱 + 初始焦点：键盘用户 Tab 不会跑出弹窗
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
    if (!cardRef.current || !beast) return;
    setSaving(true);
    try {
      const card = cardRef.current;
      const scaleWrapper = card.parentElement;      // transform: scale() 的那层
      const clipWrapper = scaleWrapper?.parentElement; // overflow: hidden 的那层

      // 临时移除缩放和裁剪，让 html2canvas 捕获完整 750x1000
      const origTransform = scaleWrapper?.style.transform || "";
      const origClipW = clipWrapper?.style.width || "";
      const origClipH = clipWrapper?.style.height || "";
      const origClipMaxH = clipWrapper?.style.maxHeight || "";
      const origOverflow = clipWrapper?.style.overflow || "";

      if (scaleWrapper) scaleWrapper.style.transform = "none";
      if (clipWrapper) {
        clipWrapper.style.width = "750px";
        clipWrapper.style.height = "1000px";
        clipWrapper.style.maxHeight = "none";
        clipWrapper.style.overflow = "visible";
      }

      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        width: 750,
        height: 1000,
      });

      // 恢复缩放和裁剪
      if (scaleWrapper) scaleWrapper.style.transform = origTransform;
      if (clipWrapper) {
        clipWrapper.style.width = origClipW;
        clipWrapper.style.height = origClipH;
        clipWrapper.style.maxHeight = origClipMaxH;
        clipWrapper.style.overflow = origOverflow;
      }

      const link = document.createElement("a");
      link.download = `${beast.name}-山海经异兽.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Save image failed:", err);
      toast("图片保存失败，请截图分享", "error");
    } finally {
      setSaving(false);
    }
  }, [beast, toast]);

  const handleCopyText = useCallback(async () => {
    if (!beast) return;
    const text = `${beast.name}\n山海经 · ${beast.chapter}\n\n${beast.originalText}\n\n${beast.translation}\n\n—— 古籍焕新 · 山海经异兽图鉴`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 复制失败（剪贴板权限被拒 / 非安全上下文）必须告知用户，而非静默失败
      console.error("Failed to copy text");
      toast("复制失败，请长按手动复制", "error");
    }
  }, [beast, toast]);

  if (!visible || !beast) return null;

  // Build theme gradient from beast gradient colors
  const [colorA, colorB] = beast.gradient;
  const colorATint = colorA + "25";
  const colorBTint = colorB + "15";
  const accentColor = "rgba(200,64,50,0.6)";

  const modal = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm transition-all duration-200 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="分享异兽卡片"
    >
      <div
        className={`relative mx-4 flex flex-col items-center transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Card preview wrapper — 使用缩放后的精确尺寸 */}
        <div className="relative overflow-hidden rounded-lg" style={{ width: 750 * scale, height: 1000 * scale }}>
          <ModalCloseButton onClick={onClose} variant="light" className="absolute right-3 top-3 z-20" />
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {/* Share card - the element to capture */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-lg"
              style={{
                width: 750,
                height: 1000,
                backgroundColor: "#faf7f0",
                backgroundImage: `linear-gradient(180deg, ${colorATint} 0%, ${colorBTint} 45%, #faf7f0 100%)`,
                fontFamily:
                  'var(--font-noto-serif-sc), "Noto Serif SC", "Songti SC", "SimSun", serif',
              }}
            >
              {/* Top area: beast image with dark overlay */}
              <div className="relative overflow-hidden" style={{ height: 380 }}>
                {!imgError && beastImageExists(beast.imagePath) ? (
                  <img
                    src={beast.imagePath}
                    alt={beast.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${beast.gradient[0]}, ${beast.gradient[1]})`,
                    }}
                  >
                    <span
                      className="font-calligraphy select-none"
                      style={{
                        fontSize: 72,
                        color: "rgba(255,255,255,0.15)",
                      }}
                      aria-hidden="true"
                    >
                      {beast.name}
                    </span>
                  </div>
                )}
                {/* Dark overlay on top image */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(26,26,46,0.45) 0%, rgba(26,26,46,0.25) 60%, #faf7f0 100%)",
                  }}
                />

                {/* Corner ornaments - top left */}
                <div
                  className="absolute left-6 top-6"
                  style={{
                    width: 40,
                    height: 40,
                    borderTop: `2px solid ${accentColor}`,
                    borderLeft: `2px solid ${accentColor}`,
                  }}
                />
                {/* Corner ornaments - top right */}
                <div
                  className="absolute right-6 top-6"
                  style={{
                    width: 40,
                    height: 40,
                    borderTop: `2px solid ${accentColor}`,
                    borderRight: `2px solid ${accentColor}`,
                  }}
                />

                {/* Name + chapter on top area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2
                    style={{
                      fontFamily:
                        'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                      fontSize: 48,
                      color: "#faf7f0",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      letterSpacing: 8,
                    }}
                  >
                    {beast.name}
                  </h2>
                  <p
                    style={{
                      fontFamily:
                        'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                      fontSize: 18,
                      color: "rgba(250,247,240,0.85)",
                      marginTop: 12,
                      letterSpacing: 4,
                    }}
                  >
                    山海经 · {beast.chapter}
                  </p>
                </div>
              </div>

              {/* Thin divider line */}
              <div className="mx-12" style={{ height: 1, background: colorA + "30" }} />

              {/* Center: original text + translation */}
              <div className="px-16 pb-20 pt-6">
                {/* Original text */}
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 16,
                    color: "#8a8070",
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  原文
                </p>
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 22,
                    lineHeight: 1.9,
                    color: "#1a1a2e",
                    letterSpacing: 1,
                    marginBottom: 22,
                  }}
                >
                  {beast.originalText}
                </p>

                {/* Translation */}
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 16,
                    color: "#8a8070",
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  译文
                </p>
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 18,
                    lineHeight: 1.9,
                    color: "#4a4a5a",
                    letterSpacing: 0.5,
                  }}
                >
                  {beast.translation}
                </p>
              </div>

              {/* Bottom section: attribution + branding */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-8"
                style={{
                  height: 120,
                  paddingTop: 20,
                  background:
                    "linear-gradient(180deg, rgba(250,247,240,0.98) 0%, rgba(250,247,240,1) 30%)",
                }}
              >
                {/* Corner ornaments - bottom left */}
                <div
                  className="absolute bottom-5 left-6"
                  style={{
                    width: 40,
                    height: 40,
                    borderBottom: `2px solid ${accentColor}`,
                    borderLeft: `2px solid ${accentColor}`,
                  }}
                />
                {/* Corner ornaments - bottom right */}
                <div
                  className="absolute bottom-5 right-6"
                  style={{
                    width: 40,
                    height: 40,
                    borderBottom: `2px solid ${accentColor}`,
                    borderRight: `2px solid ${accentColor}`,
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
                        fontFamily:
                          'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
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
                        fontFamily:
                          'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                        fontSize: 20,
                        color: "#1a1a2e",
                        letterSpacing: 4,
                      }}
                    >
                      古籍焕新
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 11,
                        color: "#8a8070",
                        marginTop: 4,
                        letterSpacing: 2,
                      }}
                    >
                      山海经异兽图鉴 · 国风水墨插画
                    </span>
                  </div>
                </div>
              </div>

              {/* Border frame */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  border: "1px solid rgba(200,64,50,0.15)",
                  borderRadius: "inherit",
                }}
              />
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
            <IconCopy className="h-5 w-5" />
            {copied ? "已复制" : "复制文字"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
