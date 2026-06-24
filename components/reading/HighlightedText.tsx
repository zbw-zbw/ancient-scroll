"use client";

import { useMemo } from "react";
import type { DifficultChar } from "@/data/shanhaijing";

interface HighlightedTextProps {
  text: string;
  difficultChars: DifficultChar[];
  fontSizeClass: string;
  onCharClick: (char: DifficultChar, rect: DOMRect) => void;
}

interface Segment {
  type: "text" | "char";
  content: string;
  charData?: DifficultChar;
}

export default function HighlightedText({
  text,
  difficultChars,
  fontSizeClass,
  onCharClick,
}: HighlightedTextProps) {
  const segments = useMemo<Segment[]>(() => {
    if (!difficultChars.length) return [{ type: "text", content: text }];

    // Sort by length descending so multi-char matches are tried first
    const sorted = [...difficultChars].sort((a, b) => b.char.length - a.char.length);
    const result: Segment[] = [];
    let i = 0;

    while (i < text.length) {
      let matched = false;
      for (const dc of sorted) {
        const end = i + dc.char.length;
        if (end <= text.length && text.slice(i, end) === dc.char) {
          result.push({ type: "char", content: dc.char, charData: dc });
          i = end;
          matched = true;
          break;
        }
      }
      if (!matched) {
        if (result.length > 0 && result[result.length - 1].type === "text") {
          result[result.length - 1].content += text[i];
        } else {
          result.push({ type: "text", content: text[i] });
        }
        i++;
      }
    }

    return result;
  }, [text, difficultChars]);

  return (
    <p className={`font-serif leading-loose text-ink ${fontSizeClass}`}>
      {segments.map((seg, idx) =>
        seg.type === "char" && seg.charData ? (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            aria-label={`查看${seg.content}的注释`}
            className="inline cursor-pointer rounded-sm bg-cinnabar/10 px-0.5 text-cinnabar underline decoration-cinnabar/40 decoration-dashed underline-offset-4 transition-colors hover:bg-cinnabar/20"
            onClick={(e) => onCharClick(seg.charData!, e.currentTarget.getBoundingClientRect())}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCharClick(seg.charData!, e.currentTarget.getBoundingClientRect());
              }
            }}
          >
            {seg.content}
          </span>
        ) : (
          <span key={idx}>{seg.content}</span>
        )
      )}
    </p>
  );
}
