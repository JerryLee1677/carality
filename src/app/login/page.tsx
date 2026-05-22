"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { notifyAuthSessionChanged } from "@/lib/auth-session";
import { readFriendlyErrorMessage } from "@/lib/api-error-message";
import { encryptPassword } from "@/lib/rsa-client";

type PublicKeyResponse = {
  publicKeyPem: string;
};

function resolveSourceUrl(sourceUrl: string | null) {
  if (!sourceUrl) {
    return "/";
  }

  if (!sourceUrl.startsWith("/") || sourceUrl.startsWith("//")) {
    return "/";
  }

  return sourceUrl;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("sourceUrl");
    setSourceUrl(value);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const keyResponse = await fetch("/api/auth/public-key", { method: "GET" });
      if (!keyResponse.ok) {
        throw new Error("获取加密公钥失败");
      }

      const { publicKeyPem } = (await keyResponse.json()) as PublicKeyResponse;
      const encryptedPassword = await encryptPassword(publicKeyPem, password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, encryptedPassword }),
      });

      if (!response.ok) {
        throw new Error(await readFriendlyErrorMessage(response, "登录失败"));
      }

      notifyAuthSessionChanged();
      router.replace(resolveSourceUrl(sourceUrl));
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "登录失败";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="shell py-10">
      <section className="dashboard-panel mx-auto max-w-lg p-6 sm:p-8">
        <h1 className="display-font text-2xl font-semibold tracking-[0.12em] text-[var(--color-text)]">
          登录
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          登录后可保存并查看历史测试结果。
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Password
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
              minLength={8}
              className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-[rgba(217,106,44,0.3)] bg-[rgba(217,106,44,0.08)] px-4 py-3 text-sm text-[var(--color-text)]">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              className="race-button race-button-primary w-full px-7 py-4 sm:w-auto"
              as="button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "登录中..." : "登录"}
            </Button>
            <Link
              href={
                sourceUrl ? `/register?sourceUrl=${encodeURIComponent(sourceUrl)}` : "/register"
              }
              className="race-button race-button-ghost text-center"
            >
              去注册
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
