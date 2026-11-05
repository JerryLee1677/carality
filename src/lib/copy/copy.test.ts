import { describe, expect, it } from "vitest";
import { copyNamespaces, enCopy, format, resolveCopy, untranslatedNamespaces, zhCopy } from "./index";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      collectKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

describe("copy", () => {
  it("keeps every translated namespace structurally identical to Chinese", () => {
    for (const namespace of copyNamespaces) {
      const translated = enCopy[namespace];
      if (!translated) {
        continue;
      }

      expect({ namespace, keys: collectKeys(translated).sort() }).toEqual({
        namespace,
        keys: collectKeys(zhCopy[namespace]).sort(),
      });
    }
  });

  it("tracks the namespaces that still need English", () => {
    // 这份清单只允许缩短：新增命名空间必须显式登记，作为可见的翻译欠债。
    expect(untranslatedNamespaces()).toEqual([
      "metadata",
      "auth",
      "history",
      "result",
      "recommendations",
      "carDetail",
      "guides",
    ]);
  });

  it("falls back to Chinese for namespaces English has not translated", () => {
    const copy = resolveCopy("en");

    expect(copy.quiz.title).toBe("Choose your mode.");
    expect(copy.result.matchScoreLabel).toBe(zhCopy.result.matchScoreLabel);
  });

  it("only substitutes placeholders it was given", () => {
    expect(format("第 {current} / {total} 题", { current: 3, total: 24 })).toBe("第 3 / 24 题");
    expect(format("{known} {unknown}", { known: 1 })).toBe("1 {unknown}");
  });
});
