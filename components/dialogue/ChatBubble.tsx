"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import { IconBot, IconCopy } from "@/components/icons";
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

  // 复制消息文字到剪贴板
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast("已复制到剪贴板", "success");
    } catch {
      toast("复制失败", "error");
    }
  }, [content, toast]);

  // 调用浏览器语音合成 API 朗读消息（中文语音 zh-CN）
  const handleSpeak = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast("浏览器不支持语音朗读", "error");
      return;
    }
    // 停止之前的朗读，避免叠加
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "zh-CN";
    // 优先选择中文语音
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find((v) => v.lang.startsWith("zh"));
    if (zhVoice) utterance.voice = zhVoice;
    window.speechSynthesis.speak(utterance);
    toast("正在朗读", "info");
  }, [content, toast]);

  // 是否显示底部操作按钮（仅 AI 已完成的消息且内容非空时）
  const showActions =
    !isUser && !isStreaming && !isThinking && content.length > 0;

  return (
    <div
      data-role={role}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
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
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-light-ink">
                <IconBot className="h-5 w-5" />
              </div>
            )}
          </div>
        )}

        {/* 气泡 + 操作按钮列容器：AI 消息需要 group 类以触发 .msg-actions 显现 */}
        <div className={`flex min-w-0 flex-col ${isUser ? "items-end" : "items-start group"}`}>
          {/* Bubble */}
          <div
            className={`relative px-4 py-3 font-serif text-sm leading-relaxed md:px-5 md:py-3.5 ${
              !isStreaming ? "animate-fade-in" : ""
            } ${
              isUser
                ? // 用户消息：右上角小三角指向自然（rounded-tr-sm 营造指向感）
                  "rounded-2xl rounded-tr-sm text-white"
                : // AI 消息：左侧竖线装饰，营造古籍批注感
                  "rounded-2xl rounded-tl-sm border-l-2 border-cinnabar/40 bg-xuan-dark text-ink"
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

          {/* 底部小操作按钮（.msg-actions 类，hover 时显现） */}
          {showActions && (
            <div className="msg-actions mt-1.5 flex items-center gap-1 pl-1">
              {/* 复制按钮 */}
              <button
                onClick={handleCopy}
                className="rounded-md p-1 text-muted transition-colors hover:text-cinnabar"
                aria-label="复制消息"
                title="复制"
              >
                <IconCopy className="h-3.5 w-3.5" />
              </button>
              {/* 朗读按钮 */}
              <button
                onClick={handleSpeak}
                className="rounded-md p-1 text-muted transition-colors hover:text-cinnabar"
                aria-label="朗读消息"
                title="朗读"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </button>
              {/* 重新生成按钮 */}
              {showRegenerate && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="rounded-md p-1 text-muted transition-colors hover:text-cinnabar"
                  aria-label="重新生成回复"
                  title="重新生成"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubbleImpl);
