"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AUTH_SESSION_CHANGE_EVENT, logoutAuthSession } from "@/lib/auth-session";

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
          throw new Error(message || "加载历史记录失败");
        }

        const payload = (await response.json()) as HistoryItem[];
        if (isMounted) {
          setItems(payload);
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        const message = loadError instanceof Error ? loadError.message : "加载历史记录失败";
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
  }, [router]);

  async function handleLogout() {
    await logoutAuthSession().catch(() => null);
  }

  return (
    <main className="shell py-10">
      <section className="dashboard-panel mx-auto max-w-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="display-font text-2xl font-semibold tracking-[0.12em] text-[var(--color-text)]">
              历史测试结果
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              只记录登录后开始的测试会话。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="race-button race-button-ghost" as="button" type="button" onClick={handleLogout}>
              退出登录
            </Button>
            <Link href="/quiz" className="race-button race-button-primary">
              去做新测试
            </Link>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-8 text-sm text-[var(--color-muted)]">加载中...</p>
        ) : error ? (
          <p className="mt-8 rounded-2xl border border-[rgba(217,106,44,0.3)] bg-[rgba(217,106,44,0.08)] px-4 py-3 text-sm text-[var(--color-text)]">
            {error}
          </p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[var(--color-line)] bg-white/60 p-6 text-center">
            <p className="text-sm text-[var(--color-muted)]">还没有历史记录</p>
            <Link href="/quiz" className="race-button race-button-primary mt-5 inline-flex">
              开始第一次测试
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
                        : "结果生成中"}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-text)]">
                      {item.summary ?? "完成后可在结果页查看详细解析与推荐车型。"}
                    </p>
                  </div>
                  <Link
                    href={`/result/${item.sessionId}`}
                    className="race-button race-button-ghost text-center"
                  >
                    查看结果
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
