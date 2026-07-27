"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ParticleType } from "@/data/poems";

// 花瓣形状
const PetalShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2C8 8 4 12 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-14Z" />
  </svg>
);

// 雪花形状
const SnowflakeShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
  </svg>
);

// 落叶形状
const LeafShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2C6 6 2 12 2 17c0 2.8 2.2 5 5 5 5 0 11-4 15-10-4 2-8 1-10-1C12 12 12 6 12 2Z" />
  </svg>
);

// 星形
const StarShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="m12 2 2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6Z" />
  </svg>
);

interface ParticlesProps {
  type?: ParticleType;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  useStarShape: boolean;
}

export default function Particles({ type }: ParticlesProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 在 useMemo 中预先计算所有随机值（SSR 安全）
  const particles = useMemo<Particle[]>(() => {
    if (!type || !mounted || reducedMotion) return [];
    if (typeof window === "undefined") return [];
    // 移动端（<768px）3-5 个，桌面端 6-10 个
    const isMobile = window.innerWidth < 768;
    const min = isMobile ? 3 : 6;
    const max = isMobile ? 5 : 10;
    const count = min + Math.floor(Math.random() * (max - min + 1));
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      // 每个粒子使用随机的 animationDelay（0-5s）
      delay: Math.random() * 5,
      // 每个粒子使用随机的 animationDuration（基础值 + 0-4s 随机偏移）
      duration: getBaseDuration(type) + Math.random() * 4,
      size: getSize(type) + Math.random() * getSizeVar(type),
      opacity: getOpacity(type),
      useStarShape: Math.random() > 0.5,
    }));
  }, [type, mounted, reducedMotion]);

  if (!type || !mounted || reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <ParticleElement key={p.id} type={type} particle={p} />
      ))}
    </div>
  );
}

function ParticleElement({
  type,
  particle,
}: {
  type: ParticleType;
  particle: Particle;
}) {
  // 雨滴：使用 .animate-rain-tilt 类（倾斜 15 度下落）
  if (type === "rain") {
    return (
      <div
        className="absolute top-0 w-px animate-rain-tilt"
        style={{
          left: `${particle.left}%`,
          height: `${particle.size * 3}px`,
          backgroundColor: "rgba(255,255,255,0.5)",
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          opacity: particle.opacity,
        }}
      />
    );
  }

  // 星光：使用 .animate-star 类（随机闪烁，位置固定）
  if (type === "stars") {
    return (
      <div
        className="absolute animate-star"
        style={{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          fontSize: `${particle.size}px`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          opacity: particle.opacity,
          color: "rgba(255,255,255,0.9)",
          textShadow: "0 0 8px rgba(255,255,255,0.6)",
        }}
      >
        {particle.useStarShape ? (
          <StarShape className="h-[1em] w-[1em]" />
        ) : (
          <span className="h-[0.4em] w-[0.4em] rounded-full bg-current" />
        )}
      </div>
    );
  }

  // 萤火虫：使用 .animate-firefly-glow 类（随机游走 + 发光效果）
  if (type === "fireflies") {
    return (
      <div
        className="absolute rounded-full animate-firefly-glow"
        style={{
          left: `${particle.left}%`,
          top: `${20 + particle.top * 0.75}%`,
          width: particle.size,
          height: particle.size,
          backgroundColor: "#fde047",
          boxShadow: `0 0 ${particle.size * 2}px #fde047`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          opacity: particle.opacity,
        }}
      />
    );
  }

  // 花瓣 / 雪花 / 落叶：根据类型选择形状和动画类
  const { shape, animClass } =
    type === "petals"
      ? { shape: <PetalShape className="h-[1em] w-[1em]" />, animClass: "animate-petal" }
      : type === "snow"
      ? { shape: <SnowflakeShape className="h-[1em] w-[1em]" />, animClass: "animate-snow" }
      : type === "leaves"
      ? { shape: <LeafShape className="h-[1em] w-[1em]" />, animClass: "animate-leaf-drift" }
      : { shape: <StarShape className="h-[1em] w-[1em]" />, animClass: "animate-petal" };

  return (
    <div
      className={`absolute ${animClass}`}
      style={{
        left: `${particle.left}%`,
        fontSize: `${particle.size}px`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
        opacity: particle.opacity,
      }}
    >
      {shape}
    </div>
  );
}

// 各类型粒子的基础动画时长（秒），实际值为基础值 + 0-4s 随机偏移
function getBaseDuration(type: ParticleType): number {
  switch (type) {
    case "rain":
      return 0.6;
    case "snow":
      return 6;
    case "fireflies":
      return 7;
    case "stars":
      return 2.5;
    case "petals":
      return 6;
    case "leaves":
      return 9;
    default:
      return 5;
  }
}

function getSize(type: ParticleType): number {
  switch (type) {
    case "rain":
      return 10;
    case "snow":
      return 12;
    case "petals":
      return 16;
    case "leaves":
      return 18;
    case "fireflies":
      return 5;
    case "stars":
      return 8;
    default:
      return 12;
  }
}

function getSizeVar(type: ParticleType): number {
  switch (type) {
    case "rain":
      return 6;
    case "snow":
      return 10;
    case "petals":
      return 12;
    case "leaves":
      return 10;
    case "fireflies":
      return 3;
    case "stars":
      return 6;
    default:
      return 8;
  }
}

function getOpacity(type: ParticleType): number {
  switch (type) {
    case "snow":
      return 0.7;
    case "fireflies":
      return 0.8;
    case "rain":
      return 0.4;
    default:
      return 0.75;
  }
}
