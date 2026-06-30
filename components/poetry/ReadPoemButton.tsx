"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ReadPoemButtonProps {
  lines: { text: string }[];
}

export default function ReadPoemButton({ lines }: ReadPoemButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Sync speaking state
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const handleEnd = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };
    const handleError = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };

    window.speechSynthesis.addEventListener("end", handleEnd);
    window.speechSynthesis.addEventListener("error", handleError);

    return () => {
      window.speechSynthesis.removeEventListener("end", handleEnd);
      window.speechSynthesis.removeEventListener("error", handleError);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setCurrentLine(0);
      return;
    }

    const fullText = lines.map((l) => l.text).join("，");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "zh-CN";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onboundary = (event) => {
      // Update current line indicator based on character position
      let charCount = 0;
      for (let i = 0; i < lines.length; i++) {
        charCount += lines[i].text.length;
        if (event.charIndex < charCount) {
          setCurrentLine(i);
          break;
        }
      }
    };
    utterance.onend = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };

    setSpeaking(true);
    setCurrentLine(0);
    window.speechSynthesis.speak(utterance);
  }, [lines]);

  // Hide button if speechSynthesis not available
  if (typeof window !== "undefined" && !window.speechSynthesis) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-serif text-sm transition-all active:scale-95 ${
        speaking
          ? "bg-white/20 text-white"
          : "bg-white/10 text-white/80 hover:bg-white/20"
      }`}
      title={speaking ? "停止朗读" : "朗读全诗"}
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
            className="h-4 w-4 animate-pulse"
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
            className="h-4 w-4"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          朗读全诗
        </>
      )}
    </button>
  );
}
