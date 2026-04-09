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

  it("renders the matched core preferences for the top recommendation", async () => {
    assessmentApiFetchMock.mockResolvedValue({
      json: async () => ({
        sessionId: "session_top",
        personalityProfile: {
          code: "PQDB",
          archetypeCode: "EXPRESSIVE_EXPLORER",
          name: "表达探索型",
          summary: "偏爱性能、科技和品牌表达。",
        },
        recommendations: [
          {
            slug: "tesla-model-y",
            brand: "特斯拉",
            series: "Model Y",
            rank: 1,
            score: 90,
            reason: "你当前更看重智能体验、驾驶乐趣、品牌表达，这台车在这些维度上最贴合你的选择。",
          },
        ],
      }),
    });

    render(
      await ResultPage({
        params: Promise.resolve({ sessionId: "session_top" }),
      }),
    );

    expect(screen.getByText("命中的核心偏好")).toBeInTheDocument();
    expect(screen.getByText("智能体验")).toBeInTheDocument();
    expect(screen.getByText("驾驶乐趣")).toBeInTheDocument();
    expect(screen.getByText("品牌表达")).toBeInTheDocument();
  });
});
