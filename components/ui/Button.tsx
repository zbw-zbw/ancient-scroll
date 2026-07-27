"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cinnabar text-white shadow-md hover:bg-cinnabar/90 hover:shadow-lg hover:-translate-y-px",
  outline:
    "border border-ink/15 bg-transparent text-ink hover:border-cinnabar/40 hover:text-cinnabar hover:-translate-y-px",
  ghost:
    "bg-transparent text-light-ink hover:bg-ink/5 hover:text-cinnabar",
};

const sizeClasses: Record<Size, string> = {
  default: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-1.5 text-xs",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full font-serif transition-all duration-200 active:scale-[0.97] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
