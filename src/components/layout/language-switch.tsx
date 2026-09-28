"use client";

import React from "react";
import { languages, useLanguage } from "@/lib/i18n";

const languageLabels = {
  en: "EN",
  zh: "中文",
} as const;

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line)] bg-white/70 p-1"
    >
      {languages.map((availableLanguage) => {
        const isActive = availableLanguage === language;

        return (
          <button
            key={availableLanguage}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(availableLanguage)}
            className={`min-h-9 cursor-pointer rounded-full px-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
              isActive
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-muted)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)]"
            }`}
          >
            {languageLabels[availableLanguage]}
          </button>
        );
      })}
    </div>
  );
}
