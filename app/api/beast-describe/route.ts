import { NextResponse } from "next/server";
import { aiClient } from "@/lib/ai";

const MAX_NAME_LENGTH = 100;
const MAX_ORIGINAL_TEXT_LENGTH = 2000;

export async function POST(request: Request) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "异兽解读服务未配置，请检查 API 密钥" },
      { status: 503 }
    );
  }

  try {
    const { name, originalText } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid name" },
        { status: 400 }
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: "异兽名称过长" },
        { status: 400 }
      );
    }

    if (originalText !== undefined && typeof originalText !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid originalText" },
        { status: 400 }
      );
    }

    if (
      typeof originalText === "string" &&
      originalText.length > MAX_ORIGINAL_TEXT_LENGTH
    ) {
      return NextResponse.json(
        { error: "原文描述过长，请控制在 2000 字以内" },
        { status: 400 }
      );
    }

    const completion = await aiClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是一位上古神话学者。根据《山海经》对异兽的原文描述，用生动有趣的现代中文重新描述这只异兽。要求：1）描写外貌要有画面感 2）融入文化背景和趣味知识 3）语气像在给朋友讲一个有趣的故事 4）控制在120-180字。只输出描述文字。",
        },
        {
          role: "user",
          content: `异兽名称：${name}\n原文描述：${originalText || ""}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const description = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Beast describe API error:", error);
    return NextResponse.json(
      { error: "异兽描述请求失败，请稍后重试" },
      { status: 500 }
    );
  }
}
