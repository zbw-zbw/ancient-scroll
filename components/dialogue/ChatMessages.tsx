"use client";

import { useEffect, useRef, useMemo } from "react";
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
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);
  const stableMessages = useStableMessages(messages);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

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
      aria-label="对话消息"
      className="scrollbar-hide relative flex-1 overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 39px, var(--rule) 39px, var(--rule) 40px)",
        backgroundSize: "40px 100%",
      }}
    >
      <div className="mx-auto max-w-[900px] space-y-5 px-4 py-6 md:space-y-6 md:px-6 md:py-8">
        {stableMessages.map((message) => (
          <ChatBubble
            key={message.id}
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
