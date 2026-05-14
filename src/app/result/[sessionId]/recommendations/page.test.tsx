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
            energyType: "EV",
            rank: 1,
            reason: "空间与智能化体验均衡，适合稳定通勤与家庭出行。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 92 },
                { key: "family", label: "家庭适配", value: 70 },
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
            slug: "byd-song-plus-dmi",
            brand: "BYD",
            series: "Song Plus",
            energyType: "PHEV",
            rank: 2,
            reason: "空间与成本兼顾，适合家庭出行。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 45 },
                { key: "family", label: "家庭适配", value: 82 },
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
          {
            slug: "toyota-rav4",
            brand: "Toyota",
            series: "RAV4",
            energyType: "ICE",
            rank: 3,
            reason: "可靠性高，长期使用成本可控。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 45 },
                { key: "family", label: "家庭适配", value: 82 },
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
          {
            slug: "li-auto-l6",
            brand: "Li Auto",
            series: "L6",
            energyType: "EREV",
            rank: 3,
            reason: "空间和家庭舒适性更强，适合多人出行。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 80 },
                { key: "family", label: "家庭适配", value: 92 },
              ],
              scoreBreakdown: {
                vectorFit: 84,
                energyFit: 78,
                constraintFit: 100,
                preferenceAlignment: 82,
                personalityAlignment: 80,
                corePenalty: 1,
              },
            },
          },
          {
            slug: "honda-crv",
            brand: "Honda",
            series: "CR-V",
            energyType: "HEV",
            rank: 5,
            reason: "舒适均衡，适合家用通勤。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 45 },
                { key: "family", label: "家庭适配", value: 82 },
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
          {
            slug: "mazda-cx-5",
            brand: "Mazda",
            series: "CX-5",
            energyType: "ICE",
            rank: 6,
            reason: "更偏驾驶反馈，适合想兼顾家用和操控的人。",
            diagnostics: {
              userPreferenceVector: [
                { key: "smart", label: "科技配置", value: 84 },
                { key: "family", label: "家庭适配", value: 76 },
              ],
              vehicleScores: [
                { key: "smart", label: "科技配置", value: 40 },
                { key: "family", label: "家庭适配", value: 68 },
              ],
              scoreBreakdown: {
                vectorFit: 76,
                energyFit: 74,
                constraintFit: 100,
                preferenceAlignment: 70,
                personalityAlignment: 72,
                corePenalty: 3,
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
    expect(screen.getByText("电车推荐")).toBeInTheDocument();
    expect(screen.getByText("油车推荐")).toBeInTheDocument();
    expect(screen.getAllByText("3 辆")).toHaveLength(2);
    expect(screen.queryByText("本地测试得分")).not.toBeInTheDocument();
    expect(screen.queryByText("匹配分")).not.toBeInTheDocument();
    const detailLinks = screen.getAllByRole("link", { name: /查看车型详情/i });
    expect(detailLinks[0]).toHaveAttribute("href", "/cars/tesla-model-y");
    expect(detailLinks[1]).toHaveAttribute("href", "/cars/byd-song-plus-dmi");
  });
});
