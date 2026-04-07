import Link from "next/link";
import { questions } from "@/data/quiz/questions";
import { recommendationRepository } from "@/modules/recommendation/repository/recommendation-repository";
import { buildPersonalityCode } from "@/modules/quiz/domain/build-personality-code";
import { scoreAnswers } from "@/modules/quiz/domain/score-answer";

function parseAnswerIndexes(raw: string | undefined) {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isInteger(value) && value >= 0);
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ answers?: string }>;
}) {
  const { answers } = await searchParams;
  const answerIndexes = parseAnswerIndexes(answers);

  const scoredAnswers = questions
    .map((question, index) => question.options[answerIndexes[index]])
    .filter(
      (
        option,
      ): option is (typeof questions)[number]["options"][number] => Boolean(option),
    )
    .map((option) => ({ weights: option.weights }));

  const scores = scoreAnswers(scoredAnswers);
  const personalityCode = buildPersonalityCode(scores);
  const recommendations = recommendationRepository.getRankedRecommendations(scores);
  const [topVehicle, ...alternatives] = recommendations;

  return (
    <main className="shell py-8 sm:py-10">
      {topVehicle ? (
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="dashboard-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
            <div className="metric-chip">Top Recommendation</div>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
              你的结果更适合从这台车开始看
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
              {topVehicle.brand}
              <span className="block text-[var(--color-accent)]">
                {topVehicle.series} {topVehicle.modelName}
              </span>
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
                  {topVehicle.matchScore}
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

          <div className="dashboard-panel rounded-[2rem] p-6 sm:p-8">
            <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              你的汽车人格
            </p>
            <h2 className="mt-3 display-font text-[4.4rem] font-semibold uppercase leading-none text-[var(--color-text)] sm:text-[5.6rem]">
              {personalityCode}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              这个结果代表你在四组决策维度中的主导倾向，方便你后续继续筛车型、看参数和比配置。
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                ["P / E", `${scores.practical}:${scores.emotional}`],
                ["S / Q", `${scores.saving}:${scores.quality}`],
                ["C / D", `${scores.comfort}:${scores.driving}`],
                ["B / V", `${scores.brand}:${scores.value}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.35rem] border border-[var(--color-line)] bg-white/62 p-4"
                >
                  <p className="display-font text-xl uppercase text-[var(--color-accent-2)]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
                <p className="mt-2 text-sm text-[var(--color-accent-2)]">{vehicle.modelName}</p>
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
