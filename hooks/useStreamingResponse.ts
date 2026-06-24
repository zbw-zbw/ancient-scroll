"use client";

import { useCallback, useRef, useState } from "react";

interface StreamingCallbacks {
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export function useStreamingResponse() {
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStreaming = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      callbacks: StreamingCallbacks,
    ) => {
      setIsStreaming(true);
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: abortControllerRef.current.signal,
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
        if (error instanceof Error && error.name === "AbortError") {
          callbacks.onComplete();
        } else {
          callbacks.onError(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [],
  );

  const abortStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { isStreaming, startStreaming, abortStreaming };
}
