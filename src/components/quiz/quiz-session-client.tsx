"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getAssessmentSessionStorageKey,
  type AssessmentQuestion,
  type AssessmentResult,
  type AssessmentSessionSnapshot,
} from "@/lib/assessment-session";

type SubmitAnswerResponse = {
  accepted: boolean;
  completed: boolean;
  lockedQuestionId: string;
  nextQuestion: AssessmentQuestion | null;
  result?: AssessmentResult;
  message?: string;
};

function readSnapshot(sessionId: string) {
  const raw = sessionStorage.getItem(getAssessmentSessionStorageKey(sessionId));

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as AssessmentSessionSnapshot;
}

export function QuizSessionClient({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<AssessmentSessionSnapshot | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    let isActive = true;

    void (async () => {
      try {
        const response = await fetch(`/api/quiz/${sessionId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to load current session snapshot");
        }

        const remoteSnapshot = (await response.json()) as AssessmentSessionSnapshot;

        if (!isActive) {
          return;
        }

        sessionStorage.setItem(
          getAssessmentSessionStorageKey(sessionId),
          JSON.stringify(remoteSnapshot),
        );
        setSnapshot(remoteSnapshot);
      } catch {
        const stored = readSnapshot(sessionId);

        if (isActive && stored) {
          setSnapshot(stored);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [sessionId]);

  async function submitSelectedOption(questionId: string, optionId: string) {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch(`/api/quiz/${sessionId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          optionId,
        }),
      });

      const payload = (await response.json()) as SubmitAnswerResponse;

      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to submit answer");
      }

      if (payload.completed && payload.result) {
        sessionStorage.removeItem(getAssessmentSessionStorageKey(sessionId));
        router.push(`/result/${sessionId}`);
        return;
      }

      const nextSnapshot: AssessmentSessionSnapshot = {
        sessionId,
        status: "in_progress",
        mode: snapshot?.mode ?? "quick",
        targetQuestionCount,
        stepIndex: (snapshot?.stepIndex ?? 0) + 1,
        nextQuestion: payload.nextQuestion,
      };

      sessionStorage.setItem(
        getAssessmentSessionStorageKey(sessionId),
        JSON.stringify(nextSnapshot),
      );
      setSnapshot(nextSnapshot);
      setSelectedOptionId(null);
    } catch (error) {
      setSubmissionError(
        error instanceof Error && error.message
          ? `答案提交失败：${error.message}`
          : "当前答案提交失败，请刷新页面后重试。",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  const question = snapshot?.nextQuestion ?? null;

  if (!question) {
    return (
      <main className="shell py-6 sm:py-8">
        <div className="dashboard-panel-strong mx-auto max-w-2xl rounded-[2rem] p-6 sm:p-8">
          <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
            Session Missing
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">当前答题会话没有可恢复的题目</h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            这通常是因为页面被刷新，或者会话缓存已丢失。先重新开始一次测评，后面我再补完整的会话恢复接口。
          </p>
          <Link href="/quiz" className="race-button race-button-primary mt-6 px-6 py-3">
            重新开始
          </Link>
        </div>
      </main>
    );
  }

  const targetQuestionCount = snapshot?.targetQuestionCount ?? 24;
  const progress = `${(snapshot?.stepIndex ?? 0) + 1} / ${targetQuestionCount}`;

  return (
    <main className="shell py-6 sm:py-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="dashboard-panel rounded-[1.8rem] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="display-font text-xs uppercase tracking-[0.32em] text-[var(--color-accent-2)]">
                In Progress
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">第 {progress} 题</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs uppercase tracking-[0.24em] text-[var(--color-muted)] sm:inline-flex">
                adaptive assessment
              </span>
              <div className="relative h-3 w-full max-w-[12rem] overflow-hidden rounded-full bg-[rgba(31,38,45,0.08)] sm:w-40">
                <div
                  className="absolute inset-y-0 left-0 w-full opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0, transparent 14%, rgba(255,255,255,0.45) 14%, rgba(255,255,255,0.45) 16%)",
                    backgroundSize: "28px 100%",
                    animation: "road-flow 10s linear infinite",
                  }}
                />
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] transition-all"
                  style={{ width: `${Math.min((((snapshot?.stepIndex ?? 0) + 1) / targetQuestionCount) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel-strong rounded-[2rem] p-5 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
                Decision Prompt
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
                {question.title}
              </h1>
              {question.description ? (
                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
                  {question.description}
                </p>
              ) : null}
            </div>
            <div className="tach-ring relative hidden h-28 w-28 shrink-0 rounded-full border border-[var(--color-line)] bg-white/70 md:block">
              <div className="absolute inset-0 grid place-items-center">
                <div className="display-font text-center text-3xl uppercase text-[var(--color-accent)]">
                  Q{(snapshot?.stepIndex ?? 0) + 1}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between px-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              <span>不认同</span>
              <span>认同</span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-2 sm:gap-4">
              {question.options.map((option, optionIndex) => {
                const isActive = selectedOptionId === option.id;
                const sizeClass =
                  option.order === 1 || option.order === 5
                    ? "h-14 w-14 sm:h-16 sm:w-16"
                    : option.order === 3
                      ? "h-8 w-8 sm:h-10 sm:w-10"
                      : "h-11 w-11 sm:h-12 sm:w-12";
                const basePalette =
                  option.order < 3
                    ? "border-[rgba(40,83,107,0.3)] bg-[rgba(40,83,107,0.12)] text-[var(--color-text)]"
                    : option.order > 3
                      ? "border-[rgba(217,106,44,0.32)] bg-[rgba(217,106,44,0.12)] text-[var(--color-text)]"
                      : "border-[rgba(31,38,45,0.18)] bg-white/72 text-[var(--color-muted)]";

                return (
                  <label
                    key={option.id}
                    className="flex flex-1 cursor-pointer flex-col items-center gap-3"
                  >
                    <input
                      type="radio"
                      name={question.slug}
                      aria-label={option.label}
                      checked={isActive}
                      disabled={isSubmitting}
                      className="sr-only"
                      onChange={() => {
                        if (isSubmitting) {
                          return;
                        }

                        setSelectedOptionId(option.id);
                        void submitSelectedOption(question.id, option.id);
                      }}
                    />
                    <span
                      className={`grid shrink-0 place-items-center rounded-full border transition-all ${sizeClass} ${
                        isActive
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#fffaf5] shadow-[0_0_0_10px_rgba(217,106,44,0.12)]"
                          : basePalette
                      } ${isSubmitting ? "opacity-60" : ""}`}
                    >
                      <span className="display-font text-xs sm:text-sm">{optionIndex + 1}</span>
                    </span>
                    <span className="text-center text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] sm:text-xs">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
            {isSubmitting ? (
              <p className="mt-6 text-center text-sm text-[var(--color-muted)]">正在锁定答案...</p>
            ) : null}
            {submissionError ? (
              <p className="mt-4 text-center text-sm text-[var(--color-accent)]">
                {submissionError}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
