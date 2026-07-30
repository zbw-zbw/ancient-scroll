"use client";
import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

type ToastType = "success" | "error" | "info";
interface ToastAction {
  label: string;
  onClick: () => void;
}
interface Toast {
  id: number;
  message: string;
  type: ToastType;
  action?: ToastAction;
  exiting?: boolean;
}
interface ToastContextValue {
  toast: (message: string, type?: ToastType, options?: { action?: ToastAction }) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: number) => {
    // 先清理该 toast 可能仍在等待的自动关闭定时器，避免重复触发退出流程
    const pending = timersRef.current.get(id);
    if (pending) clearTimeout(pending);
    // Mark as exiting for fade-out animation
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    // Remove from DOM after animation completes
    const exitTimer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, 200);
    timersRef.current.set(id, exitTimer);
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", options?: { action?: ToastAction }) => {
      const id = ++counterRef.current;
      setToasts((prev) => [...prev, { id, message, type, action: options?.action }]);
      // Auto-dismiss after 5s if there's an action (give user time to click), else 3s
      const duration = options?.action ? 5000 : 3000;
      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  // 对抗式审查修复：原实现误用 useState 初始化器注册卸载清理——
  // 初始化器的返回值只会被当作 state 存储，清理函数永远不会执行，
  // Provider 卸载后挂起的定时器仍会回调 setState。
  // 改用 useEffect 清理才是正确语义。
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container - fixed top center */}
      <div className="fixed top-20 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-sm" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto animate-fade-in-down rounded-lg px-4 py-2.5 shadow-lg font-serif text-sm backdrop-blur-sm flex items-center gap-3 ${
              t.type === "error" ? "bg-seal-red/90 text-white"
              : t.type === "success" ? "bg-gold/90 text-white"
              : "bg-surface/90 text-ink border border-ink/10"
            }`}
          >
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <button
                onClick={() => {
                  t.action!.onClick();
                  removeToast(t.id);
                }}
                className={`flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-serif transition-colors min-h-[36px] inline-flex items-center ${
                  t.type === "error" || t.type === "success"
                    ? "bg-white/20 hover:bg-white/30 text-white"
                    : "bg-cinnabar/10 hover:bg-cinnabar/20 text-cinnabar"
                }`}
              >
                {t.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
