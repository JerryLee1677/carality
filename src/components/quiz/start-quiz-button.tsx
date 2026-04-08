"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getAssessmentSessionStorageKey, type AssessmentSessionSnapshot } from "@/lib/assessment-session";

export function StartQuizButton({ mode }: { mode: "quick" | "standard" }) {
  const router = useRouter();

  return (
    <button
      className="race-button race-button-primary mt-8 px-7 py-4"
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
      点火进入正式答题
    </button>
  );
}
