import { chapters } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { poems } from "@/data/poems";
import { characters } from "@/data/characters";
import { totalQuizQuestions } from "@/data/quiz";
import { AI_VOICES } from "@/lib/ai-tts";
import DataStatsClient from "./DataStatsClient";

/**
 * Server Component — 在服务端计算所有数据量，避免将完整数据文件打入客户端 bundle。
 */
export default function DataStats() {
  const counts = {
    chapters: chapters.length,
    sentences: chapters.reduce((sum, c) => sum + c.sentences.length, 0),
    beasts: beasts.length,
    poems: poems.length,
    characters: characters.length,
    quizQuestions: totalQuizQuestions,
    voices: AI_VOICES.length,
  };

  return <DataStatsClient counts={counts} />;
}
