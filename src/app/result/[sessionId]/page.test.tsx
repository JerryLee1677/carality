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
        personality: {
          code: "steady-pragmatist",
          name: "务实省心型",
          subtitle: "你更在意确定性、成本压力和长期省心。",
          summary: "你买车时会优先确认预算压力、日常可靠性和长期维护成本。",
          decisionStyle: "你会先排除不省心的选项，再看是否真的适合自己的生活。",
          lifeScenes: ["通勤稳定", "家庭共同决策"],
          usageHabits: ["重视空间舒适", "关注长期成本"],
          strengths: ["判断稳", "容错高"],
          cautions: ["容易忽略驾驶乐趣", "容易保守过头"],
          matchScore: 84,
          dimensionSnapshot: [
            {
              key: "practicality",
              label: "务实导向",
              value: 84,
              directionLabel: "更偏务实",
            },
          ],
          imageUrl: null,
        },
        recommendationEntry: {
          label: "查看适合你人格的车型方向",
          href: "/result/session_empty/recommendations",
        },
      }),
    });

    render(
      await ResultPage({
        params: Promise.resolve({ sessionId: "session_empty" }),
      }),
    );

    expect(screen.getByText("务实省心型")).toBeInTheDocument();
    expect(screen.getByText("你的优势")).toBeInTheDocument();
    expect(screen.getByText("你的注意点")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /查看适合你人格的车型方向/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Top Recommendation")).not.toBeInTheDocument();
  });
});
