import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/quiz/[sessionId]/complete", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          sessionId: "session_1",
          personalityProfile: {
            code: "PSCV",
            archetypeCode: "STEADY_PRAGMATIST",
            name: "稳健务实型",
            summary: "做决定偏稳，重视长期成本、确定性和日常便利。",
          },
          recommendations: [],
        }),
      }),
    );
  });

  it("completes the assessment through the backend API", async () => {
    const response = await POST(new Request("http://localhost/api/quiz/session_1/complete"), {
      params: Promise.resolve({
        sessionId: "session_1",
      }),
    });
    const payload = await response.json();

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4010/assessment/sessions/session_1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    expect(response.status).toBe(200);
    expect(payload.personalityProfile.code).toBe("PSCV");
    expect(payload.personalityProfile.archetypeCode).toBe("STEADY_PRAGMATIST");
  });
});
