"use client";

import StreamingCursor from "./StreamingCursor";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  characterEmoji?: string;
  characterColor?: string;
  isStreaming?: boolean;
  isThinking?: boolean;
}

export default function ChatBubble({
  role,
  content,
  characterEmoji,
  characterColor,
  isStreaming,
  isThinking,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
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
          <div className="emoji flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface text-base shadow-sm md:h-10 md:w-10 md:text-lg">
            {characterEmoji}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-3 font-serif text-sm leading-relaxed md:px-5 md:py-3.5 ${
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
        </div>
      </div>
    </div>
  );
}
