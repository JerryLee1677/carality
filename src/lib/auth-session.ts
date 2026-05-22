export const AUTH_SESSION_CHANGE_EVENT = "carality:auth-session-change";

export function notifyAuthSessionChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
}

type LogoutOptions = {
  /**
   * Redirect after logout. Default: go back to home page.
   * This also guarantees a full navigation (no stale client state).
   */
  redirectTo?: string | null;
};

export async function logoutAuthSession(options: LogoutOptions = {}) {
  const { redirectTo = "/" } = options;

  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      throw new Error("退出登录失败");
    }
  } finally {
    notifyAuthSessionChanged();

    if (redirectTo && typeof window !== "undefined") {
      window.location.assign(redirectTo);
    }
  }
}
