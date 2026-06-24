import Link from "next/link";
import Navbar from "./Navbar";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
}

export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen w-full items-center justify-center bg-xuan px-6 pt-20">
        <div className="text-center">
          <h1 className="font-calligraphy mb-4 text-4xl text-ink md:text-6xl">
            {title}
          </h1>
          <p className="font-serif mb-8 text-lg text-muted">{subtitle}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-cinnabar/40 bg-seal-bg px-6 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar hover:text-surface"
          >
            ← 返回首页
          </Link>
        </div>
      </main>
    </>
  );
}
