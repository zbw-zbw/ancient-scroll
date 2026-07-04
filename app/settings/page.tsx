"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/components/Toast";
import { downloadBackup, importData, clearAllData, getDataStats } from "@/lib/dataManager";
import { getReadingPrefs, saveReadingPrefs, type ReadingPrefs } from "@/lib/progress";

export default function SettingsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalKeys: 0, estimatedSize: 0 });
  const [clearStep, setClearStep] = useState(0);
  const [importing, setImporting] = useState(false);
  const [prefs, setPrefs] = useState<ReadingPrefs>({
    fontSize: "md",
    showTranslation: true,
  });
  const [speechRate, setSpeechRate] = useState(0.85);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setStats(getDataStats());
    const savedPrefs = getReadingPrefs();
    setPrefs(savedPrefs);
    // Load speech rate from localStorage
    const savedRate = localStorage.getItem("ancient-scroll-speech-rate");
    if (savedRate) setSpeechRate(parseFloat(savedRate));
  }, []);

  const handleExport = useCallback(() => {
    downloadBackup();
    toast("数据已导出", "success");
  }, [toast]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const result = importData(text);
      if (result.success) {
        toast(result.message, "success");
        setStats(getDataStats());
        // Reload after a short delay to let data settle
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast(result.message, "error");
      }
    } catch {
      toast("文件读取失败", "error");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [toast]);

  const handleClear = useCallback(() => {
    if (clearStep === 0) {
      setClearStep(1);
      toast("再次点击确认清除所有数据", "info");
      clearTimerRef.current = setTimeout(() => setClearStep(0), 3000);
    } else {
      clearAllData();
      toast("所有数据已清除", "success");
      setClearStep(0);
      setStats(getDataStats());
      clearTimeout(clearTimerRef.current);
      setTimeout(() => window.location.reload(), 1500);
    }
  }, [clearStep, toast]);

  return (
    <main className="min-h-screen bg-xuan px-4 pb-12 md:px-6 md:pb-16">
      <PageHeader title="设置" subtitle="数据管理与偏好设置" />

      <div className="mx-auto max-w-[700px] pt-8 md:pt-12 space-y-8">
        {/* Preferences Section */}
        <section className="rounded-2xl bg-surface/60 p-6 md:p-8">
          <h2 className="font-calligraphy text-xl text-ink mb-1">阅读偏好</h2>
          <p className="font-serif text-xs text-muted mb-6">自定义你的阅读体验</p>

          <div className="space-y-6">
            {/* Font Size */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-sm text-ink">默认字号</p>
                <p className="font-serif text-xs text-muted">阅读页面的文字大小</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-xuan/50 p-1">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      const newPrefs = { ...prefs, fontSize: size };
                      setPrefs(newPrefs);
                      saveReadingPrefs(newPrefs);
                      toast("字号已更新", "success");
                    }}
                    className={`rounded-full px-4 py-1.5 min-h-[36px] font-serif text-xs transition-colors ${
                      prefs.fontSize === size
                        ? "bg-cinnabar/10 text-cinnabar"
                        : "text-light-ink hover:bg-surface"
                    }`}
                  >
                    {size === "sm" ? "小" : size === "md" ? "中" : "大"}
                  </button>
                ))}
              </div>
            </div>

            {/* Show Translation Default */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-sm text-ink">默认显示译文</p>
                <p className="font-serif text-xs text-muted">阅读时是否默认显示白话翻译</p>
              </div>
              <button
                onClick={() => {
                  const newPrefs = { ...prefs, showTranslation: !prefs.showTranslation };
                  setPrefs(newPrefs);
                  saveReadingPrefs(newPrefs);
                  toast(newPrefs.showTranslation ? "已开启默认译文" : "已关闭默认译文", "success");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  prefs.showTranslation ? "bg-cinnabar" : "bg-ink/20"
                }`}
                role="switch"
                aria-checked={prefs.showTranslation}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  prefs.showTranslation ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>

            {/* Speech Rate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-serif text-sm text-ink">朗读语速</p>
                  <p className="font-serif text-xs text-muted">古文朗读的语速</p>
                </div>
                <span className="font-serif text-xs text-cinnabar">
                  {speechRate < 0.8 ? "慢速" : speechRate <= 0.9 ? "正常" : "快速"}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.2"
                step="0.05"
                value={speechRate}
                onChange={(e) => {
                  const rate = parseFloat(e.target.value);
                  setSpeechRate(rate);
                  localStorage.setItem("ancient-scroll-speech-rate", String(rate));
                }}
                className="w-full h-1.5 rounded-full bg-ink/10 appearance-none cursor-pointer accent-cinnabar"
              />
              <div className="mt-1 flex justify-between font-serif text-xs text-muted">
                <span>慢</span>
                <span>快</span>
              </div>
            </div>
          </div>
        </section>

        {/* Data Backup Section */}
        <section className="rounded-2xl bg-surface/60 p-6 md:p-8">
          <h2 className="font-calligraphy text-xl text-ink mb-1">数据备份</h2>
          <p className="font-serif text-xs text-muted mb-6">导出你的阅读进度、收藏、笔记等数据，或从备份文件恢复</p>

          {/* Stats */}
          <div className="mb-6 flex items-center gap-6 rounded-xl bg-xuan/50 p-4">
            <div>
              <p className="font-serif text-xs text-muted">存储项数</p>
              <p className="font-calligraphy text-2xl text-cinnabar">{stats.totalKeys}</p>
            </div>
            <div className="h-8 w-px bg-ink/10" />
            <div>
              <p className="font-serif text-xs text-muted">估计大小</p>
              <p className="font-calligraphy text-2xl text-ink">
                {stats.estimatedSize < 1024
                  ? `${stats.estimatedSize} B`
                  : `${(stats.estimatedSize / 1024).toFixed(1)} KB`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-full bg-cinnabar px-5 py-2.5 font-serif text-sm text-white shadow-sm transition-all hover:bg-cinnabar/90 hover:shadow-md active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              导出数据
            </button>
            <button
              onClick={handleImportClick}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-full bg-surface border border-ink/10 px-5 py-2.5 font-serif text-sm text-light-ink shadow-sm transition-all hover:bg-xuan-dark/30 hover:border-ink/20 active:scale-95 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {importing ? "导入中..." : "导入数据"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="mt-3 font-serif text-xs text-muted">
            导入数据将覆盖当前数据，建议先导出备份
          </p>
        </section>

        {/* Clear Data Section */}
        <section className="rounded-2xl bg-surface/60 p-6 md:p-8">
          <h2 className="font-calligraphy text-xl text-ink mb-1">清除数据</h2>
          <p className="font-serif text-xs text-muted mb-6">清除所有本地存储的数据，包括阅读进度、收藏、笔记、对话记录等。此操作不可撤销。</p>

          <button
            onClick={handleClear}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-serif text-sm shadow-sm transition-all active:scale-95 ${
              clearStep === 0
                ? "bg-seal-red/10 text-seal-red hover:bg-seal-red/20"
                : "bg-seal-red text-white hover:bg-seal-red/90 animate-pulse"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            {clearStep === 0 ? "清除所有数据" : "确认清除？再次点击"}
          </button>
        </section>

        {/* About Section */}
        <section className="rounded-2xl bg-surface/60 p-6 md:p-8">
          <h2 className="font-calligraphy text-xl text-ink mb-1">关于</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-muted">版本</span>
              <span className="font-serif text-sm text-light-ink">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-muted">技术栈</span>
              <div className="flex gap-2">
                <span className="rounded-full bg-xuan/50 px-3 py-1 font-serif text-xs text-light-ink">Next.js</span>
                <span className="rounded-full bg-xuan/50 px-3 py-1 font-serif text-xs text-light-ink">DeepSeek AI</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-muted">数据存储</span>
              <span className="font-serif text-sm text-light-ink">本地浏览器</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-ink/5 pt-4">
            <p className="font-serif text-xs text-muted">所有数据均存储在本地浏览器中，不会上传到服务器</p>
            <a
              href="https://github.com/zbw-zbw/ancient-scroll"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-serif text-sm text-light-ink hover:text-cinnabar transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
