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
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
                { key: "energy", label: "能源类型", value: 100 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 92 },
                { key: "family", label: "家庭适配", value: 70 },
                { key: "energy", label: "能源类型", value: 100 },
              ],
              scoreBreakdown: {
                vectorFit: 88,
                energyFit: 91,
                constraintFit: 100,
                preferenceAlignment: 86,
                personalityAlignment: 72,
                corePenalty: 0,
              },
            },
          },
          {
            slug: "toyota-rav4",
            brand: "Toyota",
            series: "RAV4",
            rank: 2,
            score: 88,
            reason: "可靠性高，长期使用成本可控。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
                { key: "energy", label: "能源类型", value: 0 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 45 },
                { key: "family", label: "家庭适配", value: 82 },
                { key: "energy", label: "能源类型", value: 0 },
              ],
              scoreBreakdown: {
                vectorFit: 82,
                energyFit: 76,
                constraintFit: 100,
                preferenceAlignment: 80,
                personalityAlignment: 78,
                corePenalty: 2,
              },
            },
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
    expect(screen.getAllByText("本地测试得分")).toHaveLength(2);
    expect(screen.getAllByText("用户偏好向量")[0]).toBeInTheDocument();
    expect(screen.getAllByText("科技配置")[0]).toBeInTheDocument();
    expect(screen.getAllByText("能源类型")[0]).toBeInTheDocument();
    expect(screen.getAllByText("84")[0]).toBeInTheDocument();
    expect(screen.getAllByText("车型各项分值")[0]).toBeInTheDocument();
    expect(screen.getAllByText("评分拆解")[0]).toBeInTheDocument();
    expect(screen.getAllByText("vectorFit")[0]).toBeInTheDocument();
    const detailLinks = screen.getAllByRole("link", { name: /查看车型详情/i });
    expect(detailLinks[0]).toHaveAttribute("href", "/cars/tesla-model-y");
    expect(detailLinks[1]).toHaveAttribute("href", "/cars/toyota-rav4");
  });
});
