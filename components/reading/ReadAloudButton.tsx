"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useToast } from "@/components/Toast";

// 缓存动态加载的 TTS 模块，避免重复 import
let ttsModuleRef: Promise<typeof import("@/lib/ai-tts")> | null = null;

function loadTTS() {
  if (!ttsModuleRef) {
    ttsModuleRef = import("@/lib/ai-tts");
  }
  return ttsModuleRef;
}

interface ReadAloudButtonProps {
  text: string;
}

export default function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const speakingRef = useRef(false);

  // Mount guard to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Stop speech on unmount (dynamic import to avoid bundling TTS in first paint)
  useEffect(() => {
    return () => {
      if (speakingRef.current) {
        loadTTS().then(({ stopAI }) => stopAI());
      }
      // 浏览器原生 TTS 可直接调用，无需动态导入
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleClick = useCallback(async () => {
    // 如果正在朗读，点击则停止
    if (speaking) {
      const { stopAI } = await loadTTS();
      stopAI();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setSpeaking(false);
      speakingRef.current = false;
      return;
    }

    // AI TTS 内部已有降级逻辑，onError 时只需重置 UI 状态
    setSpeaking(true);
    speakingRef.current = true;
    try {
      const { speakAI } = await loadTTS();
      await speakAI(text, {
        onEnd: () => {
          setSpeaking(false);
          speakingRef.current = false;
        },
        onError: () => {
          setSpeaking(false);
          speakingRef.current = false;
          toast("语音朗读失败", "error");
        },
      });
    } catch {
      setSpeaking(false);
      speakingRef.current = false;
      toast("语音朗读失败", "error");
    }
  }, [text, speaking, toast]);

  // Render placeholder until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 min-h-[36px] font-serif text-xs text-light-ink opacity-0">
        朗读
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 min-h-[36px] font-serif text-xs transition-all active:scale-95 ${
        speaking
          ? "bg-cinnabar/10 text-cinnabar"
          : "bg-ink/5 text-light-ink hover:bg-ink/10"
      }`}
      title={speaking ? "停止朗读" : "朗读原文"}
      aria-pressed={speaking}
    >
      {speaking ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 animate-pulse"
          >
            <path d="m11 5-6 14" />
            <path d="M22 5-16 14" />
            <path d="M4.72 8.72a3 3 0 0 1 0 6.56" />
            <path d="M19.28 8.72a3 3 0 0 1 0 6.56" />
          </svg>
          正在朗读...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          朗读
        </>
      )}
    </button>
  );
}
