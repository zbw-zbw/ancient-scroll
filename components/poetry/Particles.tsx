"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ParticleType } from "@/data/poems";

const PetalShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2C8 8 4 12 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-14Z" />
  </svg>
);

const SnowflakeShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
  </svg>
);

const LeafShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2C6 6 2 12 2 17c0 2.8 2.2 5 5 5 5 0 11-4 15-10-4 2-8 1-10-1C12 12 12 6 12 2Z" />
  </svg>
);

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
 delay: number;
 duration: number;
 size: number;
 opacity: number;
}

export default function Particles({ type }: ParticlesProps) {
 const [reducedMotion, setReducedMotion] = useState(false);

 useEffect(() => {
 const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
 setReducedMotion(mq.matches);
 const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
 mq.addEventListener("change", handler);
 return () => mq.removeEventListener("change", handler);
 }, []);

 const particles = useMemo<Particle[]>(() => {
 if (!type || reducedMotion) return [];
 const count = window.innerWidth < 768 ? 3 : getCount(type);
 return Array.from({ length: count }, (_, i) => ({
 id: i,
 left: Math.random() * 100,
 delay: Math.random() * 4,
 duration: getDuration(type) + Math.random() * 3,
 size: getSize(type) + Math.random() * getSizeVar(type),
 opacity: getOpacity(type),
 }));
 }, [type, reducedMotion]);

 if (!type || reducedMotion) return null;

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
 if (type === "rain") {
 return (
 <div
 className="absolute top-0 w-px animate-rain"
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

 if (type === "stars") {
 return (
 <div
 className="absolute animate-twinkle"
 style={{
 left: `${particle.left}%`,
 top: `${Math.random() * 80}%`,
 fontSize: `${particle.size}px`,
 animationDelay: `${particle.delay}s`,
 animationDuration: `${particle.duration}s`,
 opacity: particle.opacity,
 color: "rgba(255,255,255,0.9)",
 textShadow: "0 0 8px rgba(255,255,255,0.6)",
 }}
 >
      {Math.random() > 0.5 ? (
        <StarShape className="h-[1em] w-[1em]" />
      ) : (
        <span className="h-[0.4em] w-[0.4em] rounded-full bg-current" />
      )}
    </div>
  );
}

 if (type === "fireflies") {
 return (
 <div
 className="absolute rounded-full animate-firefly"
 style={{
 left: `${particle.left}%`,
 top: `${20 + Math.random() * 60}%`,
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

 const shape =
    type === "petals" ? (
      <PetalShape className="h-[1em] w-[1em]" />
    ) : type === "snow" ? (
      <SnowflakeShape className="h-[1em] w-[1em]" />
    ) : type === "leaves" ? (
      <LeafShape className="h-[1em] w-[1em]" />
    ) : (
      <StarShape className="h-[1em] w-[1em]" />
    );

  return (
    <div
      className={`absolute animate-fall ${type === "leaves" ? "animate-leaf" : ""}`}
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

function getCount(type: ParticleType): number {
 switch (type) {
 case "snow":
 return 8;
 case "stars":
 return 7;
 case "petals":
 return 6;
 case "rain":
 return 5;
 case "leaves":
 return 4;
 case "fireflies":
 return 5;
 default:
 return 5;
 }
}

function getDuration(type: ParticleType): number {
 switch (type) {
 case "rain":
 return 0.6;
 case "snow":
 return 5;
 case "fireflies":
 return 6;
 case "stars":
 return 2;
 default:
 return 4;
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
