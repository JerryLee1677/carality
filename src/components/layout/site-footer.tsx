import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[rgba(250,245,238,0.9)]">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="display-font text-2xl uppercase tracking-[0.14em] text-[var(--color-text)]">
            Carality
          </p>
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            用汽车人格帮用户更快缩小车型选择范围，先有判断，再去看参数。
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          <a href="mailto:hello@carality.com" className="race-button race-button-ghost px-4 py-2">
            联系我们
          </a>
          <Link href="/guides" className="race-button race-button-ghost px-4 py-2">
            购车指南
          </Link>
          <span className="inline-flex items-center px-1 text-[10px]">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
