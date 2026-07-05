"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { HistoricalCharacter } from "../../data/characters";
import { useStreamingResponse } from "../../hooks/useStreamingResponse";
import { markDialogue } from "../../lib/progress";
import { useToast } from "@/components/Toast";
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
 prefilledAsk?: string;
}

const STORAGE_KEY = 'ancient-scroll-chat-history';

const loadHistory = (characterId: string): Message[] => {
 if (typeof window === 'undefined') return [];
 try {
 const stored = localStorage.getItem(`${STORAGE_KEY}-${characterId}`);
 if (stored) return JSON.parse(stored);
 } catch {}
 return [];
};

const saveHistory = (characterId: string, messages: Message[]) => {
 try {
 localStorage.setItem(`${STORAGE_KEY}-${characterId}`, JSON.stringify(messages.slice(-50)));
 } catch {}
};

export default function ChatInterface({
 character,
 onBack,
 prefilledAsk = "",
}: ChatInterfaceProps) {
 const [messages, setMessages] = useState<Message[]>(() => {
 const history = loadHistory(character.id);
 if (history.length > 0) return history;
 return [{ role: "assistant", content: character.greeting }];
 });
 const [inputValue, setInputValue] = useState("");
 const [streamingContent, setStreamingContent] = useState("");
 const [showSuggestions, setShowSuggestions] = useState(true);
 const { isStreaming, startStreaming } = useStreamingResponse();
  const { toast } = useToast();

 const autoSentRef = useRef(false);

  // Persist messages to localStorage
 useEffect(() => {
 if (messages.length > 1) {
 saveHistory(character.id, messages);
 }
 }, [messages, character.id]);

 const handleSend = useCallback(
 async (content: string) => {
 if (!content.trim() || isStreaming) return;

 const userMessage: Message = { role: "user", content: content.trim() };
 const updatedMessages = [...messages, userMessage];
 setMessages(updatedMessages);
 setInputValue("");
 setStreamingContent("");
 markDialogue(character.id);

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
 toast("网络不佳，请稍后再试", "error");
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

  // Auto-send prefilled question (e.g., from reading page "问问古人")
  const handleSendRef = useRef(handleSend);
  handleSendRef.current = handleSend;

  useEffect(() => {
    if (prefilledAsk && !autoSentRef.current) {
      autoSentRef.current = true;
      const timer = setTimeout(() => {
        handleSendRef.current(prefilledAsk);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [prefilledAsk]);

  const handleClear = useCallback(() => {
    setMessages([{ role: "assistant", content: character.greeting }]);
    localStorage.removeItem(`${STORAGE_KEY}-${character.id}`);
    setStreamingContent("");
    setShowSuggestions(true);
    setInputValue("");
  }, [character.greeting, character.id]);

  // Regenerate the last assistant response
  const handleRegenerate = useCallback(() => {
    if (isStreaming) return;
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    // Remove the last assistant message
    const newMessages = messages.filter((m, i) => {
      // Keep all messages except the last assistant one
      if (m.role === "assistant" && i === messages.length - 1) return false;
      return true;
    });
    setMessages(newMessages);
    // Re-send the last user message
    setTimeout(() => handleSendRef.current(lastUserMsg.content), 100);
  }, [messages, isStreaming]);

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
 <div className="absolute inset-x-0 top-16 bottom-0 z-20 flex flex-col bg-xuan">
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
        onRegenerate={handleRegenerate}
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
