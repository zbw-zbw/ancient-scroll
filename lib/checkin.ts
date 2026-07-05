const CHECKIN_KEY = "ancient-scroll-checkin";

export interface CheckinData {
  dates: string[]; // ISO date strings like "2026-06-30"
  currentStreak: number;
  longestStreak: number;
}

function safeParse<T>(parser: () => T, fallback: T): T {
  try {
    return parser();
  } catch {
    return fallback;
  }
}

const defaultCheckinData: CheckinData = {
  dates: [],
  currentStreak: 0,
  longestStreak: 0,
};

export function getCheckinData(): CheckinData {
  if (typeof window === "undefined") return defaultCheckinData;
  return safeParse(() => {
    const raw = localStorage.getItem(CHECKIN_KEY);
    if (!raw) return defaultCheckinData;
    const parsed = JSON.parse(raw);
    return {
      dates: Array.isArray(parsed.dates) ? parsed.dates : [],
      currentStreak: typeof parsed.currentStreak === "number" ? parsed.currentStreak : 0,
      longestStreak: typeof parsed.longestStreak === "number" ? parsed.longestStreak : 0,
    };
  }, defaultCheckinData);
}

function saveCheckinData(data: CheckinData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHECKIN_KEY, JSON.stringify(data));
  } catch {}
}

function getToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getYesterday(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function getTodayCheckedIn(): boolean {
  const data = getCheckinData();
  return data.dates.includes(getToday());
}

export function checkIn(): CheckinData {
  const data = getCheckinData();
  const today = getToday();

  if (data.dates.includes(today)) {
    return data;
  }

  data.dates.push(today);

  // Calculate streak: count consecutive days ending at today
  let streak = 1;
  const sortedDates = [...data.dates].sort().reverse();
  for (let i = 1; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i - 1]);
    const prev = new Date(sortedDates[i]);
    const diffDays = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  data.currentStreak = streak;
  if (streak > data.longestStreak) {
    data.longestStreak = streak;
  }

  saveCheckinData(data);
  // Dispatch event so AchievementWatcher and other components can react
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
  }
  return data;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  checkedInToday: boolean;
  checkedInYesterday: boolean;
  weeklyDays: { date: string; dayLabel: string; checkedIn: boolean; isToday: boolean }[];
}

export function getStreakInfo(): StreakInfo {
  const data = getCheckinData();
  const today = getToday();
  const yesterday = getYesterday();
  const todayDate = new Date(today);

  // Recalculate current streak based on last check-in date
  // to handle the case where the user missed a day (streak should reset)
  let actualCurrentStreak = data.currentStreak;
  if (data.dates.length > 0) {
    const sortedDates = [...data.dates].sort().reverse();
    const lastCheckIn = sortedDates[0];
    if (lastCheckIn !== today && lastCheckIn !== yesterday) {
      // Last check-in was neither today nor yesterday → streak broken
      actualCurrentStreak = 0;
    }
    // If last check-in is today or yesterday, the stored streak is still valid
  }

  // Get the Monday of the current week
  const dayOfWeek = todayDate.getDay(); // 0 = Sunday
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() + mondayOffset);

  const dayLabels = ["一", "二", "三", "四", "五", "六", "日"];

  const weeklyDays = dayLabels.map((dayLabel, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      date: dateStr,
      dayLabel,
      checkedIn: data.dates.includes(dateStr),
      isToday: dateStr === today,
    };
  });

  return {
    currentStreak: actualCurrentStreak,
    longestStreak: data.longestStreak,
    checkedInToday: data.dates.includes(today),
    checkedInYesterday: data.dates.includes(yesterday),
    weeklyDays,
  };
}
