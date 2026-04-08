import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/quiz/[sessionId]/answer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          accepted: true,
          completed: false,
          lockedQuestionId: "question_1",
          nextQuestion: {
            id: "question_2",
            slug: "weekend-plan",
            title: "周末突然空出半天，你更可能怎么安排？",
            description: "选择最像你平时习惯的方式",
            branchKey: "steady-practical",
            type: "LIFE_STYLE",
            options: [],
          },
        }),
      }),
    );
  });

  it("forwards the selected answer to the backend assessment API", async () => {
    const request = new Request("http://localhost/api/quiz/session_1/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: "question_1",
        optionId: "option_1",
      }),
    });

    const response = await POST(request as never, {
      params: Promise.resolve({
        sessionId: "session_1",
      }),
    });
    const payload = await response.json();

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4010/assessment/sessions/session_1/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: "question_1",
        optionId: "option_1",
      }),
      cache: "no-store",
    });
    expect(response.status).toBe(200);
    expect(payload.accepted).toBe(true);
    expect(payload.nextQuestion.slug).toBe("weekend-plan");
  });

  it("returns a json error payload when the backend assessment API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Assessment API request failed with status 409")),
    );

    const request = new Request("http://localhost/api/quiz/session_1/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: "question_1",
        optionId: "option_1",
      }),
    });

    const response = await POST(request as never, {
      params: Promise.resolve({
        sessionId: "session_1",
      }),
    });
    const payload = await response.json();

    expect(response.status).toBe(502);
    expect(payload).toEqual({
      message: "Assessment API request failed with status 409",
    });
  });
});
