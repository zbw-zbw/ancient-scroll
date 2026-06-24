"use client";

import { useState } from "react";

interface AiDescribeButtonProps {
  name: string;
  originalText: string;
  currentDescription: string;
  onDescription: (description: string) => void;
}

export default function AiDescribeButton({
  name,
  originalText,
  currentDescription,
  onDescription,
}: AiDescribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/beast-describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, originalText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "请求失败");
      onDescription(data.description || currentDescription);
    } catch (err) {
      console.error("AI describe error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-cinnabar/30 bg-cinnabar/5 px-4 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="inline-flex gap-1">
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
          AI 重新解读中...
        </>
      ) : (
        <>
          <span>✦</span>
          AI 重新解读
        </>
      )}
    </button>
  );
}
