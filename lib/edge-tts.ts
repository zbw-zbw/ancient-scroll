/**
 * Edge TTS 浏览器端实现
 *
 * 直接在浏览器中通过 WebSocket 连接微软语音服务。
 * 浏览器有真实 IP 和 User-Agent，不会被微软封锁。
 * 不依赖 Node.js 的 ws 包，使用浏览器原生 WebSocket。
 */

const TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WS_URL = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TOKEN}`;

function uuid(): string {
  return crypto.randomUUID().replaceAll("-", "");
}

export interface TtsOptions {
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

/**
 * 在浏览器端调用微软 Edge TTS，返回音频 Blob。
 */
export function synthesize(text: string, options: TtsOptions = {}): Promise<Blob> {
  const {
    voice = "zh-CN-XiaoxiaoNeural",
    rate = "+0%",
    pitch = "+0Hz",
    volume = "+0%",
  } = options;

  return new Promise<Blob>((resolve, reject) => {
    const connectionId = uuid();
    const ws = new WebSocket(`${WS_URL}&ConnectionId=${connectionId}`);
    ws.binaryType = "arraybuffer";

    const audioChunks: ArrayBuffer[] = [];
    let resolved = false;

    // 超时保护
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        try { ws.close(); } catch {}
        reject(new Error("Edge TTS 请求超时"));
      }
    }, 15000);

    const finish = (blob: Blob) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        resolve(blob);
      }
    };

    const fail = (err: Error) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    };

    ws.onopen = () => {
      // 发送配置消息
      const speechConfig = JSON.stringify({
        context: {
          synthesis: {
            audio: {
              metadataoptions: {
                sentenceBoundaryEnabled: false,
                wordBoundaryEnabled: false,
              },
              outputFormat: "audio-24khz-48kbitrate-mono-mp3",
            },
          },
        },
      });

      ws.send(
        `X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${speechConfig}`
      );

      // 发送 SSML 消息
      const ssml =
        `X-RequestId:${uuid()}\r\nContent-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${new Date().toISOString()}\r\nPath:ssml\r\n\r\n` +
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>` +
        `<voice name='${voice}'><prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>` +
        `${escapeXml(text)}</prosody></voice></speak>`;

      ws.send(ssml);
    };

    ws.onmessage = (event) => {
      if (typeof event.data === "string") {
        // 文本消息，检查是否结束
        if (event.data.includes("turn.end")) {
          try { ws.close(); } catch {}
          finish(new Blob(audioChunks, { type: "audio/mpeg" }));
        }
      } else {
        // 二进制音频数据
        const buffer = event.data as ArrayBuffer;
        const view = new Uint8Array(buffer);
        const separator = "Path:audio\r\n";
        const encoder = new TextEncoder();
        const sepBytes = encoder.encode(separator);

        // 找到 "Path:audio\r\n" 之后的内容
        let sepIndex = -1;
        for (let i = 0; i <= view.length - sepBytes.length; i++) {
          let match = true;
          for (let j = 0; j < sepBytes.length; j++) {
            if (view[i + j] !== sepBytes[j]) {
              match = false;
              break;
            }
          }
          if (match) {
            sepIndex = i + sepBytes.length;
            break;
          }
        }

        if (sepIndex > 0) {
          audioChunks.push(buffer.slice(sepIndex));
        }
      }
    };

    ws.onerror = () => {
      fail(new Error("Edge TTS WebSocket 连接失败"));
    };

    ws.onclose = () => {
      if (!resolved) {
        if (audioChunks.length > 0) {
          finish(new Blob(audioChunks, { type: "audio/mpeg" }));
        } else {
          fail(new Error("Edge TTS 未收到音频数据"));
        }
      }
    };
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
