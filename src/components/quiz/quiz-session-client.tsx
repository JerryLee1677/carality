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
import { useLanguage } from "@/lib/i18n";
import { getOptionLabel, getQuestionText } from "@/lib/quiz-question-translations";

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
  const { language, translations } = useLanguage();
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
        targetQuestionCount: snapshot?.targetQuestionCount ?? 24,
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
      const fallback = translations.quiz.submitErrorFallback;
      const message =
        error instanceof Error && error.message
          ? translations.quiz.submitError.replace("{message}", error.message)
          : fallback;

      setSubmissionError(message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  const question = snapshot?.nextQuestion ?? null;

  if (!question) {
    return (
      <main className="quiz-session quiz-session--empty">
        <div className="shell quiz-session__empty">
          <h1>{translations.quiz.sessionTitle}</h1>
          <p>{translations.quiz.sessionBody}</p>
          <Link href="/quiz" className="quiz-session__restart">
            {translations.quiz.restart}
          </Link>
        </div>
      </main>
    );
  }

  const targetQuestionCount = snapshot?.targetQuestionCount ?? 24;
  const currentQuestionNumber = (snapshot?.stepIndex ?? 0) + 1;
  const progressPercent = Math.min((currentQuestionNumber / targetQuestionCount) * 100, 100);
  const questionText = getQuestionText(question, language);
  const quizLabel =
    snapshot?.mode === "standard" ? translations.quiz.standardQuiz : translations.quiz.quickQuiz;

  return (
    <main className="quiz-session">
      <section className="shell quiz-session__inner">
        <header className="quiz-session__progress">
          <p>
            {quizLabel} - {Math.round(progressPercent)}%
          </p>
          <div className="quiz-session__progress-track" aria-hidden="true">
            <div className="quiz-session__progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </header>

        <section className="quiz-session__question" aria-labelledby="quiz-question-title">
          <div className="quiz-session__question-copy">
            <p className="quiz-session__question-count">
              {translations.quiz.questionOf
                .replace("{current}", String(currentQuestionNumber))
                .replace("{total}", String(targetQuestionCount))}
            </p>
            <h1 id="quiz-question-title">{questionText.title}</h1>
            {questionText.description ? <p>{questionText.description}</p> : null}
          </div>

          <div className="quiz-session__options" role="radiogroup" aria-label={questionText.title}>
            {question.options.map((option) => {
              const order = option.order as 1 | 2 | 3 | 4 | 5;
              const optionLabel = getOptionLabel(order, language);
              const isSelected = selectedOptionId === option.id;

              return (
                <label key={option.id} className="quiz-session__option">
                  <input
                    type="radio"
                    name={question.slug}
                    aria-label={optionLabel}
                    checked={isSelected}
                    disabled={isSubmitting}
                    className="sr-only"
                    onChange={() => {
                      setSelectedOptionId(option.id);
                      void submitSelectedOption(question.id, option.id);
                    }}
                  />
                  <span className="quiz-session__option-label">
                    <span className="sm:hidden">{optionLabel}</span>
                    <span className="hidden sm:inline">
                      {order === 1 || order === 3 || order === 5 ? optionLabel : ""}
                    </span>
                  </span>
                  <span
                    className={`quiz-session__option-circle ${
                      isSelected ? "quiz-session__option-circle--active" : ""
                    }`}
                  >
                    {order}
                  </span>
                </label>
              );
            })}
          </div>

          {isSubmitting ? <p className="quiz-session__status">{translations.quiz.submitting}</p> : null}
          {submissionError ? <p className="quiz-session__error">{submissionError}</p> : null}
        </section>

        <p className="quiz-session__privacy">{translations.quiz.privacy}</p>
      </section>
    </main>
  );
}
