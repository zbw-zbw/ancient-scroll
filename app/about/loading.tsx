export default function Loading() {
  return (
    <main className="min-h-screen bg-xuan">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cinnabar/20 border-t-cinnabar"
            aria-hidden="true"
          />
          <p className="mt-4 font-serif text-sm text-muted">加载中…</p>
        </div>
      </div>
    </main>
  );
}
