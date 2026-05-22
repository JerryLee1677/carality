"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AUTH_SESSION_CHANGE_EVENT, logoutAuthSession } from "@/lib/auth-session";

type MeResponse = {
  user: {
    id: string;
    email: string;
  } | null;
};

function formatEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) {
    return email;
  }

  const head = name.slice(0, 2);
  const tail = name.length > 4 ? name.slice(-1) : "";
  return `${head}${name.length > 2 ? "…" : ""}${tail}@${domain}`;
}

export function AuthActions() {
  const pathname = usePathname();
  const [me, setMe] = React.useState<MeResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const response = await fetch("/api/auth/me", { method: "GET" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as MeResponse;
        if (!isMounted) {
          return;
        }

        setMe(payload.user ?? null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    function handleAuthSessionChange() {
      void load();
    }

    void load();
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, handleAuthSessionChange);
    return () => {
      isMounted = false;
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, handleAuthSessionChange);
    };
  }, []);

  async function handleLogout() {
    await logoutAuthSession().catch(() => null);
  }

  if (isLoading) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <span className="h-9 w-24 animate-pulse rounded-full border border-[var(--color-line)] bg-white/50" />
        <span className="h-9 w-20 animate-pulse rounded-full border border-[var(--color-line)] bg-white/50" />
      </div>
    );
  }

  if (!me) {
    const sourceUrl = pathname && (pathname === "/login" || pathname === "/register") ? "/" : pathname ?? "/";
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link href={`/login?sourceUrl=${encodeURIComponent(sourceUrl)}`} className="race-button race-button-ghost">
          登录
        </Link>
        <Link
          href={`/register?sourceUrl=${encodeURIComponent(sourceUrl)}`}
          className="race-button race-button-primary"
        >
          注册
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/65 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_rgba(200,98,39,0.12)]" />
        <span title={me.email}>{formatEmail(me.email)}</span>
      </div>
      <Link href="/account/history" className="race-button race-button-ghost">
        历史记录
      </Link>
      <button type="button" className="race-button race-button-ghost" onClick={handleLogout}>
        退出
      </button>
    </div>
  );
}
