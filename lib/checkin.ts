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

function formatLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * 对抗式审查修复（时区 bug）：日期字符串 "YYYY-MM-DD" 若用 new Date(str) 解析，
 * 会得到 UTC 零点；而 getDay()/getDate()/setDate() 都按本地时区取值。
 * 负时区（如 UTC-8）下 UTC 零点对应本地前一天下午，星期计算整体偏移一天。
 * 本地日期必须按本地组件构造。
 */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/**
 * 两个日期字符串相差的天数。用 UTC 时间戳计算，
 * 不受本地时区与夏令时切换影响（DST 当天本地差可能是 23/25 小时）。
 */
function dayDiff(later: string, earlier: string): number {
  const [y1, m1, d1] = later.split("-").map(Number);
  const [y2, m2, d2] = earlier.split("-").map(Number);
  return Math.round((Date.UTC(y1, m1 - 1, d1) - Date.UTC(y2, m2 - 1, d2)) / 86_400_000);
}

function getToday(): string {
  return formatLocalDate(new Date());
}

function getYesterday(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return formatLocalDate(now);
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
    // UTC 时间戳差值：严格整天数，不受时区/夏令时影响
    if (dayDiff(sortedDates[i - 1], sortedDates[i]) === 1) {
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
  // 本地时区解析：保证 getDay()/setDate() 与 getToday() 的本地日期口径一致
  const todayDate = parseLocalDate(today);

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
    const dateStr = formatLocalDate(d);
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
