import React from "react";
import Link from "next/link";
import { assessmentApiFetch } from "@/lib/assessment-api";
import type { AssessmentResult } from "@/lib/assessment-session";

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const response = await assessmentApiFetch(`/assessment/sessions/${sessionId}/result`, {
    method: "GET",
  });
  const result = (await response.json()) as AssessmentResult;
  const headline = result.personalityProfile?.name ?? result.personality.name;

  return (
    <main className="shell py-8 sm:py-10">
      <section className="dashboard-panel-strong flex flex-col gap-4">
        <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
          Vehicle Match
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
              适合你人格的车型方向
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              基于你的人格画像
              <span className="font-medium text-[var(--color-text)]"> {headline} </span>
              ，这里是当前更匹配的车型建议，你可以继续查看每台车的匹配理由与详情。
            </p>
          </div>
          <Link
            href={`/result/${sessionId}`}
            className="race-button race-button-ghost w-full justify-center px-6 py-3 sm:w-auto"
          >
            返回人格结果
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4">
        {result.recommendations.length > 0 ? (
          result.recommendations.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="dashboard-panel flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-accent-2)]">
                  Top {vehicle.rank}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  {vehicle.brand} {vehicle.series}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                  {vehicle.reason}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <p className="text-sm text-[var(--color-muted)]">
                  匹配分
                  <span className="ml-2 text-2xl font-semibold text-[var(--color-text)]">
                    {vehicle.score}
                  </span>
                </p>
                <Link
                  href={`/cars/${vehicle.slug}`}
                  className="race-button race-button-primary w-full justify-center px-6 py-3 sm:w-auto"
                >
                  查看车型详情
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="dashboard-panel">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
              推荐结果生成中
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              当前还没有可展示的车型推荐，你可以先返回人格结果页，稍后再次查看。
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
