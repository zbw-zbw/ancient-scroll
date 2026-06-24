"use client";

import StreamingCursor from "./StreamingCursor";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  characterEmoji?: string;
  characterColor?: string;
  isStreaming?: boolean;
}

export default function ChatBubble({
  role,
  content,
  characterEmoji,
  characterColor,
  isStreaming,
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
        } items-end gap-2 md:gap-3`}
      >
        {/* Avatar for assistant only */}
        {!isUser && (
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
          {isStreaming && <StreamingCursor />}
        </div>
      </div>
    </div>
  );
}
