import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Carality
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/quiz" className="text-slate-600 hover:text-slate-900">
            汽车人格测试
          </Link>
          <Link href="/guides" className="text-slate-600 hover:text-slate-900">
            购车指南
          </Link>
        </nav>
      </div>
    </header>
  );
}
