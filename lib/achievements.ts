import { getProgress, getFavorites } from "./progress";
import { getCheckinData } from "./checkin";
import { getAllNotes } from "./notes";
import { getCollectedBeasts } from "./collection";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
  unlocked: boolean;
  progress?: { current: number; total: number };
  category: "reading" | "poetry" | "bestiary" | "dialogue" | "checkin" | "notes" | "favorites";
}

const TOTAL_CHAPTERS = 6;
const TOTAL_POEMS = 12;
const TOTAL_BEASTS = 20;
const TOTAL_CHARACTERS = 9;

export function getAchievements(): Achievement[] {
  const progress = getProgress();
  const favorites = getFavorites();
  const checkin = getCheckinData();
  const notes = getAllNotes();

  const readCount = new Set(progress.readChapters).size;
  const poemCount = new Set(progress.completedPoems).size;
  const dialogueCount = new Set(progress.dialogueCharacters).size;
  const collectedBeasts = getCollectedBeasts().length;
  const favCount = favorites.favoritePoems.length + favorites.favoriteBeasts.length;
  const checkinDays = checkin.dates.length;

  return [
    // Reading achievements
    {
      id: "first-chapter",
      title: "初窥门径",
      description: "阅读第一个篇章",
      icon: "📖",
      unlocked: readCount >= 1,
      category: "reading",
    },
    {
      id: "half-chapters",
      title: "渐入佳境",
      description: "阅读3个篇章",
      icon: "📜",
      unlocked: readCount >= 3,
      progress: { current: readCount, total: 3 },
      category: "reading",
    },
    {
      id: "all-chapters",
      title: "通读山海",
      description: "阅读全部6个篇章",
      icon: "🏔️",
      unlocked: readCount >= TOTAL_CHAPTERS,
      progress: { current: readCount, total: TOTAL_CHAPTERS },
      category: "reading",
    },
    // Poetry achievements
    {
      id: "first-poem",
      title: "诗心初动",
      description: "完整阅读一首诗",
      icon: "🌸",
      unlocked: poemCount >= 1,
      category: "poetry",
    },
    {
      id: "five-poems",
      title: "诗情画意",
      description: "完整阅读5首诗",
      icon: "🎨",
      unlocked: poemCount >= 5,
      progress: { current: poemCount, total: 5 },
      category: "poetry",
    },
    {
      id: "all-poems",
      title: "诗境大成",
      description: "完整阅读全部12首诗",
      icon: "✨",
      unlocked: poemCount >= TOTAL_POEMS,
      progress: { current: poemCount, total: TOTAL_POEMS },
      category: "poetry",
    },
    // Bestiary achievements
    {
      id: "first-beast",
      title: "初识异兽",
      description: "收集第一只异兽",
      icon: "🐾",
      unlocked: collectedBeasts >= 1,
      category: "bestiary",
    },
    {
      id: "half-beasts",
      title: "异兽研究者",
      description: "收集10只异兽",
      icon: "🦊",
      unlocked: collectedBeasts >= 10,
      progress: { current: collectedBeasts, total: 10 },
      category: "bestiary",
    },
    {
      id: "all-beasts",
      title: "山海图鉴",
      description: "收集全部20只异兽",
      icon: "🐉",
      unlocked: collectedBeasts >= TOTAL_BEASTS,
      progress: { current: collectedBeasts, total: TOTAL_BEASTS },
      category: "bestiary",
    },
    // Dialogue achievements
    {
      id: "first-dialogue",
      title: "跨越千年",
      description: "与第一位古人对话",
      icon: "💬",
      unlocked: dialogueCount >= 1,
      category: "dialogue",
    },
    {
      id: "all-dialogues",
      title: "谈古论今",
      description: "与全部9位古人对话",
      icon: "🏮",
      unlocked: dialogueCount >= TOTAL_CHARACTERS,
      progress: { current: dialogueCount, total: TOTAL_CHARACTERS },
      category: "dialogue",
    },
    // Check-in achievements
    {
      id: "first-checkin",
      title: "初来乍到",
      description: "首次签到",
      icon: "📅",
      unlocked: checkinDays >= 1,
      category: "checkin",
    },
    {
      id: "streak-7",
      title: "一周不辍",
      description: "连续签到7天",
      icon: "🔥",
      unlocked: checkin.currentStreak >= 7,
      progress: { current: checkin.currentStreak, total: 7 },
      category: "checkin",
    },
    {
      id: "streak-30",
      title: "月月坚持",
      description: "连续签到30天",
      icon: "🏆",
      unlocked: checkin.currentStreak >= 30,
      progress: { current: checkin.currentStreak, total: 30 },
      category: "checkin",
    },
    // Notes achievements
    {
      id: "first-note",
      title: "好记性不如烂笔头",
      description: "记录第一条笔记",
      icon: "✏️",
      unlocked: notes.length >= 1,
      category: "notes",
    },
    {
      id: "ten-notes",
      title: "博闻强识",
      description: "记录10条笔记",
      icon: "📚",
      unlocked: notes.length >= 10,
      progress: { current: notes.length, total: 10 },
      category: "notes",
    },
    // Favorites achievements
    {
      id: "first-favorite",
      title: "怦然心动",
      description: "第一次收藏",
      icon: "❤️",
      unlocked: favCount >= 1,
      category: "favorites",
    },
    {
      id: "five-favorites",
      title: "珍藏馆",
      description: "收藏5件内容",
      icon: "💎",
      unlocked: favCount >= 5,
      progress: { current: favCount, total: 5 },
      category: "favorites",
    },
  ];
}

export function getUnlockedCount(): number {
  return getAchievements().filter((a) => a.unlocked).length;
}

export function getTotalCount(): number {
  return getAchievements().length;
}
