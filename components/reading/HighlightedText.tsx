"use client";

import { useMemo } from "react";
import type { DifficultChar } from "@/data/shanhaijing";

interface HighlightedTextProps {
  text: string;
  difficultChars: DifficultChar[];
  fontSizeClass: string;
  onCharClick: (char: DifficultChar, rect: DOMRect) => void;
  vertical?: boolean;
}

interface Segment {
  type: "text" | "char";
  content: string;
  charData?: DifficultChar;
}

// 中文标点：在这些字符之后断列
const PUNCTUATION = /[，。！？；：、」』）】》…—]/;

export default function HighlightedText({
  text,
  difficultChars,
  fontSizeClass,
  onCharClick,
  vertical = false,
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

  // 竖排模式：按标点分组成"句"，每句独占一列
  const phrases = useMemo<Segment[][]>(() => {
    if (!vertical) return [segments];
    const result: Segment[][] = [];
    let currentPhrase: Segment[] = [];

    for (const seg of segments) {
      if (seg.type === "char") {
        currentPhrase.push(seg);
        continue;
      }
      // text segment: split by punctuation
      let textContent = seg.content;
      while (textContent.length > 0) {
        const match = textContent.match(PUNCTUATION);
        if (match && match.index !== undefined) {
          const end = match.index + match[0].length;
          const before = textContent.slice(0, end);
          if (before) {
            currentPhrase.push({ type: "text", content: before });
          }
          if (currentPhrase.length > 0) {
            result.push(currentPhrase);
          }
          currentPhrase = [];
          textContent = textContent.slice(end);
        } else {
          if (textContent) {
            currentPhrase.push({ type: "text", content: textContent });
          }
          break;
        }
      }
    }
    if (currentPhrase.length > 0) result.push(currentPhrase);
    return result;
  }, [segments, vertical]);

  const renderSegment = (seg: Segment, idx: number) =>
    seg.type === "char" && seg.charData ? (
      <span
        key={idx}
        data-char-highlight
        role="button"
        tabIndex={0}
        aria-label={`查看${seg.content}的注释`}
        className={`inline cursor-pointer rounded-sm bg-cinnabar/10 text-cinnabar transition-colors hover:bg-cinnabar/20 ${
          vertical
            ? ""
            : "px-0.5 border-b border-dashed border-cinnabar/40 pb-0.5"
        }`}
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
    );

  if (vertical && phrases.length > 1) {
    return (
      <p className={`font-serif leading-loose text-ink ${fontSizeClass}`}>
        {phrases.map((phrase, pIdx) => (
          <span
            key={pIdx}
            style={{
              display: "block",
              marginRight: pIdx > 0 ? "1.5rem" : undefined,
            }}
          >
            {phrase.map(renderSegment)}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p className={`font-serif leading-loose text-ink ${fontSizeClass}`}>
      {segments.map(renderSegment)}
    </p>
  );
}
