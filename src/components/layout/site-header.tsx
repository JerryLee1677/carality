 "use client";

import Link from "next/link";
import { AuthActions } from "./auth-actions";
import { LanguageSwitch } from "./language-switch";
import { useLanguage } from "@/lib/i18n";

export function SiteHeader() {
  const { translations } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.82)] backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="tach-ring relative grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] bg-white/80">
            <span className="display-font relative z-10 text-lg font-semibold text-[var(--color-accent)]">
              C
            </span>
          </span>
          <div className="leading-none">
            <p className="display-font text-2xl font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">
              Carality
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {translations.site.subtitle}
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          <Link href="/quiz" className="race-button race-button-ghost">
            {translations.site.quiz}
          </Link>
          <Link href="/guides" className="race-button race-button-ghost">
            {translations.site.guides}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <AuthActions />
        </div>
      </div>
    </header>
  );
}
