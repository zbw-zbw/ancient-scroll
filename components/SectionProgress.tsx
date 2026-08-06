"use client";

import { useEffect, useRef, useState } from "react";

interface SectionProgressProps {
  /** 左侧标签文字，如"阅读进度"、"已读诗词" */
  label: string;
  /** 当前完成数 */
  current: number;
  /** 总数 */
  total: number;
  /** 右侧是否显示 count/total，默认 true */
  showCount?: boolean;
  /** 额外的 className */
  className?: string;
}

/**
 * 统一的栏目进度条组件，样式与异兽图鉴 CollectionProgress 完全一致。
 * 所有页面使用同一颜色（朱砂→朱印红渐变），同一动画效果。
 */
export default function SectionProgress({
  label,
  current,
  total,
  showCount = true,
  className = "",
}: SectionProgressProps) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  const [displayPercent, setDisplayPercent] = useState(0);
  const initialized = useRef(false);

  // 动画：首次挂载时从 0 过渡到目标值，后续更新直接过渡
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setDisplayPercent(percent);
      initialized.current = true;
    });
    return () => cancelAnimationFrame(timer);
  }, [percent]);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-serif text-sm text-light-ink">{label}</span>
        {showCount && (
          <span className="font-serif text-sm text-cinnabar">
            {current}/{total}
          </span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cinnabar to-seal-red transition-all duration-700 ease-out"
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}
