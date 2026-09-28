"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getAssessmentSessionStorageKey, type AssessmentSessionSnapshot } from "@/lib/assessment-session";
import { useLanguage } from "@/lib/i18n";

export function StartQuizButton({ mode }: { mode: "quick" | "standard" }) {
  const router = useRouter();
  const { translations } = useLanguage();
  const label = mode === "standard" ? translations.quiz.selectStandard : translations.quiz.selectSpeed;

  return (
    <button
      className="quiz-mode-card__button"
      onClick={async () => {
        const response = await fetch("/api/quiz/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mode }),
        });

        if (!response.ok) {
          throw new Error("Failed to create assessment session");
        }

        const session = (await response.json()) as AssessmentSessionSnapshot;
        const snapshot: AssessmentSessionSnapshot = {
          sessionId: session.sessionId,
          status: session.status,
          mode: session.mode,
          targetQuestionCount: session.targetQuestionCount,
          stepIndex: 0,
          nextQuestion: session.nextQuestion,
        };

        sessionStorage.setItem(
          getAssessmentSessionStorageKey(session.sessionId),
          JSON.stringify(snapshot),
        );

        router.push(`/quiz/${session.sessionId}`);
      }}
    >
      {label}
    </button>
  );
}
