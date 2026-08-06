"use client";

interface SectionProgressProps {
  /** 左侧标签文字，如"阅读进度"、"已读诗词" */
  label: string;
  /** 当前完成数 */
  current: number;
  /** 总数 */
  total: number;
  /** 进度条颜色，默认朱砂红渐变 */
  color?: string;
  /** 右侧是否显示 count/total，默认 true */
  showCount?: boolean;
  /** 额外的 className */
  className?: string;
}

/**
 * 统一的栏目进度条组件，样式与异兽图鉴 CollectionProgress 一致。
 * 用于双语阅读、诗境漫游、古今对话等栏目的顶部进度展示。
 */
export default function SectionProgress({
  label,
  current,
  total,
  color = "from-cinnabar to-seal-red",
  showCount = true,
  className = "",
}: SectionProgressProps) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

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
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
