/**
 * 火山引擎语音合成服务端调用
 *
 * 使用 V1 HTTP 非流式接口，返回 base64 编码的音频。
 * 文档：https://www.volcengine.com/docs/6561/1257584
 */

import { randomUUID } from "crypto";

const TTS_API = "https://openspeech.bytedance.com/api/v1/tts";

export interface VolcTtsOptions {
  voiceType?: string;
  speedRatio?: number; // 0.2 ~ 3.0, 默认 1.0
  volumeRatio?: number; // 0.1 ~ 3.0, 默认 1.0
  pitchRatio?: number; // 0.1 ~ 3.0, 默认 1.0
  encoding?: "mp3" | "pcm" | "ogg_opus" | "wav";
}

export async function synthesize(
  text: string,
  options: VolcTtsOptions = {}
): Promise<Buffer> {
  const appId = process.env.VOLCENGINE_TTS_APPID;
  const token = process.env.VOLCENGINE_TTS_TOKEN;
  const cluster = process.env.VOLCENGINE_TTS_CLUSTER || "volcano_tts";

  if (!appId || !token) {
    throw new Error(
      "缺少火山引擎 TTS 配置：VOLCENGINE_TTS_APPID 或 VOLCENGINE_TTS_TOKEN"
    );
  }

  const {
    voiceType = "zh_female_shuangkuai_moon_bigtts",
    speedRatio = 1.0,
    volumeRatio = 1.0,
    pitchRatio = 1.0,
    encoding = "mp3",
  } = options;

  const reqId = randomUUID();

  const payload = {
    app: {
      appid: appId,
      token: token,
      cluster: cluster,
    },
    user: {
      uid: "ancient-scroll-user",
    },
    audio: {
      voice_type: voiceType,
      encoding: encoding,
      speed_ratio: speedRatio,
      volume_ratio: volumeRatio,
      pitch_ratio: pitchRatio,
    },
    request: {
      reqid: reqId,
      text: text,
      text_type: "plain",
      operation: "query",
    },
  };

  const response = await fetch(TTS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer;${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `火山引擎 TTS 请求失败: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  if (result.code !== 3000) {
    throw new Error(`火山引擎 TTS 合成失败: ${result.code} - ${result.message}`);
  }

  // 返回的音频是 base64 编码
  const audioBase64 = result.data;
  return Buffer.from(audioBase64, "base64");
}
