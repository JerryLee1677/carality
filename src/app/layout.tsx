import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LanguageProvider } from "@/lib/i18n";
import { LANGUAGE_COOKIE_NAME, htmlLang, resolveLanguage } from "@/lib/language";
import { getServerCopy } from "@/lib/copy/server";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getServerCopy();

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const language = resolveLanguage(cookieStore.get(LANGUAGE_COOKIE_NAME)?.value);

  return (
    <html lang={htmlLang(language)}>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <LanguageProvider initialLanguage={language}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
