import { NextRequest } from "next/server";
import { aiClient } from "../../../lib/ai";
import { getCharacterById } from "../../../data/characters";

export const runtime = "edge";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return Response.json(
      { error: "对话服务未配置，请检查 API 密钥" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const characterId = body?.characterId;
    const messages: unknown = body?.messages;

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: "消息格式不正确" },
        { status: 400 }
      );
    }

    const character = getCharacterById(characterId);
    if (!character) {
      return Response.json({ error: "Character not found" }, { status: 404 });
    }

    // Only allow user/assistant roles; drop any "system" messages to prevent
    // prompt injection. Limit the number of messages and truncate content.
    const safeMessages: ChatMessage[] = messages
      .filter((m): m is ChatMessage => {
        if (!m || typeof m !== "object") return false;
        const msg = m as { role?: unknown; content?: unknown };
        return (
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string"
        );
      })
      .slice(0, MAX_MESSAGES)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, MAX_CONTENT_LENGTH),
      }));

    const systemMessage: ChatMessage = {
      role: "system",
      content: character.systemPrompt,
    };

    const stream = await aiClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [systemMessage, ...safeMessages],
      stream: true,
      temperature: 0.8,
      max_tokens: 300,
    }, { signal: req.signal });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              const data = `data: ${JSON.stringify({ text: content })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
