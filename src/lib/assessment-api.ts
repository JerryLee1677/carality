const DEFAULT_ASSESSMENT_API_BASE_URL = "http://127.0.0.1:4010";

function getAssessmentApiBaseUrl() {
  return process.env.ASSESSMENT_API_BASE_URL ?? DEFAULT_ASSESSMENT_API_BASE_URL;
}

export class AssessmentApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AssessmentApiError";
    this.status = status;
  }
}

function normalizeHeaders(headers: RequestInit["headers"]) {
  if (!headers) {
    return {};
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  // Headers object
  if (typeof (headers as Headers).forEach === "function") {
    const output: Record<string, string> = {};
    (headers as Headers).forEach((value, key) => {
      output[key] = value;
    });
    return output;
  }

  return headers as Record<string, string>;
}

export async function assessmentApiFetch(path: string, init?: RequestInit) {
  const { headers, ...restInit } = init ?? {};
  const response = await fetch(`${getAssessmentApiBaseUrl()}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...normalizeHeaders(headers),
    },
    ...restInit,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    const rawText = await response.text();
    let message = rawText;

    if (contentType.includes("application/json")) {
      try {
        const parsed = JSON.parse(rawText) as { message?: unknown; error?: unknown };
        message =
          (typeof parsed.message === "string" ? parsed.message : null) ??
          (typeof parsed.error === "string" ? parsed.error : null) ??
          rawText;
      } catch {
        message = rawText;
      }
    }

    throw new AssessmentApiError(
      response.status,
      message || `Assessment API request failed with status ${response.status}`,
    );
  }

  return response;
}
