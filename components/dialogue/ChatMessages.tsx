"use client";

import { useEffect, useRef } from "react";
import { HistoricalCharacter } from "../../data/characters";
import ChatBubble from "./ChatBubble";
import SuggestedQuestions from "./SuggestedQuestions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  character: HistoricalCharacter;
  messages: Message[];
  streamingContent: string;
  isStreaming: boolean;
  showSuggestions: boolean;
  onSelectQuestion: (question: string) => void;
}

export default function ChatMessages({
  character,
  messages,
  streamingContent,
  isStreaming,
  showSuggestions,
  onSelectQuestion,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Use smooth scroll for new user messages, auto for streaming
    const isNewMessage = messages.length > prevMessageCountRef.current;
    prevMessageCountRef.current = messages.length;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: isStreaming ? "auto" : isNewMessage ? "smooth" : "auto",
    });
  }, [messages, streamingContent, isStreaming]);

  return (
    <div
      ref={scrollRef}
      data-messages-container
      aria-live="polite"
      className="scrollbar-hide relative flex-1 overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 39px, var(--rule) 39px, var(--rule) 40px)",
        backgroundSize: "40px 100%",
      }}
    >
      <div className="mx-auto max-w-[900px] space-y-5 px-4 py-6 md:space-y-6 md:px-6 md:py-8">
        {messages.map((message, index) => (
          <ChatBubble
            key={`msg-${index}`}
            role={message.role}
            content={message.content}
            characterAvatarPath={character.avatarPath}
            characterName={character.name}
            characterColor={character.color}
          />
        ))}

        {isStreaming && (
          <ChatBubble
            key="streaming-message"
            role="assistant"
            content={streamingContent}
            characterAvatarPath={character.avatarPath}
            characterName={character.name}
            characterColor={character.color}
            isStreaming={true}
            isThinking={streamingContent === ""}
          />
        )}

        {/* Suggested questions */}
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
  );
}
