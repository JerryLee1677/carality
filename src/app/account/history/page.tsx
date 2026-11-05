"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AUTH_SESSION_CHANGE_EVENT, logoutAuthSession } from "@/lib/auth-session";
import { useLanguage } from "@/lib/i18n";

type HistoryItem = {
  sessionId: string;
  startedAt: string;
  completedAt: string | null;
  profileCode: string | null;
  profileName: string | null;
  summary: string | null;
};

export default function AccountHistoryPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const response = await fetch("/api/history", { method: "GET" });
        if (response.status === 401) {
          const sourceUrl = `${window.location.pathname}${window.location.search}`;
          router.push(`/login?sourceUrl=${encodeURIComponent(sourceUrl)}`);
          return;
        }

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || translations.history.loadFailed);
        }

        const payload = (await response.json()) as HistoryItem[];
        if (isMounted) {
          setItems(payload);
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        const message = loadError instanceof Error ? loadError.message : translations.history.loadFailed;
        setError(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void load();

    function handleAuthSessionChange() {
      void load();
    }

    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, handleAuthSessionChange);
    return () => {
      isMounted = false;
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, handleAuthSessionChange);
    };
  }, [router, translations]);

  async function handleLogout() {
    await logoutAuthSession().catch(() => null);
  }

  return (
    <main className="shell py-10">
      <section className="dashboard-panel mx-auto max-w-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="display-font text-2xl font-semibold tracking-[0.12em] text-[var(--color-text)]">
              {translations.history.title}
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {translations.history.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="race-button race-button-ghost" as="button" type="button" onClick={handleLogout}>
              {translations.history.logout}
            </Button>
            <Link href="/quiz" className="race-button race-button-primary">
              {translations.history.newTest}
            </Link>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-8 text-sm text-[var(--color-muted)]">{translations.history.loading}</p>
        ) : error ? (
          <p className="mt-8 rounded-2xl border border-[rgba(217,106,44,0.3)] bg-[rgba(217,106,44,0.08)] px-4 py-3 text-sm text-[var(--color-text)]">
            {error}
          </p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[var(--color-line)] bg-white/60 p-6 text-center">
            <p className="text-sm text-[var(--color-muted)]">{translations.history.empty}</p>
            <Link href="/quiz" className="race-button race-button-primary mt-5 inline-flex">
              {translations.history.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <article
                key={item.sessionId}
                className="rounded-3xl border border-[var(--color-line)] bg-white/60 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      {item.profileName
                        ? `${item.profileName} · ${item.profileCode ?? ""}`.trim()
                        : translations.history.pending}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-text)]">
                      {item.summary ?? translations.history.pendingSummary}
                    </p>
                  </div>
                  <Link
                    href={`/result/${item.sessionId}`}
                    className="race-button race-button-ghost text-center"
                  >
                    {translations.history.viewResult}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
