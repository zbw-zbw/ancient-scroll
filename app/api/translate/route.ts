import { NextResponse } from "next/server";
import { aiClient } from "@/lib/ai";
import { guardApiRequest } from "@/lib/api-guard";

const MAX_TEXT_LENGTH = 2000;
// 安全基线：context 仅为篇章名，必须有长度上限，否则可被注入超长文本放大 token 成本（安全报告 H-1）
const MAX_CONTEXT_LENGTH = 200;

export async function POST(request: Request) {
  // 安全基线：限流 + 请求体大小限制
  const blocked = guardApiRequest(request, {
    scope: "translate",
    limit: 20,
    windowMs: 60_000,
  });
  if (blocked) return blocked;

  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "翻译服务未配置，请检查 API 密钥" },
      { status: 503 }
    );
  }

  try {
    const { text, context } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid text" },
        { status: 400 }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: "待翻译文本过长，请控制在 2000 字以内" },
        { status: 400 }
      );
    }

    if (context !== undefined && typeof context !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid context" },
        { status: 400 }
      );
    }

    if (typeof context === "string" && context.length > MAX_CONTEXT_LENGTH) {
      return NextResponse.json(
        { error: "篇章信息过长" },
        { status: 400 }
      );
    }

    const completion = await aiClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是一位古典文学翻译专家。请将以下《山海经》原文翻译为通俗易懂的现代白话文。要求：1）忠实原文含义 2）语言流畅优美 3）适当补充理解所需的背景信息（用括号标注）4）控制在原文2倍字数以内。只输出译文，不要其他解释。",
        },
        {
          role: "user",
          content: `篇章：${context || "山海经"}\n原文：${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const translation = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "翻译请求失败，请稍后重试" },
      { status: 500 }
    );
  }
}
