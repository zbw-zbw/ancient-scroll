"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import type { Poem } from "@/data/poems";
import { IconClose, IconDownload, IconCopy } from "@/components/icons";

interface ShareCardModalProps {
  open: boolean;
  onClose: () => void;
  poem: Poem | null;
}

export default function ShareCardModal({
  open,
  onClose,
  poem,
}: ShareCardModalProps) {
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (!cardRef.current || !poem) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${poem.title}-古籍焕新.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to save image:", err);
    } finally {
      setSaving(false);
    }
  }, [poem]);

  const handleCopyText = useCallback(async () => {
    if (!poem) return;
    const text = `${poem.title}\n${poem.dynasty} · ${poem.author}\n\n${poem.lines.map((l) => l.text).join("\n")}\n\n—— 古籍焕新`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy text");
    }
  }, [poem]);

  if (!visible || !poem) return null;

  // Build theme gradient from poem color
  const themeColor = poem.theme;
  const themeDark = themeColor + "30";
  const themeMid = themeColor + "18";

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
      aria-label="分享诗词卡片"
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

        {/* Share card - the element to capture */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-lg"
          style={{
            width: 750,
            height: 1000,
            background: `linear-gradient(180deg, ${themeColor}15 0%, ${themeMid} 40%, #faf7f0 100%)`,
            fontFamily:
              'var(--font-noto-serif-sc), "Noto Serif SC", "Songti SC", "SimSun", serif',
          }}
        >
          {/* Top area: scene image with dark overlay */}
          <div className="relative" style={{ height: 380 }}>
            {poem.coverImage && (
              <Image
                src={poem.coverImage}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            )}
            {/* Dark overlay on top image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,26,46,0.5) 0%, rgba(26,26,46,0.3) 60%, #faf7f0 100%)",
              }}
            />

            {/* Corner ornaments - top left */}
            <div
              className="absolute left-6 top-6"
              style={{
                width: 40,
                height: 40,
                borderTop: "2px solid rgba(200,64,50,0.6)",
                borderLeft: "2px solid rgba(200,64,50,0.6)",
              }}
            />
            {/* Corner ornaments - top right */}
            <div
              className="absolute right-6 top-6"
              style={{
                width: 40,
                height: 40,
                borderTop: "2px solid rgba(200,64,50,0.6)",
                borderRight: "2px solid rgba(200,64,50,0.6)",
              }}
            />

            {/* Title on top area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2
                style={{
                  fontFamily:
                    'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                  fontSize: 48,
                  color: "#faf7f0",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  letterSpacing: 8,
                }}
              >
                {poem.title}
              </h2>
              <p
                style={{
                  fontFamily:
                    'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                  fontSize: 18,
                  color: "rgba(250,247,240,0.8)",
                  marginTop: 12,
                  letterSpacing: 4,
                }}
              >
                {poem.dynasty} · {poem.author}
              </p>
            </div>
          </div>

          {/* Thin divider line */}
          <div className="mx-12" style={{ height: 1, background: themeDark }} />

          {/* Center: poem text displayed vertically (right to left) */}
          <div
            className="flex flex-row-reverse items-center justify-center px-16"
            style={{ height: 460 }}
          >
            <div className="flex flex-row-reverse gap-6">
              {poem.lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    fontFamily:
                      'var(--font-ma-shan-zheng), "Ma Shan Zheng", cursive',
                    fontSize: line.text.length > 7 ? 26 : 32,
                    lineHeight: 1.6,
                    color: "#1a1a2e",
                    letterSpacing: 4,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section: attribution + branding */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 120,
              background: "linear-gradient(180deg, transparent 0%, rgba(250,247,240,0.9) 40%)",
            }}
          >
            {/* Corner ornaments - bottom left */}
            <div
              className="absolute bottom-6 left-6"
              style={{
                width: 40,
                height: 40,
                borderBottom: "2px solid rgba(200,64,50,0.6)",
                borderLeft: "2px solid rgba(200,64,50,0.6)",
              }}
            />
            {/* Corner ornaments - bottom right */}
            <div
              className="absolute bottom-6 right-6"
              style={{
                width: 40,
                height: 40,
                borderBottom: "2px solid rgba(200,64,50,0.6)",
                borderRight: "2px solid rgba(200,64,50,0.6)",
              }}
            />

            <div
              className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-20"
            >
              {/* Seal stamp */}
              <div
                style={{
                  width: 56,
                  height: 56,
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
                    fontSize: 16,
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

              {/* Watermark */}
              <span
                style={{
                  fontFamily:
                    'var(--font-noto-serif-sc), "Noto Serif SC", serif',
                  fontSize: 13,
                  color: "#8a8070",
                  letterSpacing: 6,
                }}
              >
                古籍焕新
              </span>
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

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveImage}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-cinnabar/10 px-6 py-2.5 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDownload className="h-4 w-4" />
            {saving ? "正在保存..." : "保存图片"}
          </button>
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 rounded-full bg-surface/60 px-6 py-2.5 font-serif text-sm text-light-ink transition-colors hover:bg-surface"
          >
            <IconCopy className="h-4 w-4" />
            {copied ? "已复制" : "复制文字"}
          </button>
        </div>
      </div>
    </div>
  );
}
