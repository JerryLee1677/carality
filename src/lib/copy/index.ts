import { type Language } from "@/lib/language";
import { en } from "./en";
import { type Copy, zh } from "./zh";

export type { Copy };
export { en as enCopy, zh as zhCopy };

export const copyNamespaces = Object.keys(zh) as (keyof Copy)[];

/** 英文只按命名空间整体覆盖，缺整个命名空间时回落到中文，避免出现半中半英的句子。 */
export function resolveCopy(language: Language): Copy {
  if (language === "zh") {
    return zh;
  }

  const merged: Record<string, unknown> = { ...zh };

  for (const namespace of copyNamespaces) {
    const translated = en[namespace];

    if (translated) {
      merged[namespace] = translated;
    }
  }

  return merged as unknown as Copy;
}

/** 英文还没翻完的命名空间，供测试和后续翻译排期使用。 */
export function untranslatedNamespaces(): (keyof Copy)[] {
  return copyNamespaces.filter((namespace) => !en[namespace]);
}

export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : match,
  );
}
