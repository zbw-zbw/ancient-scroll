import { NextRequest, NextResponse } from "next/server";
import { synthesize } from "@/lib/volcengine-tts";

export const runtime = "nodejs";
export const maxDuration = 30;

// 音色映射：前端传入的音色 ID → 火山引擎 voice_type
const VOICE_MAP: Record<string, string> = {
  // 女声
  xiaoxiao: "BV001_streaming", // 通用女声 — 温暖亲切
  xiaoyi: "BV700_streaming", // 灿灿 — 活泼明快
  xiaomeng: "BV033_streaming", // 温柔女声 — 柔和舒缓
  // 男声
  yunxi: "BV002_streaming", // 通用男声 — 年轻阳光
  yunyang: "BV102_streaming", // 儒雅男声 — 成熟稳重
  yunjian: "BV701_streaming", // 擎苍 — 浑厚有力
};

type VoiceKey = keyof typeof VOICE_MAP;

export async function POST(request: NextRequest) {
  try {
    const { text, voice = "xiaoxiao", rate = 0 } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "缺少 text 参数" }, { status: 400 });
    }

    // 限制文本长度
    const trimmedText = text.slice(0, 500);

    // 确定音色
    const voiceType = VOICE_MAP[voice as VoiceKey] || VOICE_MAP.xiaoxiao;

    // rate 偏移(-50~+50)转为 speedRatio(0.5~1.5)
    // rate=0 对应 speedRatio=1.0
    const speedRatio = Math.max(0.5, Math.min(1.5, 1.0 + rate / 100));

    const audioBuffer = await synthesize(trimmedText, {
      voiceType,
      speedRatio,
    });

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS synthesis error:", error);
    const message = error instanceof Error ? error.message : "语音合成失败";
    return NextResponse.json(
      { error: "语音合成失败", detail: message },
      { status: 500 }
    );
  }
}
