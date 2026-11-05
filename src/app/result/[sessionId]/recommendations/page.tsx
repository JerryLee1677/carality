import React from "react";
import Link from "next/link";
import { assessmentApiFetch } from "@/lib/assessment-api";
import type { AssessmentResult } from "@/lib/assessment-session";
import { type Copy, format } from "@/lib/copy";
import { getServerCopy } from "@/lib/copy/server";

type RecommendationBucket = "electric" | "fuel";
type RecommendationsCopy = Copy["recommendations"];

function getRecommendationBucket(energyType: string): RecommendationBucket {
  const normalizedEnergyType = energyType.toUpperCase();

  if (normalizedEnergyType === "EV" || normalizedEnergyType === "PHEV" || normalizedEnergyType === "EREV") {
    return "electric";
  }

  return "fuel";
}

function getBucketLabel(bucket: RecommendationBucket, copy: RecommendationsCopy) {
  return bucket === "electric" ? copy.electricTitle : copy.fuelTitle;
}

function getBucketDescription(bucket: RecommendationBucket, copy: RecommendationsCopy) {
  return bucket === "electric" ? copy.electricDescription : copy.fuelDescription;
}

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const copy = await getServerCopy();
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
    {
      key: "electric",
      title: getBucketLabel("electric", copy.recommendations),
      description: getBucketDescription("electric", copy.recommendations),
      items: electricRecommendations,
    },
    {
      key: "fuel",
      title: getBucketLabel("fuel", copy.recommendations),
      description: getBucketDescription("fuel", copy.recommendations),
      items: fuelRecommendations,
    },
  ] as const;

  return (
    <main className="shell py-8 sm:py-10">
      <section className="recommendations-hero">
        <p className="recommendations-hero__eyebrow">
          {copy.recommendations.eyebrow}
        </p>
        <div className="recommendations-hero__row">
          <div className="recommendations-hero__content">
            <h1 className="recommendations-hero__title">{copy.recommendations.title}</h1>
            <p className="recommendations-hero__body">
              {copy.recommendations.introPrefix}
              <span className="recommendations-hero__highlight"> {headline} </span>
              {copy.recommendations.introSuffix}
            </p>
          </div>
          <Link
            href={`/result/${sessionId}`}
            className="race-button race-button-ghost recommendations-hero__action"
          >
            {copy.recommendations.back}
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
                  <p className="recommendation-group__count">
                    {format(copy.recommendations.groupCount, { count: section.items.length })}
                  </p>
                </div>

                {section.items.length > 0 ? (
                  <div className="recommendation-group__list">
                    {section.items.map((vehicle) => (
                      <article key={vehicle.slug} className="recommendation-card">
                        <div className="recommendation-card__meta">
                          <p className="recommendation-card__rank">
                            {format(copy.recommendations.rankLabel, { rank: vehicle.rank })}
                          </p>
                          <h3 className="recommendation-card__title">
                            {vehicle.brand} {vehicle.series}
                          </h3>
                        </div>

                        <p className="recommendation-card__reason">{vehicle.reason}</p>
                        {vehicle.diagnostics?.selectionNote ? <p className="recommendation-card__reason">{vehicle.diagnostics.selectionNote}</p> : null}

                        <div className="recommendation-card__aside">
                          <Link
                            href={`/cars/${vehicle.slug}`}
                            className="race-button race-button-primary recommendation-card__button"
                          >
                            {copy.recommendations.viewDetail}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="recommendations-empty recommendations-empty--compact">
                    <h3 className="recommendations-empty__title">{copy.recommendations.emptyGroupTitle}</h3>
                    <p className="recommendations-empty__body">{copy.recommendations.emptyGroupBody}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          <div className="recommendations-empty">
            <h2 className="recommendations-empty__title">{copy.recommendations.emptyTitle}</h2>
            <p className="recommendations-empty__body">{copy.recommendations.emptyBody}</p>
          </div>
        )}
      </section>
    </main>
  );
}
