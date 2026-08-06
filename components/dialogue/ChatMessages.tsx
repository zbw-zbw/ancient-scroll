"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { HistoricalCharacter } from "../../data/characters";
import ChatBubble from "./ChatBubble";
import SuggestedQuestions from "./SuggestedQuestions";

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

interface ChatMessagesProps {
  character: HistoricalCharacter;
  messages: Message[];
  streamingContent: string;
  isStreaming: boolean;
  showSuggestions: boolean;
  onSelectQuestion: (question: string) => void;
  onRegenerate?: () => void;
}

// Assign stable IDs to messages that lack them (for localStorage restored messages)
function useStableMessages(messages: Message[]): Message[] {
  return useMemo(() => {
    return messages.map((msg, i) => ({
      ...msg,
      id: msg.id || `msg-${i}-${msg.content.slice(0, 20)}`,
    }));
  }, [messages]);
}

export default function ChatMessages({
  character,
  messages,
  streamingContent,
  isStreaming,
  showSuggestions,
  onSelectQuestion,
  onRegenerate,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);
  const stableMessages = useStableMessages(messages);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Track whether the user has manually scrolled up away from the bottom.
  // When true, streaming auto-scroll is paused so the user can read history.
  const pinnedToBottomRef = useRef(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const isNewMessage = messages.length > prevMessageCountRef.current;
    prevMessageCountRef.current = messages.length;

    // New user message: always re-pin to bottom
    if (isNewMessage) {
      pinnedToBottomRef.current = true;
    }

    // Only auto-scroll if the user hasn't scrolled away from the bottom
    if (pinnedToBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: isStreaming ? "auto" : isNewMessage ? "smooth" : "auto",
      });
    }
  }, [messages, streamingContent, isStreaming]);

  // Show back-to-top button when scrolled down + track scroll progress + detect user scroll direction
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const max = container.scrollHeight - container.clientHeight;
      const isNearBottom = max > 0 ? container.scrollTop >= max - 80 : true;
      // Update pinned state: if user scrolls near bottom, re-pin; if away, unpin
      pinnedToBottomRef.current = isNearBottom;

      setShowScrollTop(container.scrollTop > 300);
      const progress = max > 0 ? container.scrollTop / max : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex-1 min-h-0">
    {/* 局部滚动进度条 — 针对话对话内容区域而非整个页面 */}
    <div className="absolute top-0 left-0 right-0 z-10 h-[2px] bg-cinnabar/10" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-cinnabar to-gold transition-[width] duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
    <div
      ref={scrollRef}
      data-messages-container
      role="log"
      aria-live={isStreaming ? "off" : "polite"}
      aria-label="对话消息"
      className="scrollbar-hide h-full overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 39px, var(--rule) 39px, var(--rule) 40px)",
        backgroundSize: "40px 100%",
      }}
    >
      <div className="mx-auto max-w-[900px] space-y-4 px-4 py-6 md:px-6 md:py-8">
        {stableMessages.map((message, index) => {
          const isLastAssistant =
            !isStreaming &&
            onRegenerate &&
            message.role === "assistant" &&
            index === stableMessages.length - 1;
          return (
            <ChatBubble
              key={message.id}
              role={message.role}
              content={message.content}
              characterAvatarPath={character.avatarPath}
              characterName={character.name}
              characterColor={character.color}
              characterId={character.id}
              showRegenerate={isLastAssistant}
              onRegenerate={onRegenerate}
            />
          );
        })}

        {isStreaming && (
          <ChatBubble
            key="streaming-message"
            role="assistant"
            content={streamingContent}
            characterAvatarPath={character.avatarPath}
            characterName={character.name}
            characterColor={character.color}
            characterId={character.id}
            isStreaming={true}
            isThinking={streamingContent === ""}
          />
        )}

        {showSuggestions && (
          <SuggestedQuestions
            questions={character.sampleQuestions.filter(
              (q) => !messages.some((m) => m.role === "user" && m.content === q)
            )}
            onSelect={onSelectQuestion}
            characterColor={character.color}
            disabled={isStreaming}
          />
        )}
      </div>
    </div>
    {showScrollTop && (
      <button
        onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 shadow-md border border-ink/10 text-light-ink hover:text-cinnabar transition-opacity duration-300 active:scale-95"
        aria-label="回到顶部"
        title="回到顶部"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    )}
    </div>
  );
}
