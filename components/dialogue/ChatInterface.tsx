"use client";

import { useState, useCallback, useEffect } from "react";
import { HistoricalCharacter } from "../../data/characters";
import { useStreamingResponse } from "../../hooks/useStreamingResponse";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  character: HistoricalCharacter;
  onBack: () => void;
}

export default function ChatInterface({
  character,
  onBack,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: character.greeting },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { isStreaming, startStreaming } = useStreamingResponse();

  const handleSend = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: Message = { role: "user", content: content.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setShowSuggestions(false);
      setStreamingContent("");

      await startStreaming(
        "/api/chat",
        {
          characterId: character.id,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
        {
          onChunk: (text) => {
            setStreamingContent((prev) => prev + text);
          },
          onComplete: () => {
            setStreamingContent((final) => {
              if (final.trim()) {
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: final },
                ]);
              }
              return "";
            });
          },
          onError: (error) => {
            console.error("Streaming error:", error);
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "抱歉，方才思绪纷乱，未能听清。还请再说一遍。",
              },
            ]);
          },
        },
      );
    },
    [character.id, messages, isStreaming, startStreaming],
  );

  const handleClear = useCallback(() => {
    setMessages([{ role: "assistant", content: character.greeting }]);
    setStreamingContent("");
    setShowSuggestions(true);
    setInputValue("");
  }, [character.greeting]);

  // Scroll messages to bottom when mobile keyboard opens/closes
  useEffect(() => {
    const handleResize = () => {
      const messagesEl = document.querySelector("[data-messages-container]");
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    };
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-x-0 top-16 bottom-0 z-20 flex flex-col bg-xuan md:top-20">
      <ChatHeader
        character={character}
        onBack={onBack}
        onClear={handleClear}
      />
      <ChatMessages
        character={character}
        messages={messages}
        streamingContent={streamingContent}
        isStreaming={isStreaming}
        showSuggestions={showSuggestions}
        onSelectQuestion={handleSend}
      />
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={() => handleSend(inputValue)}
        disabled={isStreaming}
      />
    </div>
  );
}
