export const languages = ["zh", "en"] as const;
export type Language = (typeof languages)[number];

/** 中文为默认语言，英文作为可切换的后备语言。 */
export const DEFAULT_LANGUAGE: Language = "zh";
export const LANGUAGE_COOKIE_NAME = "carality_lang";

export function normalizeLanguage(value: unknown): Language | null {
  return languages.includes(value as Language) ? (value as Language) : null;
}

/** 按优先级取第一个合法语言，全部缺失时回落到默认语言。 */
export function resolveLanguage(...candidates: Array<string | null | undefined>): Language {
  for (const candidate of candidates) {
    const normalized = normalizeLanguage(candidate);

    if (normalized) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
}

export function htmlLang(language: Language) {
  return language === "zh" ? "zh-CN" : "en";
}

export function writeLanguageCookie(language: Language) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; Path=/; Max-Age=31536000; Samesite=Lax`;
}
