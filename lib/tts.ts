/**
 * 统一 TTS（Text-To-Speech）工具模块。
 *
 * 封装 Web Speech API 的 speechSynthesis，提供：
 * - 用户偏好的音色 / 语速读取
 * - speak() 一键朗读（自动取消上一个）
 * - stop() 停止
 * - isSupported() 能力检测
 * - 按角色性别选择合适音色
 *
 * localStorage keys:
 * - "ancient-scroll:voice"      音色名称（voice.name）
 * - "ancient-scroll:speechRate"  语速（字符串数字）
 * - "ancient-scroll:speech-rate" 语速（旧 key，向后兼容）
 */

const VOICE_KEY = "ancient-scroll:voice";
const RATE_KEY_NEW = "ancient-scroll:speechRate";
const RATE_KEY_OLD = "ancient-scroll:speech-rate";

/** 女性角色列表：朗读时优先选女声 */
const FEMALE_CHARACTER_IDS = ["wuzetian", "liqingzhao"];

export function isSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * 获取所有中文语音（lang 以 "zh" 开头）。
 * 在非浏览器环境返回空数组。
 */
export function getZhVoices(): SpeechSynthesisVoice[] {
  if (!isSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("zh"));
}

/**
 * 获取用户在设置页选择的音色；若未设置则回退到第一个中文音色。
 */
export function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (!isSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  try {
    const savedName = localStorage.getItem(VOICE_KEY);
    if (savedName) {
      const found = voices.find((v) => v.name === savedName);
      if (found) return found;
    }
  } catch {}
  return voices.find((v) => v.lang.startsWith("zh")) || null;
}

/**
 * 根据角色性别选择音色。
 * 女性角色优先找女声，其他角色优先找男声；
 * 若找不到匹配性别的则回退到用户偏好音色。
 */
export function getVoiceForCharacter(characterId?: string): SpeechSynthesisVoice | null {
  if (!isSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter((v) => v.lang.startsWith("zh"));
  if (zhVoices.length === 0) return null;

  const isFemale = characterId ? FEMALE_CHARACTER_IDS.includes(characterId) : false;

  // 尝试按名称关键词匹配性别
  const femaleKeywords = ["female", "女", "woman"];
  const maleKeywords = ["male", "男", "man"];

  if (isFemale) {
    const femaleVoice = zhVoices.find((v) =>
      femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (femaleVoice) return femaleVoice;
  } else {
    const maleVoice = zhVoices.find((v) =>
      maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (maleVoice) return maleVoice;
  }

  // 回退到用户偏好
  return getPreferredVoice();
}

/**
 * 读取用户设置的语速，默认 0.85。
 */
export function getSpeechRate(): number {
  try {
    const saved = localStorage.getItem(RATE_KEY_NEW) || localStorage.getItem(RATE_KEY_OLD);
    if (saved) {
      const rate = parseFloat(saved);
      if (Number.isFinite(rate) && rate > 0) return rate;
    }
  } catch {}
  return 0.85;
}

export interface SpeakOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: () => void;
}

/**
 * 全局引用，防止 utterance 被垃圾回收导致无声（Chrome 已知问题）。
 */
let _currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * 朗读指定文本。会先取消正在进行的朗读。
 * 返回创建的 utterance（可用于绑定额外事件）。
 */
export function speak(text: string, options?: SpeakOptions): SpeechSynthesisUtterance | null {
  if (!isSupported()) return null;

  // 先取消已有朗读
  window.speechSynthesis.cancel();
  _currentUtterance = null;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = options?.voice || getPreferredVoice();
  utterance.rate = options?.rate ?? getSpeechRate();
  utterance.pitch = options?.pitch ?? 1;
  utterance.lang = "zh-CN";

  // 包装回调，确保结束后释放全局引用
  const cleanup = () => {
    if (_currentUtterance === utterance) {
      _currentUtterance = null;
    }
  };
  if (options?.onEnd) {
    utterance.onend = () => { cleanup(); options.onEnd!(); };
  } else {
    utterance.onend = cleanup;
  }
  if (options?.onError) {
    utterance.onerror = () => { cleanup(); options.onError!(); };
  } else {
    utterance.onerror = cleanup;
  }

  // 保持引用防止 GC 回收（Chrome bug workaround）
  _currentUtterance = utterance;

  // 使用微延迟确保 cancel 已完成，避免部分浏览器无声
  setTimeout(() => {
    if (_currentUtterance === utterance) {
      window.speechSynthesis.speak(utterance);
    }
  }, 50);

  return utterance;
}

/**
 * 朗读指定文本（不取消已有朗读，用于队列式连续朗读）。
 */
export function speakQueued(text: string, options?: SpeakOptions): SpeechSynthesisUtterance | null {
  if (!isSupported()) return null;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = options?.voice || getPreferredVoice();
  utterance.rate = options?.rate ?? getSpeechRate();
  utterance.pitch = options?.pitch ?? 1;
  utterance.lang = "zh-CN";
  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * 停止所有朗读。
 */
export function stop(): void {
  if (!isSupported()) return;
  _currentUtterance = null;
  window.speechSynthesis.cancel();
}

/**
 * 当前是否正在朗读。
 */
export function isSpeaking(): boolean {
  if (!isSupported()) return false;
  return window.speechSynthesis.speaking;
}

/**
 * 保存用户选择的音色到 localStorage。
 */
export function savePreferredVoice(voiceName: string): void {
  try {
    localStorage.setItem(VOICE_KEY, voiceName);
  } catch {}
}

/**
 * 保存用户选择的语速到 localStorage（同时写入新旧 key）。
 */
export function saveSpeechRate(rate: number): void {
  try {
    const str = String(rate);
    localStorage.setItem(RATE_KEY_NEW, str);
    localStorage.setItem(RATE_KEY_OLD, str);
  } catch {}
}
