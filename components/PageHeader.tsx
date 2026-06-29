import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export default function PageHeader({ title, subtitle, compact }: PageHeaderProps) {
  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden bg-xuan ${
        compact
          ? "min-h-[160px] pt-16 md:min-h-[200px]"
          : "min-h-[220px] pt-16 md:min-h-[280px]"
      }`}
    >
      {/* 复用首页山水背景，低透明度 */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image
          src="/images/hero-ink.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-xuan/60 via-xuan/80 to-xuan" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        <h1
          className="font-calligraphy text-ink"
          style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-handwrite text-lg text-light-ink md:text-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* 小印章 */}
      <div className="absolute bottom-4 right-4 z-10 flex h-14 w-14 rotate-[-3deg] items-center justify-center rounded-sm bg-seal-bg shadow-sm md:bottom-6 md:right-8 md:h-16 md:w-16">
        <span className="text-center font-calligraphy text-[10px] leading-tight text-seal-red md:text-xs">
          古籍
          <br />
          焕新
        </span>
      </div>
    </section>
  );
}
