import { cookies } from "next/headers";
import { LANGUAGE_COOKIE_NAME, resolveLanguage } from "@/lib/language";
import { type Copy, resolveCopy } from "./index";

/**
 * 服务端组件按 Cookie 取文案。语言只在有请求上下文时才知道，
 * 单元测试等场景直接回落到默认中文，避免页面为了取文案而依赖请求作用域。
 */
export async function getServerCopy(): Promise<Copy> {
  try {
    const cookieStore = await cookies();

    return resolveCopy(resolveLanguage(cookieStore.get(LANGUAGE_COOKIE_NAME)?.value));
  } catch {
    return resolveCopy(resolveLanguage());
  }
}
