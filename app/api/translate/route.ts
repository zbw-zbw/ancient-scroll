import { NextResponse } from "next/server";
import { aiClient } from "@/lib/ai";

export async function POST(request: Request) {
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
