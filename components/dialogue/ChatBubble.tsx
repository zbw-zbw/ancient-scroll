"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import { IconBot } from "@/components/icons";
import StreamingCursor from "./StreamingCursor";
import { useToast } from "@/components/Toast";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  characterAvatarPath?: string;
  characterName?: string;
  characterColor?: string;
  isStreaming?: boolean;
  isThinking?: boolean;
  showRegenerate?: boolean;
  onRegenerate?: () => void;
}

function ChatBubbleImpl({
  role,
  content,
  characterAvatarPath,
  characterName,
  characterColor,
  isStreaming,
  isThinking,
  showRegenerate,
  onRegenerate,
}: ChatBubbleProps) {
  const isUser = role === "user";
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast("已复制到剪贴板", "success");
    } catch {
      toast("复制失败", "error");
    }
  }, [content, toast]);

  return (
    <div
      data-role={role}
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] md:max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start gap-2 md:gap-3`}
      >
        {/* Avatar */}
        {isUser ? (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface text-base shadow-sm md:h-10 md:w-10">
            <svg
              className="h-5 w-5 text-light-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        ) : (
          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-surface shadow-sm">
            {characterAvatarPath ? (
              <Image
                src={characterAvatarPath}
                alt={characterName || "AI"}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-light-ink">
                <IconBot className="h-5 w-5" />
              </div>
            )}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`relative group px-4 py-3 font-serif text-sm leading-relaxed md:px-5 md:py-3.5 ${
            !isStreaming ? "animate-fade-in" : ""
          } ${
            isUser
              ? "rounded-2xl rounded-tr-sm text-white"
              : "rounded-2xl rounded-tl-sm bg-xuan-dark text-ink"
          }`}
          style={
            isUser
              ? { backgroundColor: characterColor || "#c84032" }
              : undefined
          }
        >
          {content}
          {isThinking && (
            <span className="ml-1 inline-flex items-center gap-0.5 align-middle">
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted animate-thinking-dot"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted animate-thinking-dot"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted animate-thinking-dot"
                style={{ animationDelay: "0.4s" }}
              />
            </span>
          )}
          {isStreaming && !isThinking && <StreamingCursor />}

          {/* Copy button + Regenerate button (visible on hover, for assistant messages) */}
          {!isUser && !isStreaming && !isThinking && content.length > 0 && (
            <div className="absolute -bottom-1 right-2 flex translate-y-full items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {showRegenerate && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="rounded-md p-1 text-muted hover:text-cinnabar"
                  aria-label="重新生成回复"
                  title="重新生成"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="rounded-md p-1 text-muted hover:text-cinnabar"
                aria-label="复制消息"
                title="复制"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubbleImpl);
