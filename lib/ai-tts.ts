/**
 * AI TTS (Edge TTS) 客户端工具
 *
 * 通过服务端 API 路由 /api/tts 调用微软 Edge TTS 引擎合成语音，
 * 在前端管理音频播放。当网络不可用或 API 调用失败时，
 * 调用方可 fallback 到浏览器原生 Web Speech API（lib/tts.ts）。
 */

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
  { id: "xiaoyi", name: "晓伊", gender: "female", description: "活泼明快，适合知识讲解" },
  { id: "xiaomeng", name: "晓梦", gender: "female", description: "柔和轻盈，适合睡前故事" },
  { id: "yunxi", name: "云希", gender: "male", description: "年轻温和，适合古文朗读" },
  { id: "yunyang", name: "云扬", gender: "male", description: "成熟沉稳，适合历史人物" },
  { id: "yunjian", name: "云健", gender: "male", description: "浑厚有力，适合山海经原文" },
];

const VOICE_KEY = "ancient-scroll:ai-voice";
const RATE_KEY = "ancient-scroll:ai-rate";

// 音频播放管理
let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;
let currentAbortController: AbortController | null = null;

export function getPreferredAIVoice(): AIVoice {
  try {
    const saved = localStorage.getItem(VOICE_KEY);
    if (saved && AI_VOICES.find((v) => v.id === saved)) {
      return saved as AIVoice;
    }
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
    if (saved) return parseInt(saved, 10);
  } catch {}
  return 0; // 默认正常语速
}

export function saveAIRate(rate: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(rate));
  } catch {}
}

/**
 * 根据角色性别自动选择音色
 */
export function getVoiceForCharacter(characterId?: string): AIVoice {
  const femaleIds = ["wuzetian", "liqingzhao", "mulan"];
  if (characterId && femaleIds.includes(characterId)) {
    return "xiaoxiao";
  }
  return "yunyang"; // 男性角色用成熟男声
}

/**
 * 调用 AI TTS 接口合成并播放语音
 *
 * 返回一个 Promise，在音频开始播放时 resolve，在播放结束时通过 onEnd 回调通知。
 * 如果合成或播放失败，通过 onError 回调通知，调用方可 fallback 到 Web Speech API。
 */
export async function speakAI(
  text: string,
  options?: {
    voice?: AIVoice;
    rate?: number;
    onEnd?: () => void;
    onError?: () => void;
  }
): Promise<void> {
  // 先停止当前播放
  stopAI();

  const voice = options?.voice || getPreferredAIVoice();
  const rate = options?.rate ?? getAIRate();

  // 创建 AbortController 以便中途取消
  currentAbortController = new AbortController();

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice, rate }),
      signal: currentAbortController.signal,
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    currentObjectUrl = url;

    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      cleanup();
      options?.onEnd?.();
    };
    audio.onerror = () => {
      cleanup();
      options?.onError?.();
    };

    await audio.play();
  } catch (error) {
    // AbortError 是正常的中途取消，不算错误
    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }
    cleanup();
    options?.onError?.();
  }
}

/**
 * 停止当前 AI TTS 播放
 */
export function stopAI(): void {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}

/**
 * 是否正在播放
 */
export function isPlayingAI(): boolean {
  return currentAudio !== null && !currentAudio.paused;
}

function cleanup(): void {
  currentAudio = null;
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}
