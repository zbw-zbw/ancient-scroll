/**
 * AI TTS (Edge TTS) 客户端工具
 *
 * 直接在浏览器中通过 WebSocket 调用微软 Edge TTS 引擎合成语音，
 * 不经过服务端中转（避免 Vercel 服务器 IP 被微软封锁）。
 * 当 Edge TTS 连接失败时，自动降级到浏览器原生 Web Speech API。
 */

import { synthesize } from "@/lib/edge-tts";
import { speak as speakFallback } from "@/lib/tts";

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

// AI 音色 ID 到 Edge TTS 音色名称的映射
const VOICE_MAP: Record<AIVoice, string> = {
  xiaoxiao: "zh-CN-XiaoxiaoNeural",
  xiaoyi: "zh-CN-XiaoyiNeural",
  xiaomeng: "zh-CN-XiaomengNeural",
  yunxi: "zh-CN-YunxiNeural",
  yunyang: "zh-CN-YunyangNeural",
  yunjian: "zh-CN-YunjianNeural",
};

const VOICE_KEY = "ancient-scroll:ai-voice";
const RATE_KEY = "ancient-scroll:ai-rate";

// 音频播放管理
let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;

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
 * 调用浏览器端 Edge TTS 合成并播放语音。
 * 如果 Edge TTS 失败，自动降级到浏览器原生 Web Speech API。
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

  const voiceName = VOICE_MAP[voice] || VOICE_MAP.xiaoxiao;
  const rateStr = rate >= 0 ? `+${rate}%` : `${rate}%`;

  try {
    // 直接在浏览器端合成（不走服务端）
    const blob = await synthesize(text.slice(0, 500), {
      voice: voiceName,
      rate: rateStr,
    });

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
      // 播放失败时降级到浏览器 TTS
      fallbackToWebSpeech(text, options);
    };

    await audio.play();
  } catch (error) {
    // Edge TTS 连接失败，静默降级到浏览器原生语音
    console.warn("Edge TTS 失败，降级到浏览器语音:", error);
    cleanup();
    fallbackToWebSpeech(text, options);
  }
}

/**
 * 降级到浏览器原生 Web Speech API
 */
function fallbackToWebSpeech(
  text: string,
  options?: {
    voice?: AIVoice;
    rate?: number;
    onEnd?: () => void;
    onError?: () => void;
  }
): void {
  try {
    speakFallback(text, {
      onEnd: options?.onEnd,
      onError: options?.onError,
    });
  } catch {
    options?.onError?.();
  }
}

/**
 * 停止当前 AI TTS 播放
 */
export function stopAI(): void {
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
