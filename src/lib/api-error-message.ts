function extractNestedMessage(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as { message?: unknown; error?: unknown };
      return extractNestedMessage(parsed.message) ?? extractNestedMessage(parsed.error);
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

export async function readFriendlyErrorMessage(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(text) as { message?: unknown; error?: unknown };
      return extractNestedMessage(parsed.message) ?? extractNestedMessage(parsed.error) ?? fallback;
    } catch {
      return extractNestedMessage(text) ?? fallback;
    }
  }

  return extractNestedMessage(text) ?? fallback;
}

