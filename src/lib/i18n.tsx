"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  type Language,
  htmlLang,
  normalizeLanguage,
  writeLanguageCookie,
} from "./language";
import { type Copy, resolveCopy } from "./copy";

export {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_NAME,
  type Language,
  languages,
  normalizeLanguage,
  resolveLanguage,
  htmlLang,
  writeLanguageCookie,
} from "./language";


export type Translations = Copy;

type LanguageContextValue = {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  translations: resolveCopy(DEFAULT_LANGUAGE),
  setLanguage: () => undefined,
});

export function LanguageProvider({
  initialLanguage = DEFAULT_LANGUAGE,
  children,
}: {
  /** 由服务端按 Cookie 解析后传入，保证首屏语言与 <html lang> 一致。 */
  initialLanguage?: Language;
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // 服务端已按 Cookie 渲染 <html lang>；这里只负责切换后到下次导航之间的空档。
  useEffect(() => {
    document.documentElement.lang = htmlLang(language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    const resolved = normalizeLanguage(nextLanguage) ?? DEFAULT_LANGUAGE;
    setLanguageState(resolved);
    writeLanguageCookie(resolved);
  }, []);

  const value = useMemo(
    () => ({
      language,
      translations: resolveCopy(language),
      setLanguage,
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
