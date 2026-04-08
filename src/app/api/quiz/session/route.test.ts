import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/quiz/session", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          sessionId: "session_123",
          status: "in_progress",
          mode: "quick",
          targetQuestionCount: 24,
          nextQuestion: {
            id: "question_1",
            slug: "social-first-contact",
            title: "在一场聚会上，遇到陌生朋友，你会？",
            description: "选择更接近你第一反应的答案",
            branchKey: "social-expression",
            type: "LIFE_STYLE",
            options: [
              {
                id: "option_1",
                label: "主动开启话题",
                order: 1,
              },
            ],
          },
        }),
      }),
    );
  });

  it("creates a real assessment session through the backend API with selected mode", async () => {
    const request = new Request("http://localhost/api/quiz/session", {
      method: "POST",
      body: JSON.stringify({ mode: "quick" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4010/assessment/sessions", {
      method: "POST",
      body: JSON.stringify({ mode: "quick" }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    expect(payload.status).toBe("in_progress");
    expect(payload.sessionId).toBe("session_123");
    expect(payload.mode).toBe("quick");
    expect(payload.targetQuestionCount).toBe(24);
    expect(payload.nextQuestion.slug).toBe("social-first-contact");
  });
});
