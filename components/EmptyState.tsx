import type { ReactNode } from "react";
import { IconSearch } from "@/components/icons";

interface EmptyStateProps {
  message?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  message = "未找到匹配的内容",
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  // New rich layout
  if (title || description) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {icon ?? <IconSearch className="mb-4 h-12 w-12 text-muted" />}
        {title && (
          <h3 className="font-calligraphy text-2xl text-ink">{title}</h3>
        )}
        {description && (
          <p className="mt-2 max-w-xs font-serif text-sm text-muted">{description}</p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }

  // Legacy simple layout
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon ?? <IconSearch className="mb-3 h-12 w-12 text-muted" />}
      <p className="font-serif text-light-ink">{message}</p>
    </div>
  );
}
