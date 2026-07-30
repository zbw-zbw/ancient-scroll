"use client";

import { IconClose } from "@/components/icons";

interface ModalCloseButtonProps {
  onClick: () => void;
  /** Visual variant: "light" for dark/image backgrounds, "default" for light backgrounds, "ghost" for inline use */
  variant?: "light" | "default" | "ghost";
  /** Override position classes (default: absolute right-4 top-4 z-10) */
  className?: string;
  ariaLabel?: string;
}

/**
 * Unified close button for all modal/dialog overlays.
 * Ensures consistent 44px touch target, visual style, and position.
 */
export default function ModalCloseButton({
  onClick,
  variant = "default",
  className = "absolute right-4 top-4 z-10",
  ariaLabel = "关闭",
}: ModalCloseButtonProps) {
  const variantClasses =
    variant === "light"
      ? "bg-ink/20 text-white hover:bg-ink/30"
      : variant === "ghost"
        ? "text-light-ink hover:text-ink hover:bg-ink/5"
        : "bg-surface/80 text-light-ink shadow-md hover:text-ink hover:bg-surface";

  return (
    <button
      onClick={onClick}
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors active:scale-95 ${variantClasses} ${className}`}
      aria-label={ariaLabel}
    >
      <IconClose className="h-5 w-5" />
    </button>
  );
}
