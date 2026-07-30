"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface StreamingCallbacks {
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export function useStreamingResponse() {
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Abort any active stream when the component unmounts
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const startStreaming = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      callbacks: StreamingCallbacks,
    ) => {
      // Abort any previous stream before starting a new one
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsStreaming(true);

      // 对抗式审查修复（流式竞态）：仅当本次流仍是“当前流”时才允许回调。
      // 否则已中止的旧流在 abort 前已读入的 chunk 会继续触发 onChunk，
      // 把旧回复文本追加进新回复，造成内容串流。
      const isCurrent = () =>
        abortControllerRef.current === controller && !controller.signal.aborted;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`,
          );
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // 旧流在 abort 前已读入的数据直接丢弃，不再进入回调
          if (!isCurrent()) return;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              if (isCurrent()) callbacks.onComplete();
              return;
            }

            try {
              const parsed = JSON.parse(data) as { text?: string };
              if (parsed.text && isCurrent()) {
                callbacks.onChunk(parsed.text);
              }
            } catch {
              // Ignore malformed chunks
            }
          }
        }

        if (isCurrent()) callbacks.onComplete();
      } catch (error) {
        // AbortError: do NOT call onComplete — the stream was cancelled
        // intentionally (clear/switch/unmount), not completed successfully.
        if (error instanceof Error && error.name === "AbortError") {
          // Silent — no callbacks
        } else if (isCurrent()) {
          callbacks.onError(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      } finally {
        // 只有“当前流”的 finally 才能复位状态：
        // 旧流的 finally 若无条件 setIsStreaming(false)，会把新流的状态误关，
        // 导致新流仍在输出时发送按钮就被解锁。
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    [],
  );

  const abortStreaming = useCallback(() => {
    if (!abortControllerRef.current) return;
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
    // 同步复位状态：否则旧流的 finally 异步到达前 isStreaming 仍为 true，
    // 此期间用户点击“重新生成/发送”会被 handleSend 的 isStreaming 守卫静默丢弃
    setIsStreaming(false);
  }, []);

  return { isStreaming, startStreaming, abortStreaming };
}
