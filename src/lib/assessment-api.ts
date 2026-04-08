const DEFAULT_ASSESSMENT_API_BASE_URL = "http://127.0.0.1:4010";

function getAssessmentApiBaseUrl() {
  return process.env.ASSESSMENT_API_BASE_URL ?? DEFAULT_ASSESSMENT_API_BASE_URL;
}

export async function assessmentApiFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${getAssessmentApiBaseUrl()}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Assessment API request failed with status ${response.status}`);
  }

  return response;
}
