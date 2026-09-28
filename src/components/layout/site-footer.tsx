 "use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { translations } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-alt)]">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="display-font text-2xl uppercase tracking-[0.14em] text-[var(--color-text)]">
            Carality
          </p>
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            {translations.site.footerDescription}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          <a href="mailto:hello@carality.com" className="race-button race-button-ghost px-4 py-2">
            {translations.site.contact}
          </a>
          <Link href="/guides" className="race-button race-button-ghost px-4 py-2">
            {translations.site.guides}
          </Link>
          <span className="inline-flex items-center px-1 text-[10px]">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
