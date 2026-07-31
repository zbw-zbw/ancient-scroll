import { NextResponse } from "next/server";
import { getAiClient } from "@/lib/ai";
import { guardApiRequest } from "@/lib/api-guard";

export async function POST(request: Request) {
  // 安全基线：限流（用户可能快速连点难字，配额适当放宽）+ 请求体大小限制
  const blocked = guardApiRequest(request, {
    scope: "annotate",
    limit: 30,
    windowMs: 60_000,
  });
  if (blocked) return blocked;

  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "字词解读服务未配置，请检查 API 密钥" },
      { status: 503 }
    );
  }

  try {
    const { char, context } = await request.json();

    const MAX_CHAR_LENGTH = 50;
    const MAX_CONTEXT_LENGTH = 2000;

    if (!char || typeof char !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid char" },
        { status: 400 }
      );
    }

    if (char.length > MAX_CHAR_LENGTH) {
      return NextResponse.json(
        { error: "Char too long" },
        { status: 400 }
      );
    }

    if (context !== undefined && typeof context !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid context" },
        { status: 400 }
      );
    }

    if (context && context.length > MAX_CONTEXT_LENGTH) {
      return NextResponse.json(
        { error: "Context too long" },
        { status: 400 }
      );
    }

    const completion = await getAiClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是一位古汉语文字学专家。请解读以下古文中的字词。请提供：1）读音（拼音） 2）在此句中的含义 3）一句话的文化背景或延伸知识。格式要求：用JSON返回 {\"pinyin\": \"...\", \"meaning\": \"...\", \"detail\": \"...\"}，只返回JSON不要其他内容。",
        },
        {
          role: "user",
          content: `字词：${char}\n所在句子：${context || ""}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 400,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";

    // Try to parse JSON from the response
    let parsed;
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } catch {
      parsed = {
        pinyin: "",
        meaning: raw,
        detail: "",
      };
    }

    return NextResponse.json({
      pinyin: parsed.pinyin || "",
      meaning: parsed.meaning || "",
      detail: parsed.detail || "",
    });
  } catch (error) {
    console.error("Annotate API error:", error);
    return NextResponse.json(
      { error: "字词解读请求失败，请稍后重试" },
      { status: 500 }
    );
  }
}
