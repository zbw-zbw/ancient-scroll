import type { ReactNode } from "react";
import { IconSearch } from "@/components/icons";

interface EmptyStateProps {
  message?: string;
  icon?: ReactNode;
}

export default function EmptyState({
  message = "未找到匹配的内容",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon ?? <IconSearch className="mb-3 h-12 w-12 text-muted" />}
      <p className="font-serif text-light-ink">{message}</p>
    </div>
  );
}
