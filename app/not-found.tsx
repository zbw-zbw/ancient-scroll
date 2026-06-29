import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-xuan px-6">
      <h1 className="font-calligraphy text-6xl text-ink">404</h1>
      <p className="mt-4 font-serif text-lg text-muted">此卷尚未收录</p>
      <Link href="/" className="mt-8 rounded-full bg-cinnabar px-6 py-3 font-serif text-sm text-white">
        返回首页
      </Link>
    </main>
  );
}
