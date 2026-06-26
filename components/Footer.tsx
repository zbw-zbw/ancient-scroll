export default function Footer() {
  return (
    <footer className="relative w-full py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <h2 className="font-calligraphy mx-auto max-w-3xl text-3xl leading-tight text-ink md:text-[3rem]">
          为最古老的文字
          <br />
          造一个最现代的家
        </h2>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-rule bg-surface/60 px-4 py-1.5">
          <span className="font-serif text-xs tracking-widest text-muted">
            古籍活化 · 数字传承
          </span>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-sm border-2 border-seal-red bg-seal-bg rotate-[-3deg] shadow-sm"
          >
            <span className="font-calligraphy text-center text-xl leading-tight text-seal-red">
              古籍
              <br />
              焕新
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 font-serif text-xs text-muted md:flex-row">
          <span>2026 · 06</span>
          <span>让千年文字“活”起来</span>
        </div>
      </div>
    </footer>
  );
}
