"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

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
}
interface ToastContextValue {
  toast: (message: string, type?: ToastType, options?: { action?: ToastAction }) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", options?: { action?: ToastAction }) => {
      const id = ++counterRef.current;
      setToasts((prev) => [...prev, { id, message, type, action: options?.action }]);
      // Auto-dismiss after 5s if there's an action (give user time to click), else 3s
      setTimeout(
        () => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        },
        options?.action ? 5000 : 3000
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container - fixed top center */}
      <div className="fixed top-20 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none" aria-live="polite">
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
            <span>{t.message}</span>
            {t.action && (
              <button
                onClick={() => {
                  t.action!.onClick();
                  setToasts((prev) => prev.filter((x) => x.id !== t.id));
                }}
                className={`flex-shrink-0 rounded px-2 py-0.5 text-xs font-serif transition-colors ${
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
