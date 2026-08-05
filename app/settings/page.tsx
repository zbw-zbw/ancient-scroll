"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/components/Toast";
import { downloadBackup, importData, clearAllData, getDataStats } from "@/lib/dataManager";
import { getReadingPrefs, saveReadingPrefs, type ReadingPrefs } from "@/lib/progress";
import { stop } from "@/lib/tts";
import {
  AI_VOICES,
  type AIVoice,
  getPreferredAIVoice,
  savePreferredAIVoice,
  getAIRate,
  saveAIRate,
  speakAI,
  stopAI,
} from "@/lib/ai-tts";

export default function SettingsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalKeys: 0, estimatedSize: 0 });
  const [clearStep, setClearStep] = useState(0);
  const [importing, setImporting] = useState(false);
  const [prefs, setPrefs] = useState<ReadingPrefs>({
    fontSize: "md",
    showTranslation: true,
  });
  const [aiRate, setAiRate] = useState(0);
  const [selectedAIVoice, setSelectedAIVoice] = useState<AIVoice>("xiaoxiao");
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setStats(getDataStats());
    const savedPrefs = getReadingPrefs();
    setPrefs(savedPrefs);
    // 加载 AI 音色偏好和语速
    setSelectedAIVoice(getPreferredAIVoice());
    setAiRate(getAIRate());
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

  // 试听指定 AI 音色（失败时 fallback 到浏览器 Web Speech API）
  const handlePreviewVoice = useCallback(async (voiceId: string) => {
    // 如果正在试听这个音色，点击则停止
    if (previewingVoice === voiceId) {
      stopAI();
      stop();
      setPreviewingVoice(null);
      return;
    }
    // 停止之前的试听
    stopAI();
    stop();
    setPreviewingVoice(voiceId);

    try {
      await speakAI("春眠不觉晓，处处闻啼鸟。", {
        voice: voiceId as AIVoice,
        rate: aiRate,
        onEnd: () => setPreviewingVoice((prev) => (prev === voiceId ? null : prev)),
        onError: (msg) => {
          setPreviewingVoice((prev) => (prev === voiceId ? null : prev));
          toast(msg || "语音试听失败，请检查网络连接", "error");
        },
      });
    } catch {
      setPreviewingVoice((prev) => (prev === voiceId ? null : prev));
      toast("语音试听失败，请检查网络连接", "error");
    }
  }, [aiRate, previewingVoice, toast]);

  // 选择 AI 音色并保存：切换音色时停止试听
  const handleAIVoiceChange = useCallback(
    (voiceId: AIVoice) => {
      if (previewingVoice) {
        stopAI();
        stop();
        setPreviewingVoice(null);
      }
      setSelectedAIVoice(voiceId);
      savePreferredAIVoice(voiceId);
      toast("音色已保存", "success");
    },
    [toast, previewingVoice],
  );

  // 页面卸载时停止朗读
  useEffect(() => {
    return () => {
      stopAI();
      stop();
    };
  }, []);

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
    <main className="min-h-dvh bg-xuan pb-12 md:pb-16">
      <PageHeader title="设置" subtitle="数据管理与偏好设置" compact />

      <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6 md:pt-12 space-y-8">
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

            {/* AI Speech Rate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-serif text-sm text-ink">AI 朗读语速</p>
                  <p className="font-serif text-xs text-muted">百分比偏移，负值变慢，正值变快</p>
                </div>
                <span className="font-serif text-xs text-cinnabar">
                  {aiRate === 0 ? "正常" : aiRate > 0 ? `快${aiRate}%` : `慢${Math.abs(aiRate)}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={aiRate}
                onChange={(e) => {
                  const rate = parseInt(e.target.value, 10);
                  setAiRate(rate);
                  saveAIRate(rate);
                }}
                className="w-full h-1.5 rounded-full bg-ink/10 appearance-none cursor-pointer accent-cinnabar"
              />
              <div className="mt-1 flex justify-between font-serif text-xs text-muted">
                <span>慢</span>
                <span>正常</span>
                <span>快</span>
              </div>
            </div>

            {/* AI Voice Selection */}
            <div>
              <div className="mb-4">
                <p className="font-serif text-sm text-ink flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-cinnabar">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                  AI 朗读音色
                </p>
                <p className="font-serif text-xs text-muted mt-0.5">火山引擎智能语音，点击卡片选择，点击试听预览效果</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AI_VOICES.map((voice) => {
                  const isSelected = voice.id === selectedAIVoice;
                  const isPreviewing = voice.id === previewingVoice;
                  return (
                    <div
                      key={voice.id}
                      onClick={() => handleAIVoiceChange(voice.id)}
                      className={`relative rounded-xl p-3 cursor-pointer transition-all border ${
                        isSelected
                          ? "border-cinnabar/40 bg-cinnabar/5 shadow-sm"
                          : "border-ink/8 bg-xuan/20 hover:border-ink/15 hover:bg-xuan/40"
                      }`}
                    >
                      {/* 选中标记 */}
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-cinnabar">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}

                      {/* 音色信息 */}
                      <div className="mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-calligraphy text-base ${isSelected ? "text-cinnabar" : "text-ink"}`}>
                            {voice.name}
                          </span>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                            voice.gender === "female" ? "bg-pink-400" : "bg-blue-400"
                          }`} />
                        </div>
                        <p className="font-serif text-[11px] text-muted mt-1 leading-tight line-clamp-2">
                          {voice.description}
                        </p>
                      </div>

                      {/* 试听按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewVoice(voice.id);
                        }}
                        className={`w-full flex items-center justify-center gap-1 rounded-lg py-1.5 font-serif text-xs transition-colors ${
                          isPreviewing
                            ? "bg-cinnabar/10 text-cinnabar"
                            : "bg-ink/5 text-light-ink hover:bg-ink/8"
                        }`}
                      >
                        {isPreviewing ? (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 animate-pulse">
                              <rect x="6" y="5" width="4" height="14" rx="1" />
                              <rect x="14" y="5" width="4" height="14" rx="1" />
                            </svg>
                            停止
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            试听
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="mt-3 font-serif text-xs text-muted flex items-start gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
                网络不可用时自动切换为浏览器内置语音
              </p>
            </div>
          </div>

          {/* Reset to defaults */}
          <div className="mt-6 border-t border-ink/8 pt-4">
            <button
              onClick={() => {
                const defaultPrefs: ReadingPrefs = { fontSize: "md", showTranslation: true };
                setPrefs(defaultPrefs);
                saveReadingPrefs(defaultPrefs);
                setAiRate(0);
                saveAIRate(0);
                setSelectedAIVoice("xiaoxiao");
                savePreferredAIVoice("xiaoxiao");
                if (previewingVoice) {
                  stopAI();
                  stop();
                  setPreviewingVoice(null);
                }
                toast("已重置为默认设置", "success");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-xuan/30 px-4 py-2 font-serif text-xs text-muted transition-colors hover:border-ink/20 hover:text-light-ink active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              重置为默认设置
            </button>
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
