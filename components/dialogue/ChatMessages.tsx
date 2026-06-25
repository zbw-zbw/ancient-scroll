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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  return (
    <div
      ref={scrollRef}
      data-messages-container
      className="relative flex-1 overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(26,26,46,0.03) 39px, rgba(26,26,46,0.03) 40px)",
        backgroundSize: "40px 100%",
      }}
    >
      <div className="mx-auto max-w-[900px] space-y-5 px-4 py-6 md:space-y-6 md:px-6 md:py-8">
        {messages.map((message, index) => (
          <ChatBubble
            key={`msg-${index}-${message.role}`}
            role={message.role}
            content={message.content}
            characterAvatarPath={character.avatarPath}
            characterName={character.name}
            characterColor={character.color}
          />
        ))}

        {isStreaming && (
          <ChatBubble
            role="assistant"
            content={streamingContent}
            characterAvatarPath={character.avatarPath}
            characterName={character.name}
            characterColor={character.color}
            isStreaming={true}
            isThinking={streamingContent === ""}
          />
        )}

        {showSuggestions && !isStreaming && messages.length <= 1 && (
          <SuggestedQuestions
            questions={character.sampleQuestions}
            onSelect={onSelectQuestion}
            characterColor={character.color}
          />
        )}
      </div>
    </div>
  );
}
