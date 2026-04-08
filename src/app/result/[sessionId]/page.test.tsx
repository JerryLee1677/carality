import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ResultPage from "./page";

const { assessmentApiFetchMock } = vi.hoisted(() => ({
  assessmentApiFetchMock: vi.fn(),
}));

vi.mock("@/lib/assessment-api", () => ({
  assessmentApiFetch: assessmentApiFetchMock,
}));

describe("ResultPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the personality profile even when no vehicle recommendation is returned", async () => {
    assessmentApiFetchMock.mockResolvedValue({
      json: async () => ({
        sessionId: "session_empty",
        personalityProfile: {
          code: "EQDV",
          archetypeCode: "EXPRESSIVE_EXPLORER",
          name: "表达探索型",
          summary: "偏爱有辨识度、动力反馈和新鲜体验并重的车。",
        },
        recommendations: [],
      }),
    });

    render(
      await ResultPage({
        params: Promise.resolve({ sessionId: "session_empty" }),
      }),
    );

    expect(screen.getByText("EQDV")).toBeInTheDocument();
    expect(screen.getByText("表达探索型")).toBeInTheDocument();
    expect(screen.getByText("0 台")).toBeInTheDocument();
  });
});
