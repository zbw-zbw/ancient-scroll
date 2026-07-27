"use client";

import { forwardRef, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Disable hover lift effect */
  noHover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", noHover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-hidden rounded-xl border border-rule/30 bg-surface/60 transition-all duration-300 ${
          noHover
            ? ""
            : "hover:-translate-y-1 hover:shadow-lg hover:border-rule/60 active:-translate-y-0.5"
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
