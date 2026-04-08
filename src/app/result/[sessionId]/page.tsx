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
  const recommendations = result.recommendations;
  const [topVehicle, ...alternatives] = recommendations;

  return (
    <main className="shell py-8 sm:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        {topVehicle ? (
          <div className="dashboard-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
            <div className="metric-chip">Top Recommendation</div>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
              你的结果更适合从这台车开始看
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
              {topVehicle.brand}
              <span className="block text-[var(--color-accent)]">{topVehicle.series}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              {topVehicle.reason}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/70 p-4">
                <p className="display-font text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  匹配分
                </p>
                <p className="mt-2 display-font text-4xl uppercase text-[var(--color-accent)]">
                  {topVehicle.score}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/70 p-4 sm:col-span-2">
                <p className="display-font text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  推荐逻辑
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text)]">
                  结合四组人格维度得分，优先匹配你的核心购车偏好，再给出 1 台主推荐和 3 台备选车型。
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/cars/${topVehicle.slug}`}
                className="race-button race-button-primary px-6 py-3"
              >
                查看车型详情
              </Link>
              <Link href="/guides" className="race-button race-button-ghost px-6 py-3">
                浏览购车指南
              </Link>
            </div>
          </div>
        ) : (
          <section className="dashboard-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
            <div className="metric-chip">Result Pending</div>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
              本次测试已完成
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
              人格画像已生成
              <span className="block text-[var(--color-accent)]">推荐车型仍在整理中</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              已成功生成你的汽车人格标签。当前没有可展示的车型推荐时，仍会保留画像结果，便于后续继续分析或补充推荐。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/70 p-4">
                <p className="display-font text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  推荐数量
                </p>
                <p className="mt-2 display-font text-4xl uppercase text-[var(--color-accent)]">0</p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/70 p-4">
                <p className="display-font text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  当前状态
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text)]">
                  人格结果已保留，可继续回看标签与摘要。
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="dashboard-panel rounded-[2rem] p-6 sm:p-8">
          <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
            你的汽车人格
          </p>
          <h2 className="mt-3 display-font text-[4.4rem] font-semibold uppercase leading-none text-[var(--color-text)] sm:text-[5.6rem]">
            {result.personalityProfile.code}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            {result.personalityProfile.summary}
          </p>

          <div className="mt-8 grid gap-3">
            {[
              ["画像名称", result.personalityProfile.name],
              ["会话编号", result.sessionId],
              ["推荐数量", `${result.recommendations.length} 台`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.35rem] border border-[var(--color-line)] bg-white/62 p-4">
                <p className="display-font text-xl uppercase text-[var(--color-accent-2)]">{label}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {alternatives.length > 0 ? (
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
                备选车型
              </p>
              <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">这 3 台也值得你比较</h3>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] md:block">
              swipe on mobile / compare on pad & pc
            </p>
          </div>

          <div className="mobile-scroller">
            {alternatives.map((vehicle) => (
              <article
                key={vehicle.slug}
                className="dashboard-panel min-w-[18.75rem] rounded-[1.7rem] p-5 md:min-w-0"
              >
                <p className="display-font text-2xl text-[var(--color-text)]">
                  {vehicle.brand} {vehicle.series}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {vehicle.reason}
                </p>
                <Link
                  href={`/cars/${vehicle.slug}`}
                  className="race-button race-button-ghost mt-5 w-full justify-center px-4 py-3"
                >
                  查看详情
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
