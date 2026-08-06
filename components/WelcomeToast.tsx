"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconClose } from "@/components/icons";

const STORAGE_KEY = "gj_welcome_shown";

/**
 * 首次访问欢迎引导 —— 从底部滑入的轻量 banner
 * - localStorage 判断是否首次访问
 * - 页面加载后延迟 1s 显示
 * - 8s 无操作自动淡出
 * - 用户关闭或点击后不再显示
 */
export default function WelcomeToast() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    // 仅在客户端判断 localStorage
    let alreadyShown = false;
    try {
      alreadyShown = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage 不可用（隐私模式等），静默跳过
      return;
    }
    if (alreadyShown) return;

    // 延迟 1s 显示，让首页 hero 先完成入场动画
    const showTimer = setTimeout(() => {
      setRender(true);
      // 下一帧触发 transition
      requestAnimationFrame(() => setVisible(true));
    }, 1000);

    // 8s 后自动淡出
    const autoHideTimer = setTimeout(() => {
      handleClose();
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoHideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    // 等动画结束再卸载
    setTimeout(() => setRender(false), 400);
  };

  const handleExplore = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    router.push("/bestiary");
  };

  if (!render) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[480px] -translate-x-1/2 transition-all duration-400 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-cinnabar/20 bg-surface/95 px-4 py-3 shadow-xl backdrop-blur-md md:px-5 md:py-4">
        {/* 印章图标 */}
        <div className="flex h-10 w-10 flex-shrink-0 rotate-[-3deg] items-center justify-center rounded-sm border border-seal-red/40 bg-seal-bg/60">
          <span className="text-center font-calligraphy text-[8px] leading-tight text-seal-red">
            古籍
            <br />
            焕新
          </span>
        </div>

        {/* 文案 + 按钮 */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <p className="font-serif text-xs text-ink/80 sm:text-sm">
            欢迎来到古籍焕新！推荐先体验
            <span className="font-calligraphy text-cinnabar">「异兽图鉴」</span>
            感受 AI 水墨插画的魅力
          </p>
          <button
            onClick={handleExplore}
            className="flex-shrink-0 rounded-full bg-cinnabar px-4 py-1.5 font-serif text-xs text-white transition-colors hover:bg-cinnabar/90 active:scale-95 sm:text-sm"
          >
            立即体验
          </button>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          aria-label="关闭"
          className="flex-shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
