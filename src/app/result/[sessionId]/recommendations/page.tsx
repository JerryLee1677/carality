import React from "react";
import Link from "next/link";
import { assessmentApiFetch } from "@/lib/assessment-api";
import type { AssessmentResult } from "@/lib/assessment-session";

type RecommendationBucket = "electric" | "fuel";

function getRecommendationBucket(energyType: string): RecommendationBucket {
  const normalizedEnergyType = energyType.toUpperCase();

  if (normalizedEnergyType === "EV" || normalizedEnergyType === "PHEV" || normalizedEnergyType === "EREV") {
    return "electric";
  }

  return "fuel";
}

function getBucketLabel(bucket: RecommendationBucket) {
  return bucket === "electric" ? "电车推荐" : "油车推荐";
}

function getBucketDescription(bucket: RecommendationBucket) {
  return bucket === "electric"
    ? "纯电、插混和增程都归在这里，优先看使用感受和补能便利性。"
    : "燃油和混动都归在这里，优先看省心、稳定和传统驾驶习惯。";
}

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
  const electricRecommendations = result.recommendations.filter(
    (vehicle) => getRecommendationBucket(vehicle.energyType) === "electric",
  );
  const fuelRecommendations = result.recommendations.filter(
    (vehicle) => getRecommendationBucket(vehicle.energyType) === "fuel",
  );
  const recommendationSections = [
    { key: "electric", title: getBucketLabel("electric"), description: getBucketDescription("electric"), items: electricRecommendations },
    { key: "fuel", title: getBucketLabel("fuel"), description: getBucketDescription("fuel"), items: fuelRecommendations },
  ] as const;

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
          <div className="recommendations-groups">
            {recommendationSections.map((section) => (
              <section key={section.key} className="recommendation-group">
                <div className="recommendation-group__header">
                  <div>
                    <p className="recommendation-group__eyebrow">{section.title}</p>
                    <h2 className="recommendation-group__title">{section.description}</h2>
                  </div>
                  <p className="recommendation-group__count">{section.items.length} 辆</p>
                </div>

                {section.items.length > 0 ? (
                  <div className="recommendation-group__list">
                    {section.items.slice(0, 3).map((vehicle) => (
                      <article key={vehicle.slug} className="recommendation-card">
                        <div className="recommendation-card__meta">
                          <p className="recommendation-card__rank">Top {vehicle.rank}</p>
                          <h3 className="recommendation-card__title">
                            {vehicle.brand} {vehicle.series}
                          </h3>
                        </div>

                        <p className="recommendation-card__reason">{vehicle.reason}</p>

                        <div className="recommendation-card__aside">
                          <Link
                            href={`/cars/${vehicle.slug}`}
                            className="race-button race-button-primary recommendation-card__button"
                          >
                            查看车型详情
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="recommendations-empty recommendations-empty--compact">
                    <h3 className="recommendations-empty__title">暂无可展示车型</h3>
                    <p className="recommendations-empty__body">
                      当前这一类没有足够的推荐结果，系统会继续保留另一类车型供你参考。
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
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
