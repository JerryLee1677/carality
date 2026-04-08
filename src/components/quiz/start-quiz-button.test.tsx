import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StartQuizButton } from "./start-quiz-button";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

describe("StartQuizButton", () => {
  beforeEach(() => {
    push.mockReset();
    sessionStorage.clear();
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
            options: [],
          },
        }),
      }),
    );
  });

  it("creates a backend session with the selected mode, caches the snapshot, and navigates to the session page", async () => {
    render(<StartQuizButton mode="quick" />);

    fireEvent.click(screen.getByRole("button", { name: "点火进入正式答题" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/quiz/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "quick" }),
      });
    });

    expect(sessionStorage.getItem("assessment-session:session_123")).toContain("social-first-contact");
    expect(sessionStorage.getItem("assessment-session:session_123")).toContain("\"mode\":\"quick\"");
    expect(push).toHaveBeenCalledWith("/quiz/session_123");
  });
});
