"use client";

import { useState } from "react";
import { IconSparkles } from "@/components/icons";
import { useToast } from "@/components/Toast";

interface AiTranslateButtonProps {
  sentenceId: string;
  original: string;
  context: string;
  currentTranslation: string;
  onTranslation: (sentenceId: string, translation: string) => void;
}

export default function AiTranslateButton({
  sentenceId,
  original,
  context,
  currentTranslation,
  onTranslation,
}: AiTranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: original, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "翻译失败");
      onTranslation(sentenceId, data.translation || currentTranslation);
    } catch (err) {
      console.error("AI translate error:", err);
      const msg = err instanceof Error ? err.message : "翻译失败";
      toast(
        msg.includes("未配置") ? "AI 服务暂未启用，当前使用内置译文" : "翻译失败，请稍后再试",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-serif text-xs text-cinnabar transition-colors hover:bg-cinnabar/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar"
              style={{ animationDelay: "300ms" }}
            />
          </span>
          重新翻译中...
        </>
      ) : (
        <>
          <IconSparkles className="h-3 w-3" />
          重新翻译
        </>
      )}
    </button>
  );
}
