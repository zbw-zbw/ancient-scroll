"use client";

import { useState } from "react";
import { IconSparkles } from "@/components/icons";

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
 } finally {
 setLoading(false);
 }
 };

 return (
 <button
 onClick={handleClick}
 disabled={loading}
 className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-serif text-xs text-cinnabar transition-colors hover:bg-cinnabar/5 disabled:cursor-not-allowed disabled:opacity-60"
 >
 {loading ? (
 <>
 <span className="inline-flex gap-1">
 <span
 className="h-1 w-1 animate-thinking-dot rounded-full bg-cinnabar"
 style={{ animationDelay: "0ms" }}
 />
 <span
 className="h-1 w-1 animate-thinking-dot rounded-full bg-cinnabar"
 style={{ animationDelay: "150ms" }}
 />
 <span
 className="h-1 w-1 animate-thinking-dot rounded-full bg-cinnabar"
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
