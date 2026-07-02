"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import type { Beast } from "@/data/beasts";
import { IconClose, IconDownload, IconCopy } from "@/components/icons";

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

  // Reset image error when beast changes
  useEffect(() => {
    setImgError(false);
  }, [beast]);

  // Responsive card scaling
  useEffect(() => {
    if (!open) return;
    const updateScale = () => {
      const maxW = window.innerWidth - 32; // 16px padding each side
      const maxH = window.innerHeight * 0.75;
      const scaleW = Math.min(1, maxW / 400);
      const scaleH = Math.min(1, maxH / 640);
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

  // Escape key + lock body scroll
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${beast.name}-山海经异兽.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to save image:", err);
    } finally {
      setSaving(false);
    }
  }, [beast]);

  const handleCopyText = useCallback(async () => {
    if (!beast) return;
    const text = `${beast.name}\n山海经 · ${beast.chapter}\n\n${beast.originalText}\n\n${beast.translation}\n\n—— 古籍焕新 · 山海经异兽图鉴`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy text");
    }
  }, [beast]);

  if (!visible || !beast) return null;

  // Build theme gradient from beast gradient colors
  const [colorA, colorB] = beast.gradient;
  const colorATint = colorA + "25";
  const colorBTint = colorB + "15";
  const accentColor = "rgba(200,64,50,0.6)";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 backdrop-blur-sm transition-all duration-200 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="分享异兽卡片"
    >
      <div
        className={`relative mx-4 flex flex-col items-center gap-6 transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-light-ink shadow-md transition-colors hover:text-ink hover:bg-surface"
          aria-label="关闭"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {/* Card preview wrapper with responsive scaling */}
        <div className="flex items-start justify-center" style={{ maxHeight: "80vh" }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
            {/* Share card - the element to capture */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-lg"
              style={{
                width: 400,
                height: 640,
                background: `linear-gradient(180deg, ${colorATint} 0%, ${colorBTint} 45%, #faf7f0 100%)`,
                fontFamily:
                  'var(--font-noto-serif-sc), "Noto Serif SC", "Songti SC", "SimSun", serif',
              }}
            >
              {/* Top area: beast image with dark overlay */}
              <div className="relative" style={{ height: 230 }}>
                {!imgError ? (
                  <Image
                    src={beast.imagePath}
                    alt={beast.name}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-xuan-dark text-5xl">
                    🐾
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
                  className="absolute left-5 top-5"
                  style={{
                    width: 32,
                    height: 32,
                    borderTop: `2px solid ${accentColor}`,
                    borderLeft: `2px solid ${accentColor}`,
                  }}
                />
                {/* Corner ornaments - top right */}
                <div
                  className="absolute right-5 top-5"
                  style={{
                    width: 32,
                    height: 32,
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
                      fontSize: 40,
                      color: "#faf7f0",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      letterSpacing: 6,
                    }}
                  >
                    {beast.name}
                  </h2>
                  <p
                    style={{
                      fontFamily:
                        'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                      fontSize: 14,
                      color: "rgba(250,247,240,0.85)",
                      marginTop: 8,
                      letterSpacing: 3,
                    }}
                  >
                    山海经 · {beast.chapter}
                  </p>
                </div>
              </div>

              {/* Thin divider line */}
              <div className="mx-10" style={{ height: 1, background: colorA + "30" }} />

              {/* Center: original text + translation */}
              <div className="px-8 pt-6">
                {/* Original text */}
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 12,
                    color: "#8a8070",
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}
                >
                  原文
                </p>
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#1a1a2e",
                    letterSpacing: 1,
                    marginBottom: 18,
                  }}
                >
                  {beast.originalText}
                </p>

                {/* Translation */}
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 12,
                    color: "#8a8070",
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}
                >
                  译文
                </p>
                <p
                  style={{
                    fontFamily:
                      'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#4a4a5a",
                    letterSpacing: 0.5,
                  }}
                >
                  {beast.translation}
                </p>
              </div>

              {/* Bottom section: attribution + branding */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: 110,
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(250,247,240,0.9) 40%)",
                }}
              >
                {/* Corner ornaments - bottom left */}
                <div
                  className="absolute bottom-5 left-5"
                  style={{
                    width: 32,
                    height: 32,
                    borderBottom: `2px solid ${accentColor}`,
                    borderLeft: `2px solid ${accentColor}`,
                  }}
                />
                {/* Corner ornaments - bottom right */}
                <div
                  className="absolute bottom-5 right-5"
                  style={{
                    width: 32,
                    height: 32,
                    borderBottom: `2px solid ${accentColor}`,
                    borderRight: `2px solid ${accentColor}`,
                  }}
                />

                <div className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-10">
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
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                        fontSize: 13,
                        color: "#8a1f2a",
                        textAlign: "center",
                        lineHeight: 1.2,
                      }}
                    >
                      古籍
                      <br />
                      焕新
                    </span>
                  </div>

                  {/* Watermark + source */}
                  <div className="flex flex-col items-end">
                    <span
                      style={{
                        fontFamily:
                          'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 11,
                        color: "#8a8070",
                        letterSpacing: 3,
                      }}
                    >
                      古籍焕新 · 山海经异兽图鉴
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                        fontSize: 10,
                        color: "#a8a090",
                        marginTop: 4,
                        letterSpacing: 2,
                      }}
                    >
                      —— {beast.chapter}
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

        {/* Action buttons - high contrast on dark overlay */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveImage}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 font-serif text-sm text-ink shadow-lg transition-colors hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDownload className="h-4 w-4" />
            {saving ? "正在保存..." : "保存图片"}
          </button>
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 font-serif text-sm text-ink shadow-lg transition-colors hover:bg-white"
          >
            <IconCopy className="h-4 w-4" />
            {copied ? "已复制" : "复制文字"}
          </button>
        </div>
      </div>
    </div>
  );
}
