import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuizSessionClient } from "./quiz-session-client";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("QuizSessionClient", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
    pushMock.mockReset();
  });

  it("renders the current question from the backend session snapshot on refresh", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          sessionId: "session_123",
          status: "in_progress",
          mode: "standard",
          targetQuestionCount: 56,
          stepIndex: 2,
          nextQuestion: {
            id: "question_3",
            slug: "group-trip-role",
            title: "和朋友一起出游时，你通常更像哪种角色？",
            description: null,
            branchKey: "social-expression",
            type: "LIFE_STYLE",
            options: [
              {
                id: "option_1",
                label: "强烈不认同",
                order: 1,
              },
              {
                id: "option_2",
                label: "不太认同",
                order: 2,
              },
              {
                id: "option_3",
                label: "中立",
                order: 3,
              },
              {
                id: "option_4",
                label: "比较认同",
                order: 4,
              },
              {
                id: "option_5",
                label: "强烈认同",
                order: 5,
              },
            ],
          },
        }),
      }),
    );

    sessionStorage.setItem(
      "assessment-session:session_123",
      JSON.stringify({
        sessionId: "session_123",
        status: "in_progress",
        mode: "quick",
        targetQuestionCount: 24,
        stepIndex: 0,
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
            {
              id: "option_2",
              label: "先观察一会儿",
              order: 2,
            },
          ],
        },
      }),
    );

    render(<QuizSessionClient sessionId="session_123" />);

    await waitFor(() => {
      expect(screen.getByText("和朋友一起出游时，你通常更像哪种角色？")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/api/quiz/session_123", {
      method: "GET",
    });
    expect(screen.getByText("强烈不认同")).toBeInTheDocument();
    expect(screen.getByText("强烈认同")).toBeInTheDocument();
  });

  it("submits immediately when an option is selected and does not render a submit button", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            sessionId: "session_auto",
            status: "in_progress",
            mode: "quick",
            targetQuestionCount: 24,
            stepIndex: 0,
            nextQuestion: {
              id: "question_1",
              slug: "driving-style",
              title: "我希望车辆在超车和并线时给我更直接的响应。",
              description: "请选择你对这句话的认同程度",
              branchKey: null,
              type: "CAR_USAGE",
              options: [
                { id: "option_1", label: "强烈不认同", order: 1 },
                { id: "option_2", label: "不太认同", order: 2 },
                { id: "option_3", label: "中立", order: 3 },
                { id: "option_4", label: "比较认同", order: 4 },
                { id: "option_5", label: "强烈认同", order: 5 },
              ],
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            accepted: true,
            completed: false,
            lockedQuestionId: "question_1",
            nextQuestion: {
              id: "question_2",
              slug: "smart-cockpit",
              title: "我愿意为了更强的智能座舱和车机体验付出一些学习成本。",
              description: "请选择你对这句话的认同程度",
              branchKey: null,
              type: "CAR_USAGE",
              options: [
                { id: "option_a", label: "强烈不认同", order: 1 },
                { id: "option_b", label: "不太认同", order: 2 },
                { id: "option_c", label: "中立", order: 3 },
                { id: "option_d", label: "比较认同", order: 4 },
                { id: "option_e", label: "强烈认同", order: 5 },
              ],
            },
          }),
        }),
    );

    render(<QuizSessionClient sessionId="session_auto" />);

    await waitFor(() => {
      expect(
        screen.getByText("我希望车辆在超车和并线时给我更直接的响应。"),
      ).toBeInTheDocument();
    });

    expect(screen.queryByRole("button", { name: /锁定答案并继续|提交中/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("强烈认同"));

    await waitFor(() => {
      expect(fetch).toHaveBeenNthCalledWith(2, "/api/quiz/session_auto/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: "question_1",
          optionId: "option_5",
        }),
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("我愿意为了更强的智能座舱和车机体验付出一些学习成本。"),
      ).toBeInTheDocument();
    });
  });

  it("shows a recoverable error when answer submission fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            sessionId: "session_error",
            status: "in_progress",
            mode: "quick",
            targetQuestionCount: 24,
            stepIndex: 0,
            nextQuestion: {
              id: "question_1",
              slug: "driving-style",
              title: "我希望车辆在超车和并线时给我更直接的响应。",
              description: "请选择你对这句话的认同程度",
              branchKey: null,
              type: "CAR_USAGE",
              options: [
                { id: "option_1", label: "强烈不认同", order: 1 },
                { id: "option_2", label: "不太认同", order: 2 },
                { id: "option_3", label: "中立", order: 3 },
                { id: "option_4", label: "比较认同", order: 4 },
                { id: "option_5", label: "强烈认同", order: 5 },
              ],
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({
            message: "Assessment API request failed with status 409",
          }),
        }),
    );

    render(<QuizSessionClient sessionId="session_error" />);

    await waitFor(() => {
      expect(
        screen.getByText("我希望车辆在超车和并线时给我更直接的响应。"),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("强烈认同"));

    await waitFor(() => {
      expect(
        screen.getByText("答案提交失败：Assessment API request failed with status 409"),
      ).toBeInTheDocument();
    });
  });

  it("submits only once when the same option is triggered rapidly", async () => {
    let resolveAnswer: ((value: {
      ok: boolean;
      json: () => Promise<{
        accepted: boolean;
        completed: boolean;
        lockedQuestionId: string;
        nextQuestion: null;
      }>;
    }) => void) | null = null;

    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            sessionId: "session_once",
            status: "in_progress",
            mode: "quick",
            targetQuestionCount: 24,
            stepIndex: 0,
            nextQuestion: {
              id: "question_1",
              slug: "driving-style",
              title: "我希望车辆在超车和并线时给我更直接的响应。",
              description: "请选择你对这句话的认同程度",
              branchKey: null,
              type: "CAR_USAGE",
              options: [
                { id: "option_1", label: "强烈不认同", order: 1 },
                { id: "option_2", label: "不太认同", order: 2 },
                { id: "option_3", label: "中立", order: 3 },
                { id: "option_4", label: "比较认同", order: 4 },
                { id: "option_5", label: "强烈认同", order: 5 },
              ],
            },
          }),
        })
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              resolveAnswer = resolve;
            }),
        ),
    );

    render(<QuizSessionClient sessionId="session_once" />);

    await waitFor(() => {
      expect(
        screen.getByText("我希望车辆在超车和并线时给我更直接的响应。"),
      ).toBeInTheDocument();
    });

    const option = screen.getByLabelText("强烈认同");

    fireEvent.click(option);
    fireEvent.click(option);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    resolveAnswer?.({
      ok: true,
      json: async () => ({
        accepted: true,
        completed: false,
        lockedQuestionId: "question_1",
        nextQuestion: null,
      }),
    });
  });
});
