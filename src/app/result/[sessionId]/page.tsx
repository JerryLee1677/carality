import React from "react";
import Link from "next/link";
import { assessmentApiFetch } from "@/lib/assessment-api";
import type { AssessmentResult } from "@/lib/assessment-session";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const response = await assessmentApiFetch(`/assessment/sessions/${sessionId}/result`, {
    method: "GET",
  });
  const result = (await response.json()) as AssessmentResult;
  const personality = result.personality;

  return (
    <main className="shell py-8 sm:py-10">
      <section className="personality-result">
        <div className="personality-result__poster dashboard-panel-strong">
          {personality.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personality.imageUrl}
              alt={`${personality.word} ${personality.name}`}
              className="personality-result__image"
            />
          ) : (
            <div className="personality-result__image-placeholder">
              <p className="display-font text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Personality Image
              </p>
            </div>
          )}
          <p className="personality-result__score">{personality.matchScore}%</p>
          <p className="personality-result__score-label">匹配度</p>
        </div>

        <div className="personality-result__content dashboard-panel">
          <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
            你的汽车人格
          </p>
          <h1 className="personality-result__title">{personality.word}</h1>
          <p className="display-font text-lg tracking-[0.12em] text-[var(--color-text)] sm:text-xl">
            {personality.name}
          </p>
          <p className="text-sm tracking-[0.12em] text-[var(--color-accent-2)]">
            {personality.epithet} · 人格代号 {personality.code.toUpperCase()}
          </p>
          <p className="personality-result__subtitle">{personality.subtitle}</p>
          <p className="personality-result__summary">{personality.summary}</p>

          <div className="personality-result__section">
            <p className="personality-result__section-title">决策方式</p>
            <p className="personality-result__copy">{personality.decisionStyle}</p>
          </div>

          <div className="personality-result__grid">
            <section className="personality-result__card" aria-label="你的优势">
              <p className="personality-result__section-title">你的优势</p>
              <ul className="personality-result__list">
                {personality.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="personality-result__card" aria-label="你的注意点">
              <p className="personality-result__section-title">你的注意点</p>
              <ul className="personality-result__list">
                {personality.cautions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="personality-result__grid">
            <section className="personality-result__card">
              <p className="personality-result__section-title">生活场景</p>
              <ul className="personality-result__list">
                {personality.lifeScenes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="personality-result__card">
              <p className="personality-result__section-title">用车习惯</p>
              <ul className="personality-result__list">
                {personality.usageHabits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="personality-result__section">
            <p className="personality-result__section-title">核心维度</p>
            <div className="personality-result__dimensions">
              {personality.dimensionSnapshot.map((dimension) => (
                <div key={dimension.key} className="personality-result__dimension">
                  <div className="flex items-center justify-between gap-4">
                    <span>{dimension.label}</span>
                    <span>{dimension.directionLabel}</span>
                  </div>
                  <div className="personality-result__dimension-track">
                    <div
                      className="personality-result__dimension-fill"
                      style={{ width: `${dimension.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {result.recommendationEntry ? (
            <Link
              href={result.recommendationEntry.href}
              className="race-button race-button-ghost mt-2 w-full justify-center px-6 py-3 sm:w-auto"
            >
              {result.recommendationEntry.label}
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
