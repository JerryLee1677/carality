import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

vi.mock("@/modules/quiz/repository/quiz-repository", () => ({
  quizRepository: {
    createSession: vi.fn().mockResolvedValue({
      id: "session_123",
      status: "draft",
    }),
  },
}));

describe("POST /api/quiz/session", () => {
  it("creates a draft quiz session", async () => {
    const response = await POST();
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.status).toBe("draft");
    expect(payload.sessionId).toBe("session_123");
  });
});
