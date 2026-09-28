"use client";

import React from "react";
import { StartQuizButton } from "@/components/quiz/start-quiz-button";
import { useLanguage } from "@/lib/i18n";

function QuizModeIcon({ type }: { type: "speed" | "standard" }) {
  if (type === "speed") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="quiz-mode-card__icon">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="quiz-mode-card__icon quiz-mode-card__icon--stroke"
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

export default function QuizPage() {
  const { translations } = useLanguage();
  const copy = translations.quiz;

  return (
    <main className="quiz-intro">
      <section className="shell quiz-intro__inner">
        <h1 className="quiz-intro__title">{copy.title}</h1>
        <p className="quiz-intro__subtitle">{copy.subtitle}</p>

        <div className="quiz-intro__modes">
          <article className="quiz-mode-card quiz-mode-card--speed">
            <QuizModeIcon type="speed" />
            <p className="quiz-mode-card__eyebrow">{copy.speedMode}</p>
            <p className="quiz-mode-card__description">{copy.speedDescription}</p>
            <StartQuizButton mode="quick" />
          </article>

          <article className="quiz-mode-card quiz-mode-card--standard">
            <QuizModeIcon type="standard" />
            <span className="quiz-mode-card__recommended">{copy.recommended}</span>
            <p className="quiz-mode-card__eyebrow">{copy.standard}</p>
            <p className="quiz-mode-card__description">{copy.standardDescription}</p>
            <StartQuizButton mode="standard" />
          </article>
        </div>
      </section>
    </main>
  );
}
