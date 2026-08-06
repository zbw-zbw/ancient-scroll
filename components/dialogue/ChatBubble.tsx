"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IconBot, IconCopy } from "@/components/icons";
import StreamingCursor from "./StreamingCursor";
import { useToast } from "@/components/Toast";
import { characterImageExists } from "@/lib/knownImages";
import { stop } from "@/lib/tts";
import { speakAI, stopAI, getVoiceForCharacter } from "@/lib/ai-tts";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  characterAvatarPath?: string;
  characterName?: string;
  characterColor?: string;
  characterId?: string;
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
  characterId,
  isStreaming,
  isThinking,
  showRegenerate,
  onRegenerate,
}: ChatBubbleProps) {
  const isUser = role === "user";
  const { toast } = useToast();
  const [speaking, setSpeaking] = useState(false);

  // Stop speech synthesis when leaving the page
  useEffect(() => {
    return () => {
      stopAI();
      stop();
    };
  }, []);

  // 复制消息文字到剪贴板
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast("已复制到剪贴板", "success");
    } catch {
      toast("复制失败", "error");
    }
  }, [content, toast]);

  // 朗读消息：优先使用 AI TTS，按角色性别选择音色，失败时 fallback 到浏览器朗读
  const handleSpeak = useCallback(async () => {
    // 正在朗读时点击则停止
    if (speaking) {
      stopAI();
      stop();
      setSpeaking(false);
      return;
    }

    // 根据角色性别选择 AI 音色
    const voice = getVoiceForCharacter(characterId);
    setSpeaking(true);

    try {
      await speakAI(content, {
        voice,
        onEnd: () => setSpeaking(false),
        onError: () => {
          setSpeaking(false);
          toast("语音朗读失败", "error");
        },
      });
    } catch {
      setSpeaking(false);
      toast("语音朗读失败", "error");
    }
  }, [content, characterId, speaking, toast]);

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
          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-surface shadow-sm md:h-10 md:w-10">
            <Image
              src="/images/user-avatar.jpg"
              alt="我"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-surface shadow-sm">
            {characterAvatarPath && characterImageExists(characterAvatarPath) ? (
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

          {/* 底部小操作按钮：始终可见，贴近气泡 */}
          {showActions && (
            <div className="mt-1.5 flex items-center gap-1 pl-1">
              {/* 复制按钮 */}
              <button
                onClick={handleCopy}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-cinnabar active:scale-90"
                aria-label="复制消息"
                title="复制"
              >
                <IconCopy className="h-4 w-4" />
              </button>
              {/* 朗读按钮：正在朗读时显示脉冲动画 */}
              <button
                onClick={handleSpeak}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors active:scale-90 ${
                  speaking
                    ? "text-cinnabar"
                    : "text-muted hover:text-cinnabar"
                }`}
                aria-label={speaking ? "停止朗读" : "朗读消息"}
                title={speaking ? "停止朗读" : "朗读"}
              >
                {speaking ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 animate-pulse"
                    aria-hidden="true"
                  >
                    <path d="m11 5-6 14" />
                    <path d="M22 5-16 14" />
                    <path d="M4.72 8.72a3 3 0 0 1 0 6.56" />
                    <path d="M19.28 8.72a3 3 0 0 1 0 6.56" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M11 5 6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
              {/* 重新生成按钮 */}
              {showRegenerate && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-cinnabar active:scale-90"
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
                    className="h-4 w-4"
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
