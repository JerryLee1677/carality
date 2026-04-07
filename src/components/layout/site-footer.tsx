import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Carality. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="mailto:hello@carality.com" className="hover:text-slate-900">
            联系我们
          </a>
          <Link href="/guides" className="hover:text-slate-900">
            购车指南
          </Link>
        </div>
      </div>
    </footer>
  );
}
