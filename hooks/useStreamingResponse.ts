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

      setIsStreaming(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;

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

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              callbacks.onComplete();
              setIsStreaming(false);
              abortControllerRef.current = null;
              return;
            }

            try {
              const parsed = JSON.parse(data) as { text?: string };
              if (parsed.text) {
                callbacks.onChunk(parsed.text);
              }
            } catch {
              // Ignore malformed chunks
            }
          }
        }

        callbacks.onComplete();
      } catch (error) {
        // AbortError: do NOT call onComplete — the stream was cancelled
        // intentionally (clear/switch/unmount), not completed successfully.
        if (error instanceof Error && error.name === "AbortError") {
          // Silent — no callbacks
        } else {
          callbacks.onError(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        setIsStreaming(false);
      }
    },
    [],
  );

  const abortStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  return { isStreaming, startStreaming, abortStreaming };
}
