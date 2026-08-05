"use client";

/**
 * AI 语音模块 —— 前端调用 /api/tts
 * 后端使用火山引擎语音合成，音质远超浏览器 Web Speech API。
 * 失败时静默降级到浏览器原生 TTS。
 */

import { speak, stop as stopBrowser, isSupported } from "@/lib/tts";

// ====== 音色定义 ======

export type AIVoice =
  | "xiaoxiao"
  | "xiaoyi"
  | "xiaomeng"
  | "yunxi"
  | "yunyang"
  | "yunjian";

export interface AIVoiceInfo {
  id: AIVoice;
  name: string;
  gender: "female" | "male";
  description: string;
}

export const AI_VOICES: AIVoiceInfo[] = [
  { id: "xiaoxiao", name: "晓晓", gender: "female", description: "温暖亲切，适合诗词朗诵" },
  { id: "xiaoyi", name: "灿灿", gender: "female", description: "活泼明快，适合知识讲解" },
  { id: "xiaomeng", name: "晓梦", gender: "female", description: "柔和舒缓，适合睡前故事" },
  { id: "yunxi", name: "云希", gender: "male", description: "年轻阳光，适合古文朗读" },
  { id: "yunyang", name: "云扬", gender: "male", description: "成熟稳重，适合历史人物" },
  { id: "yunjian", name: "云健", gender: "male", description: "浑厚有力，适合山海经原文" },
];

// ====== 偏好存储 ======

const VOICE_KEY = "ancient-scroll:ai-voice";
const RATE_KEY = "ancient-scroll:ai-rate";

export function getPreferredAIVoice(): AIVoice {
  try {
    const saved = localStorage.getItem(VOICE_KEY);
    if (saved && AI_VOICES.some((v) => v.id === saved)) return saved as AIVoice;
  } catch {}
  return "xiaoxiao";
}

export function savePreferredAIVoice(voice: AIVoice): void {
  try {
    localStorage.setItem(VOICE_KEY, voice);
  } catch {}
}

export function getAIRate(): number {
  try {
    const saved = localStorage.getItem(RATE_KEY);
    if (saved) {
      const n = parseInt(saved, 10);
      if (Number.isFinite(n)) return n;
    }
  } catch {}
  return 0;
}

export function saveAIRate(rate: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(rate));
  } catch {}
}

export function getVoiceForCharacter(characterId?: string): AIVoice {
  const femaleChars = ["wuzetian", "liqingzhao", "mulan"];
  if (characterId && femaleChars.includes(characterId)) return "xiaoxiao";
  return "yunyang";
}

// ====== 播放控制 ======

let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;
let currentAbortController: AbortController | null = null;
let safetyTimeoutId: ReturnType<typeof setTimeout> | null = null;

// 全局引用：当前播放会话的 onEnd 回调。
// 新的 speakAI 调用会先触发上一个会话的 onEnd，确保旧按钮 UI 正确重置。
let currentOnEnd: (() => void) | null = null;

function cleanup() {
  if (safetyTimeoutId) {
    clearTimeout(safetyTimeoutId);
    safetyTimeoutId = null;
  }
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
  if (currentAudio) {
    // 先移除事件监听，再清 src，避免触发 onerror 导致重复播放
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
  // 清除回调引用（不调用，仅清除）
  currentOnEnd = null;
}

export interface SpeakAIOptions {
  voice?: AIVoice;
  rate?: number;
  onEnd?: () => void;
  onError?: (message?: string) => void;
}

/**
 * 调用火山引擎 TTS 朗读文本。
 * 失败时自动降级到浏览器 Web Speech API。
 */
export async function speakAI(
  text: string,
  options?: SpeakAIOptions
): Promise<void> {
  // 如果上一个会话仍在播放，先触发其 onEnd 回调，确保旧按钮 UI 重置
  if (currentOnEnd) {
    const prevOnEnd = currentOnEnd;
    currentOnEnd = null;
    prevOnEnd();
  }

  stopAI();

  const voice = options?.voice || getPreferredAIVoice();
  const rate = options?.rate ?? getAIRate();

  // 记录本次会话的 onEnd，供下一次 speakAI 调用中断时触发
  currentOnEnd = options?.onEnd ?? null;

  // 安全超时：30秒后强制结束（防止状态卡死）
  safetyTimeoutId = setTimeout(() => {
    console.warn("TTS 安全超时，强制停止");
    cleanup();
    options?.onEnd?.();
  }, 30000);

  try {
    currentAbortController = new AbortController();

    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.slice(0, 500), voice, rate }),
      signal: currentAbortController.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();

    if (blob.size === 0) {
      throw new Error("空音频响应");
    }

    const url = URL.createObjectURL(blob);
    currentObjectUrl = url;

    const audio = new Audio(url);
    currentAudio = audio;

    // 防止 cleanup 设置 src="" 时触发 onerror 导致重复播放
    let ended = false;

    audio.onended = () => {
      if (ended) return;
      ended = true;
      cleanup();
      options?.onEnd?.();
    };

    audio.onerror = () => {
      if (ended) return;
      ended = true;
      cleanup();
      // 降级期间仍保留 onEnd 引用，以便被新的 speakAI 中断
      currentOnEnd = options?.onEnd ?? null;
      fallbackToWebSpeech(text, options);
    };

    await audio.play();
  } catch (error: unknown) {
    // 如果是主动取消，不触发回调
    if (error instanceof Error && error.name === "AbortError") return;

    cleanup();
    console.warn("火山引擎 TTS 失败，降级到浏览器语音:", error);
    // 降级期间仍保留 onEnd 引用，以便被新的 speakAI 中断
    currentOnEnd = options?.onEnd ?? null;
    fallbackToWebSpeech(text, options);
  }
}

/**
 * 降级到浏览器 Web Speech API
 */
function fallbackToWebSpeech(text: string, options?: SpeakAIOptions): void {
  if (!isSupported()) {
    options?.onError?.("浏览器不支持语音朗读");
    return;
  }

  // 设置降级超时（Web Speech API 有时不触发 onend）
  const fallbackTimeout = setTimeout(() => {
    stopBrowser();
    options?.onEnd?.();
  }, Math.max(8000, text.length * 300));

  const utterance = speak(text, {
    rate: 0.85,
    onEnd: () => {
      clearTimeout(fallbackTimeout);
      currentOnEnd = null;
      options?.onEnd?.();
    },
    onError: () => {
      clearTimeout(fallbackTimeout);
      currentOnEnd = null;
      options?.onError?.("语音朗读失败");
    },
  });

  // speak() 返回 null 说明不支持
  if (!utterance) {
    clearTimeout(fallbackTimeout);
    options?.onError?.("浏览器不支持语音朗读");
  }
}

/**
 * 停止朗读
 */
export function stopAI(): void {
  cleanup();
  stopBrowser();
}

/**
 * 是否正在朗读
 */
export function isPlayingAI(): boolean {
  if (currentAudio && !currentAudio.paused && !currentAudio.ended) {
    return true;
  }
  return false;
}
