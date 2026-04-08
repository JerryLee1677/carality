import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

describe("GET /api/quiz/[sessionId]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("loads the current session snapshot from the backend API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          sessionId: "session_1",
          status: "in_progress",
          mode: "standard",
          targetQuestionCount: 56,
          stepIndex: 2,
          nextQuestion: {
            id: "question_3",
            slug: "group-trip-role",
            title: "和朋友一起出游时，你通常更像哪种角色？",
            description: null,
            branchKey: "social-expression",
            type: "LIFE_STYLE",
            options: [],
          },
        }),
      }),
    );

    const response = await GET(new Request("http://localhost/api/quiz/session_1"), {
      params: Promise.resolve({
        sessionId: "session_1",
      }),
    });
    const payload = await response.json();

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4010/assessment/sessions/session_1/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    expect(response.status).toBe(200);
    expect(payload.nextQuestion.slug).toBe("group-trip-role");
  });
});
