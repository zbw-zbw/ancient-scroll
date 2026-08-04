"use client";

import { useCallback, useEffect, useState } from "react";
import { speak, stop, isSupported } from "@/lib/tts";
import { speakAI, stopAI } from "@/lib/ai-tts";

interface ReadAloudButtonProps {
  text: string;
}

export default function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount guard to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      stopAI();
      stop();
    };
  }, []);

  const handleClick = useCallback(async () => {
    // 如果正在朗读，点击则停止
    if (speaking) {
      stopAI();
      stop();
      setSpeaking(false);
      return;
    }

    // 优先使用 AI TTS，失败时 fallback 到浏览器 Web Speech API
    setSpeaking(true);
    try {
      await speakAI(text, {
        onEnd: () => setSpeaking(false),
        onError: () => {
          // AI TTS 失败，fallback 到浏览器朗读
          if (isSupported()) {
            speak(text, {
              onEnd: () => setSpeaking(false),
              onError: () => setSpeaking(false),
            });
          } else {
            setSpeaking(false);
          }
        },
      });
    } catch {
      // AI TTS 异常，fallback 到浏览器朗读
      if (isSupported()) {
        speak(text, {
          onEnd: () => setSpeaking(false),
          onError: () => setSpeaking(false),
        });
      } else {
        setSpeaking(false);
      }
    }
  }, [text, speaking]);

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
