import { NextRequest, NextResponse } from "next/server";
import { tts } from "edge-tts";

// 可用的中文音色列表
const VOICES = {
  // 女声
  xiaoxiao: "zh-CN-XiaoxiaoNeural",      // 晓晓 - 温暖亲切（默认女声）
  xiaoyi: "zh-CN-XiaoyiNeural",          // 晓伊 - 活泼
  xiaomeng: "zh-CN-XiaomengNeural",      // 晓梦 - 柔和
  // 男声
  yunxi: "zh-CN-YunxiNeural",            // 云希 - 年轻男声（默认男声）
  yunyang: "zh-CN-YunyangNeural",        // 云扬 - 成熟男声
  yunjian: "zh-CN-YunjianNeural",        // 云健 - 浑厚
} as const;

type VoiceKey = keyof typeof VOICES;

export async function POST(request: NextRequest) {
  try {
    const { text, voice = "xiaoxiao", rate = 0 } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "缺少 text 参数" }, { status: 400 });
    }

    // 限制文本长度（避免滥用）
    const trimmedText = text.slice(0, 2000);

    // 确定音色
    const voiceName = VOICES[voice as VoiceKey] || VOICES.xiaoxiao;

    // 构建语速字符串：rate 为百分比偏移，如 -10 表示慢10%，+20 表示快20%
    const rateStr = rate >= 0 ? `+${rate}%` : `${rate}%`;

    const audioBuffer = await tts(trimmedText, {
      voice: voiceName,
      rate: rateStr,
    });

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400", // 缓存24小时
      },
    });
  } catch (error) {
    console.error("TTS synthesis error:", error);
    return NextResponse.json({ error: "语音合成失败" }, { status: 500 });
  }
}
