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
      <section className="recommendations-hero">
        <p className="recommendations-hero__eyebrow">
          Vehicle Match
        </p>
        <div className="recommendations-hero__row">
          <div className="recommendations-hero__content">
            <h1 className="recommendations-hero__title">适合你人格的车型方向</h1>
            <p className="recommendations-hero__body">
              基于你的人格画像
              <span className="recommendations-hero__highlight"> {headline} </span>
              ，这里是当前更匹配的车型建议，你可以继续查看每台车的匹配理由与详情。
            </p>
          </div>
          <Link
            href={`/result/${sessionId}`}
            className="race-button race-button-ghost recommendations-hero__action"
          >
            返回人格结果
          </Link>
        </div>
      </section>

      <section className="recommendations-list">
        {result.recommendations.length > 0 ? (
          result.recommendations.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="recommendation-card"
            >
              <div className="recommendation-card__meta">
                <p className="recommendation-card__rank">Top {vehicle.rank}</p>
                <h2 className="recommendation-card__title">
                  {vehicle.brand} {vehicle.series}
                </h2>
              </div>

              <p className="recommendation-card__reason">{vehicle.reason}</p>

              {vehicle.diagnostics ? (
                <section className="recommendation-diagnostics" aria-label={`${vehicle.brand} ${vehicle.series} 本地测试得分`}>
                  <div className="recommendation-diagnostics__header">
                    <p className="recommendation-diagnostics__eyebrow">本地测试得分</p>
                    <p className="recommendation-diagnostics__note">
                      用户偏好与车型分值越接近，说明该维度越支撑当前推荐。
                    </p>
                  </div>

                  <div className="recommendation-diagnostics__grid">
                    <div className="recommendation-diagnostics__panel">
                      <h3 className="recommendation-diagnostics__title">用户偏好向量</h3>
                      <div className="recommendation-diagnostics__rows">
                        {vehicle.diagnostics.userPreferenceVector.map((dimension) => (
                          <div key={dimension.key} className="diagnostic-row">
                            <span className="diagnostic-row__label">{dimension.label}</span>
                            <span className="diagnostic-row__track">
                              <span
                                className="diagnostic-row__fill diagnostic-row__fill--user"
                                style={{ width: `${dimension.value}%` }}
                              />
                            </span>
                            <span className="diagnostic-row__value">{dimension.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="recommendation-diagnostics__panel">
                      <h3 className="recommendation-diagnostics__title">车型各项分值</h3>
                      <div className="recommendation-diagnostics__rows">
                        {vehicle.diagnostics.vehicleScores.map((dimension) => (
                          <div key={dimension.key} className="diagnostic-row">
                            <span className="diagnostic-row__label">{dimension.label}</span>
                            <span className="diagnostic-row__track">
                              <span
                                className="diagnostic-row__fill diagnostic-row__fill--vehicle"
                                style={{ width: `${dimension.value}%` }}
                              />
                            </span>
                            <span className="diagnostic-row__value">{dimension.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="recommendation-diagnostics__breakdown">
                    <h3 className="recommendation-diagnostics__title">评分拆解</h3>
                    <dl className="score-breakdown">
                      {Object.entries(vehicle.diagnostics.scoreBreakdown).map(([key, value]) => (
                        <div key={key} className="score-breakdown__item">
                          <dt>{key}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>
              ) : null}

              <div className="recommendation-card__aside">
                <div className="recommendation-card__score-block">
                  <p className="recommendation-card__score-label">匹配分</p>
                  <p className="recommendation-card__score">{vehicle.score}</p>
                </div>
                <Link
                  href={`/cars/${vehicle.slug}`}
                  className="race-button race-button-primary recommendation-card__button"
                >
                  查看车型详情
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="recommendations-empty">
            <h2 className="recommendations-empty__title">推荐结果生成中</h2>
            <p className="recommendations-empty__body">
              当前还没有可展示的车型推荐，你可以先返回人格结果页，稍后再次查看。
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
