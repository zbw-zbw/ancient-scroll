"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const title = "古籍焕新";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = Math.min(
    scrollY / (typeof window !== "undefined" ? window.innerHeight : 1),
    1
  );
  const bgOpacity = 1 - progress * 0.7;
  const bgY = -progress * 15;

  return (
    <section className="relative h-svh w-full overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{
          opacity: bgOpacity,
          transform: `translateY(${bgY}%)`,
        }}
      >
        <Image
          src="/images/hero-ink.jpg"
          alt="水墨山水"
          fill
          priority
          className="animate-hero-breathe object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-xuan/80 via-xuan/50 to-xuan/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-xuan via-transparent to-transparent" />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:items-start md:px-12 lg:px-20">
        <h1
          className="mb-6 text-center font-calligraphy tracking-wider md:text-left"
          style={{ fontSize: "clamp(3rem, 12vw, 7rem)" }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-hero-reveal text-ink"
              style={{ animationDelay: `${0.2 + i * 0.08}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p
          className="mb-8 text-center font-handwrite text-2xl text-light-ink animate-hero-reveal md:text-left md:text-3xl"
          style={{ animationDelay: "0.7s" }}
        >
          让千年文字“活”起来
        </p>

        <Link
          href="#features"
          className="mx-auto inline-flex items-center gap-2 rounded-full bg-cinnabar px-6 py-3 font-serif text-sm text-white shadow-md transition-transform hover:translate-x-1 animate-hero-reveal md:mx-0"
          style={{ animationDelay: "1s" }}
        >
          开启旅程
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Seal badge */}
      <div className="absolute bottom-8 right-8 z-10 flex h-16 w-16 rotate-[-3deg] items-center justify-center rounded-sm bg-seal-bg shadow-sm md:bottom-12 md:right-12 md:h-20 md:w-20">
        <span className="text-center font-calligraphy text-xs leading-tight text-seal-red md:text-sm">
          古籍
          <br />
          焕新
        </span>
      </div>
    </section>
  );
}
