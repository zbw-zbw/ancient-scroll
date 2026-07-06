"use client";

import { useCallback, useEffect, useState } from "react";
import { getStreakInfo, checkIn, getTodayCheckedIn } from "@/lib/checkin";
import type { StreakInfo } from "@/lib/checkin";
import { useToast } from "@/components/Toast";

export default function CheckInPanel() {
  const [streakInfo, setStreakInfo] = useState<StreakInfo | null>(null);
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [stampAnim, setStampAnim] = useState(false);
  const { toast } = useToast();

  const refresh = useCallback(() => {
    setStreakInfo(getStreakInfo());
    setJustCheckedIn(getTodayCheckedIn());
  }, []);

  useEffect(() => {
    refresh();
    // Listen for progress changes (checkin dispatches them)
    const handler = () => refresh();
    window.addEventListener("ancient-scroll:progress-changed", handler);
    return () => window.removeEventListener("ancient-scroll:progress-changed", handler);
  }, [refresh]);

  const handleCheckIn = () => {
    checkIn();
    refresh();
    const info = getStreakInfo();
    if (info && !justCheckedIn) {
      // Trigger stamp animation
      setStampAnim(true);
      setTimeout(() => setStampAnim(false), 600);
      toast(`签到成功！连续第 ${info.currentStreak} 天`, "success");
    }
  };

  if (!streakInfo) return null;

  return (
    <section className="fade-in relative w-full py-10 md:py-16">
      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="rounded-2xl bg-surface/60 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-calligraphy text-xl text-ink">每日签到</h3>
            {streakInfo.checkedInToday && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cinnabar/10 px-3 py-1 font-serif text-xs text-cinnabar">
                <span className="h-1.5 w-1.5 rounded-full bg-cinnabar" />
                已签到
              </span>
            )}
          </div>

          {/* 7-day mini calendar */}
          <div className="mt-6 flex items-center justify-center gap-3 md:gap-4">
            {streakInfo.weeklyDays.map((day) => (
              <div key={day.date} className="flex flex-col items-center gap-1.5">
                <span className="font-serif text-xs text-muted">{day.dayLabel}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    day.checkedIn && day.isToday
                      ? "bg-cinnabar text-white shadow-sm"
                      : day.checkedIn
                      ? "bg-cinnabar/20 text-cinnabar"
                      : day.isToday
                      ? "border-2 border-cinnabar/40 bg-transparent text-cinnabar"
                      : "bg-ink/5 text-muted"
                  }`}
                >
                  {day.checkedIn ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span className="font-serif text-xs">
                      {new Date(day.date + "T00:00:00").getDate()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Streak display */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-cinnabar"
              >
                <path
                  d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                  fill="currentColor"
                  opacity="0.8"
                />
              </svg>
              <span className="font-serif text-sm text-ink">
                连续阅读 第
                <span className="mx-0.5 font-calligraphy text-lg text-cinnabar">
                  {streakInfo.currentStreak}
                </span>
                天
              </span>
            </div>
            <div className="h-4 w-px bg-ink/10" />
            <span className="font-serif text-sm text-muted">
              最长记录
              <span className="mx-0.5 font-calligraphy text-lg text-ink">
                {streakInfo.longestStreak}
              </span>
              天
            </span>
          </div>

          {/* Check-in button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCheckIn}
              disabled={streakInfo.checkedInToday}
              className={`relative inline-flex items-center gap-2 rounded-full px-6 py-3 min-h-[44px] font-serif text-sm transition-all duration-300 active:scale-95 ${
                streakInfo.checkedInToday
                  ? "cursor-not-allowed bg-ink/5 text-muted"
                  : "bg-cinnabar text-white shadow-sm hover:bg-cinnabar/90 hover:shadow-md"
              }`}
            >
              {/* Stamp animation overlay */}
              {stampAnim && (
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className="flex h-12 w-12 rotate-[-12deg] items-center justify-center rounded-sm border-2 border-cinnabar bg-xuan/80 font-calligraphy text-sm text-cinnabar"
                    style={{ animation: "stamp-press 0.6s ease-out forwards" }}
                  >
                    签
                  </span>
                </span>
              )}
              {streakInfo.checkedInToday ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  今日已签到
                </>
              ) : (
                "签到"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
