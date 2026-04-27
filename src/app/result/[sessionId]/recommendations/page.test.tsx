import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RecommendationsPage from "./page";

const { assessmentApiFetchMock } = vi.hoisted(() => ({
  assessmentApiFetchMock: vi.fn(),
}));

vi.mock("@/lib/assessment-api", () => ({
  assessmentApiFetch: assessmentApiFetchMock,
}));

describe("RecommendationsPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders recommended vehicles for the completed session", async () => {
    assessmentApiFetchMock.mockResolvedValue({
      json: async () => ({
        sessionId: "session_1",
        personality: {
          code: "steady-pragmatist",
          word: "Guardian",
          name: "务实省心型",
          epithet: "守序顾家者",
          subtitle: "你更在意确定性、成本压力和长期省心。",
          summary: "你买车时会优先确认预算压力、日常可靠性和长期维护成本。",
          decisionStyle: "你会先排除不省心的选项，再看是否真的适合自己的生活。",
          lifeScenes: ["通勤稳定"],
          usageHabits: ["关注长期成本"],
          strengths: ["判断稳"],
          cautions: ["容易保守过头"],
          matchScore: 84,
          dimensionSnapshot: [],
          imageUrl: null,
        },
        recommendationEntry: {
          label: "查看适合你人格的车型方向",
          href: "/result/session_1/recommendations",
        },
        personalityProfile: {
          code: "PSCV",
          archetypeCode: "STEADY_PRAGMATIST",
          word: "Guardian",
          name: "务实省心型",
          epithet: "守序顾家者",
          summary: "适合长期稳定家用。",
        },
        recommendations: [
          {
            slug: "tesla-model-y",
            brand: "Tesla",
            series: "Model Y",
            rank: 1,
            score: 92,
            reason: "空间与智能化体验均衡，适合稳定通勤与家庭出行。",
          },
          {
            slug: "toyota-rav4",
            brand: "Toyota",
            series: "RAV4",
            rank: 2,
            score: 88,
            reason: "可靠性高，长期使用成本可控。",
          },
        ],
      }),
    });

    render(
      await RecommendationsPage({
        params: Promise.resolve({ sessionId: "session_1" }),
      }),
    );

    expect(screen.getByText("适合你人格的车型方向")).toBeInTheDocument();
    expect(screen.getByText("务实省心型")).toBeInTheDocument();
    expect(screen.getByText("Tesla Model Y")).toBeInTheDocument();
    expect(screen.getByText("Toyota RAV4")).toBeInTheDocument();
    const detailLinks = screen.getAllByRole("link", { name: /查看车型详情/i });
    expect(detailLinks[0]).toHaveAttribute("href", "/cars/tesla-model-y");
    expect(detailLinks[1]).toHaveAttribute("href", "/cars/toyota-rav4");
  });
});
