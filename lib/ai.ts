import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getAiClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
      timeout: 30_000,
      maxRetries: 1,
    });
  }
  return _client;
}
