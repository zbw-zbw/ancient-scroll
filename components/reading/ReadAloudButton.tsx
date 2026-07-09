"use client";

import { useCallback, useEffect, useState } from "react";

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

  // Load Chinese voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getZhVoice = useCallback((): SpeechSynthesisVoice | undefined => {
    if (typeof window === "undefined" || !window.speechSynthesis) return undefined;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === "zh-CN" && v.name.includes("Female")) ||
      voices.find((v) => v.lang === "zh-CN") ||
      voices.find((v) => v.lang.startsWith("zh")) ||
      undefined
    );
  }, []);

  const handleClick = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    // Load speech rate from settings
    const savedRate = localStorage.getItem("ancient-scroll-speech-rate");
    utterance.rate = savedRate ? parseFloat(savedRate) : 0.85;
    utterance.pitch = 1;

    const zhVoice = getZhVoice();
    if (zhVoice) utterance.voice = zhVoice;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [text, getZhVoice]);

  // Render placeholder until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 min-h-[36px] font-serif text-xs text-light-ink opacity-0">
        朗读
      </span>
    );
  }

  if (typeof window === "undefined" || !window.speechSynthesis) {
    return null;
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
