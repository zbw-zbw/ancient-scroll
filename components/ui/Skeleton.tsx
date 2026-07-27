"use client";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = 16,
  rounded = "rounded-md",
  className = "",
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={`skeleton ${rounded} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
