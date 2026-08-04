import { NextRequest, NextResponse } from "next/server";
import { synthesize } from "@/lib/volcengine-tts";

export const runtime = "nodejs";
export const maxDuration = 30;

// 音色映射：前端传入的音色 ID → 火山引擎 voice_type
const VOICE_MAP: Record<string, string> = {
  // 女声
  xiaoxiao: "zh_female_shuangkuai_moon_bigtts", // 爽快女声 — 温暖亲切
  xiaoyi: "zh_female_qingxin_moon_bigtts", // 清新女声 — 活泼
  xiaomeng: "zh_female_wenrou_moon_bigtts", // 温柔女声 — 柔和
  // 男声
  yunxi: "zh_male_qingnian_mars_bigtts", // 青年男声 — 年轻
  yunyang: "zh_male_chunhou_mars_bigtts", // 醇厚男声 — 成熟
  yunjian: "zh_male_jingqiangkanye_emo_mars_bigtts", // 京腔侃爷 — 浑厚
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
