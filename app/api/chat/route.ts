import { NextRequest } from "next/server";
import { aiClient } from "../../../lib/ai";
import { getCharacterById } from "../../../data/characters";

export const runtime = "edge";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return new Response(
      JSON.stringify({ error: "对话服务未配置，请检查 API 密钥" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const { characterId, messages } = (await req.json()) as {
      characterId: string;
      messages: ChatMessage[];
    };

    const character = getCharacterById(characterId);
    if (!character) {
      return new Response(JSON.stringify({ error: "Character not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content: character.systemPrompt,
    };

    const stream = await aiClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [systemMessage, ...messages],
      stream: true,
      temperature: 0.8,
      max_tokens: 300,
    });

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
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
