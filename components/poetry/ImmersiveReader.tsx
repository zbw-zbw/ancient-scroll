"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Poem } from "@/data/poems";
import CoverSlide from "./CoverSlide";
import PoemLineSlide from "./PoemLineSlide";
import EndingSlide from "./EndingSlide";
import ProgressDots from "./ProgressDots";
import { IconArrowLeft } from "@/components/icons";
import { useNavbarVisibility } from "@/components/NavbarVisibilityContext";
import { speak, stop as stopTTS, isSupported as ttsSupported } from "@/lib/tts";

interface ImmersiveReaderProps {
  poem: Poem;
  onBack: () => void;
}

export default function ImmersiveReader({ poem, onBack }: ImmersiveReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const programScrollRef = useRef(false);
  const programScrollTimerRef = useRef<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = poem.lines.length + 2;
  const { setNavbarVisible } = useNavbarVisibility();

  // 自动朗诵状态
  const [autoRecite, setAutoRecite] = useState(false);
  // 朗诵暂停状态（自动朗诵开启但暂停时为 true）
  const [paused, setPaused] = useState(false);
  const autoReciteRef = useRef(false);
  const pausedRef = useRef(false);

  const clearProgramScrollTimer = useCallback(() => {
    if (programScrollTimerRef.current) {
      window.clearTimeout(programScrollTimerRef.current);
      programScrollTimerRef.current = null;
    }
  }, []);

  const startProgrammaticScroll = useCallback(() => {
    clearProgramScrollTimer();
    programScrollRef.current = true;
    programScrollTimerRef.current = window.setTimeout(() => {
      programScrollRef.current = false;
    }, 700);
  }, [clearProgramScrollTimer]);

  // Intersection Observer to detect active slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll(".slide");
    const observer = new IntersectionObserver(
      (entries) => {
        if (programScrollRef.current) return;

        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          const index = Array.from(slides).indexOf(bestEntry.target);
          if (index !== -1) setCurrentSlide(index);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [poem.id]);

  // Fallback: when scrolled to the very bottom, force last slide active.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 24;
      if (nearBottom) {
        setCurrentSlide((prev) => {
          const last = totalSlides - 1;
          return prev === last ? prev : last;
        });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalSlides]);

  // Hide global navbar while in immersive mode
  useEffect(() => {
    setNavbarVisible(false);
    return () => {
      setNavbarVisible(true);
      clearProgramScrollTimer();
      stopTTS();
    };
  }, [setNavbarVisible, clearProgramScrollTimer]);

  // 获取当前 slide 对应的诗句文本
  const getSlideText = useCallback(
    (slideIndex: number): string | null => {
      // slide 0 是封面，最后一个 slide 是结尾页
      if (slideIndex === 0 || slideIndex === totalSlides - 1) return null;
      const lineIdx = slideIndex - 1;
      if (lineIdx >= 0 && lineIdx < poem.lines.length) {
        return poem.lines[lineIdx].text;
      }
      return null;
    },
    [poem.lines, totalSlides]
  );

  // 滚动到指定 slide
  const goToSlide = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const slides = container.querySelectorAll(".slide");
      const target = slides[index];
      if (target) {
        startProgrammaticScroll();
        setCurrentSlide(index);
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [startProgrammaticScroll]
  );

  // 自动朗诵核心逻辑：当 currentSlide 变化且自动朗诵开启时，朗读当前诗句
  useEffect(() => {
    if (!autoReciteRef.current || pausedRef.current) return;
    if (!ttsSupported()) return;

    // 封面页和结尾页不朗读
    if (currentSlide === 0) {
      // 封面页：等待 1.5 秒后自动翻到第一句
      const timer = setTimeout(() => {
        if (autoReciteRef.current && !pausedRef.current) {
          goToSlide(1);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (currentSlide === totalSlides - 1) {
      // 结尾页：停止朗诵
      stopTTS();
      setAutoRecite(false);
      autoReciteRef.current = false;
      return;
    }

    const text = getSlideText(currentSlide);
    if (!text) return;

    // 朗读当前诗句，完后等待 1 秒翻到下一句
    speak(text, {
      onEnd: () => {
        if (!autoReciteRef.current || pausedRef.current) return;
        const timer = setTimeout(() => {
          if (!autoReciteRef.current || pausedRef.current) return;
          const next = Math.min(currentSlide + 1, totalSlides - 1);
          if (next !== currentSlide) goToSlide(next);
        }, 1000);
        // Store timer for cleanup
        advanceTimerRef.current = timer;
      },
      onError: () => {
        // 出错时也继续翻页
        if (!autoReciteRef.current || pausedRef.current) return;
        const timer = setTimeout(() => {
          if (!autoReciteRef.current || pausedRef.current) return;
          const next = Math.min(currentSlide + 1, totalSlides - 1);
          if (next !== currentSlide) goToSlide(next);
        }, 1500);
        advanceTimerRef.current = timer;
      },
    });

    return () => {
      // 清理：当 slide 变化或组件卸载时停止当前朗读
      stopTTS();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, autoRecite, paused, totalSlides, getSlideText, goToSlide]);

  // 存储 advance timer 以便清理
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 清理 advance timer
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  // 切换自动朗诵
  const handleToggleAutoRecite = useCallback(() => {
    if (!ttsSupported()) return;

    if (autoRecite) {
      // 正在朗诵中：暂停
      if (!paused) {
        stopTTS();
        setPaused(true);
        pausedRef.current = true;
      } else {
        // 从暂停恢复
        setPaused(false);
        pausedRef.current = false;
        // 重新触发当前 slide 的朗读（通过改变一个依赖来触发 effect）
        // 直接调用 speak 会与 effect 冲突，用微妙的 state 技巧：强制重新进入 effect
        setCurrentSlide((prev) => prev);
      }
    } else {
      // 开启自动朗诵
      setAutoRecite(true);
      autoReciteRef.current = true;
      setPaused(false);
      pausedRef.current = false;
      // 如果在封面页，自动开始
      if (currentSlide === 0) {
        // 等待 effect 自动处理
      }
    }
  }, [autoRecite, paused, currentSlide]);

  // 手动导航时关闭自动朗诵
  const handleDotClick = useCallback((index: number) => {
    if (autoReciteRef.current) {
      stopTTS();
      setAutoRecite(false);
      autoReciteRef.current = false;
      setPaused(false);
      pausedRef.current = false;
    }
    goToSlide(index);
  }, [goToSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        // 滑动手势导航时关闭自动朗诵
        if (autoReciteRef.current) {
          stopTTS();
          setAutoRecite(false);
          autoReciteRef.current = false;
          setPaused(false);
          pausedRef.current = false;
        }
        const next = dx < 0
          ? Math.min(currentSlide + 1, totalSlides - 1)
          : Math.max(currentSlide - 1, 0);
        handleDotClick(next);
      }
    },
    [totalSlides, currentSlide, handleDotClick]
  );

  const handleBack = useCallback(() => {
    stopTTS();
    setNavbarVisible(true);
    onBack();
  }, [setNavbarVisible, onBack]);

  // Keyboard arrow navigation + ESC 退出沉浸模式
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        // 手动导航时关闭自动朗诵
        if (autoReciteRef.current) {
          stopTTS();
          setAutoRecite(false);
          autoReciteRef.current = false;
          setPaused(false);
          pausedRef.current = false;
        }
        const next = Math.min(currentSlide + 1, totalSlides - 1);
        if (next !== currentSlide) handleDotClick(next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (autoReciteRef.current) {
          stopTTS();
          setAutoRecite(false);
          autoReciteRef.current = false;
          setPaused(false);
          pausedRef.current = false;
        }
        const prev = Math.max(currentSlide - 1, 0);
        if (prev !== currentSlide) handleDotClick(prev);
      } else if (e.key === "Escape") {
        handleBack();
      } else if (e.key === " ") {
        // 空格键切换暂停/继续
        if (autoReciteRef.current) {
          e.preventDefault();
          handleToggleAutoRecite();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides, handleDotClick, handleBack, handleToggleAutoRecite]);

  const handleRestart = () => {
    stopTTS();
    const container = containerRef.current;
    if (!container) return;
    startProgrammaticScroll();
    setCurrentSlide(0);
    container.scrollTo({ top: 0, behavior: "auto" });
    if (autoReciteRef.current) {
      setAutoRecite(false);
      autoReciteRef.current = false;
      setPaused(false);
      pausedRef.current = false;
    }
  };

  // 当前是否正在朗读某句诗（用于高亮提示）
  const isRecitingLine =
    autoRecite && !paused && currentSlide > 0 && currentSlide < totalSlides - 1;

  return (
    <div
      ref={containerRef}
      className="immersive-container fixed inset-0 z-[60] h-dvh w-screen overflow-y-auto bg-immersive-bg"
      style={{ scrollSnapType: "y mandatory" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button with safe area support */}
      <button
        onClick={handleBack}
        className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-50 flex cursor-pointer items-center gap-1 rounded-full bg-black/30 px-4 py-2 font-serif text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/50 active:scale-95"
      >
        <IconArrowLeft className="h-4 w-4" />
        返回
      </button>

      {/* 自动朗诵控制按钮 — 结尾页不显示（没有诗句可朗诵） */}
      {ttsSupported() && currentSlide < totalSlides - 1 && (
        <button
          onClick={handleToggleAutoRecite}
          className={`fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-50 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 font-serif text-sm backdrop-blur-sm transition-all active:scale-95 ${
            autoRecite
              ? paused
                ? "bg-cinnabar/80 text-white"
                : "bg-cinnabar text-white shadow-lg"
              : "bg-black/30 text-white hover:bg-black/50"
          }`}
          title={
            autoRecite
              ? paused
                ? "继续朗诵"
                : "暂停朗诵"
              : "开启自动朗诵"
          }
        >
          {autoRecite && !paused ? (
            /* 正在朗诵：暂停图标 */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : autoRecite && paused ? (
            /* 已暂停：播放图标 */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            /* 未开启：喇叭图标 */
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
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
          <span className="hidden sm:inline">
            {autoRecite ? (paused ? "继续" : "暂停") : "朗诵"}
          </span>
          {autoRecite && !paused && (
            <span className="ml-0.5 flex items-center gap-0.5">
              <span
                className="h-1 w-1 rounded-full bg-white animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-1 w-1 rounded-full bg-white animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          )}
        </button>
      )}

      {/* Slides */}
      <CoverSlide poem={poem} active={currentSlide === 0} />
      {poem.lines.map((line, index) => (
        <PoemLineSlide
          key={index}
          line={line}
          active={currentSlide === index + 1}
          coverImage={poem.coverImage}
          reciting={isRecitingLine && currentSlide === index + 1}
        />
      ))}
      <EndingSlide
        poem={poem}
        active={currentSlide === totalSlides - 1}
        onRestart={handleRestart}
        onBack={handleBack}
      />

      <ProgressDots
        total={totalSlides}
        current={currentSlide}
        onDotClick={handleDotClick}
      />
    </div>
  );
}
