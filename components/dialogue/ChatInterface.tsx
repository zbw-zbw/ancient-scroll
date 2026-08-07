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
 if (stored) {
   const parsed = JSON.parse(stored);
   return Array.isArray(parsed) ? parsed : [];
 }
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
 const { isStreaming, startStreaming, abortStreaming } = useStreamingResponse();
  const { toast } = useToast();

 const autoSentRef = useRef(false);
 // 流式内容的同步累积 ref：onComplete 通过它读取最终文本，
 // 避免在 setState updater 内执行副作用（StrictMode 下 updater 会被双调用，
 // 导致助手消息重复追加——对抗式审查发现的竞态/纯度问题）
 const streamingRef = useRef("");

  // Persist messages to localStorage
 useEffect(() => {
 if (messages.length > 1) {
 saveHistory(character.id, messages);
 }
 }, [messages, character.id]);

 // 卸载时中止流式请求由 useStreamingResponse 内部 effect 统一处理

 const handleSend = useCallback(
 async (content: string) => {
 if (!content.trim() || isStreaming) return;

 const userMessage: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    streamingRef.current = "";
    setStreamingContent("");
    // Collapse suggestions after first user message
    setShowSuggestions(false);
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
 streamingRef.current += text;
 setStreamingContent(streamingRef.current);
 },
 onComplete: () => {
 // 从 ref 读取最终文本，updater 外执行副作用，StrictMode 安全
 const final = streamingRef.current;
 streamingRef.current = "";
 setStreamingContent("");
 setShowSuggestions(true);
 if (final.trim()) {
 setMessages((prev) => [
 ...prev,
 { role: "assistant", content: final },
 ]);
 } else {
 // AI returned empty response — remove the user's message and notify
 setMessages((prev) => prev.slice(0, -1));
 toast("未收到回复，请重试", "error");
 }
 },
 onError: (error) => {
 console.error("Streaming error:", error);
 streamingRef.current = "";
 setStreamingContent("");
 setShowSuggestions(true);
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
 [character.id, messages, isStreaming, startStreaming, toast],
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
    if (isStreaming) abortStreaming();
    // Store previous messages for potential undo
    const prevMessages = messages;
    setMessages([{ role: "assistant", content: character.greeting }]);
    try {
      localStorage.removeItem(`${STORAGE_KEY}-${character.id}`);
    } catch {}
    streamingRef.current = "";
    setStreamingContent("");
    setShowSuggestions(true);
    setInputValue("");
    // Provide undo via toast
    if (prevMessages.length > 1) {
      toast("对话已清空", "info", {
        action: {
          label: "撤销",
          onClick: () => {
            setMessages(prevMessages);
            try {
              localStorage.setItem(`${STORAGE_KEY}-${character.id}`, JSON.stringify(prevMessages));
            } catch {}
            toast("对话已恢复", "success");
          },
        },
      });
    }
  }, [character.greeting, character.id, messages, toast, isStreaming, abortStreaming]);

  // Regenerate the last assistant response
  const handleRegenerate = useCallback(() => {
    if (isStreaming) abortStreaming();
    // Find the last user message
    const lastUserIdx = messages.length - 1 - [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIdx < 0 || lastUserIdx >= messages.length) return;
    const lastUserMsg = messages[lastUserIdx];
    // 对抗式审查修复：原实现只删除末尾 assistant 消息，handleSend 会把 user
    // 消息再追加一次，导致用户提问重复显示。应把最后一轮问答整体截掉，
    // 由 handleSend 统一重新追加 user 消息并请求新回复。
    const newMessages = messages.slice(0, lastUserIdx);
    setMessages(newMessages);
    streamingRef.current = "";
    setStreamingContent("");
    // Re-send the last user message
    setTimeout(() => handleSendRef.current(lastUserMsg.content), 100);
  }, [messages, isStreaming, abortStreaming]);

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
    <div className="fixed inset-x-0 top-16 bottom-0 z-20 flex flex-col bg-xuan">
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
