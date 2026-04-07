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
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="rounded-3xl bg-amber-100 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-600">你的汽车人格</p>
        <h1 className="mt-4 text-5xl font-semibold">{personalityCode}</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          结果基于你在实用、情绪、省钱、品质、舒适、驾控、品牌、性价比八个维度上的答题倾向生成。
        </p>
      </section>

      {topVehicle ? (
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-500">最优推荐</p>
            <h2 className="mt-2 text-3xl font-semibold">
              {topVehicle.brand} {topVehicle.series} {topVehicle.modelName}
            </h2>
            <p className="mt-4 text-slate-600">{topVehicle.reason}</p>
            <p className="mt-4 text-slate-800">{topVehicle.matchScore} 匹配分</p>
            <Link
              href={`/cars/${topVehicle.slug}`}
              className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-white"
            >
              查看车型详情
            </Link>
          </article>

          <aside className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-sm text-white/70">备选车型</p>
            <ul className="mt-4 grid gap-4">
              {alternatives.map((vehicle) => (
                <li key={vehicle.slug} className="rounded-2xl border border-white/10 p-4">
                  <p className="font-medium">
                    {vehicle.brand} {vehicle.series} {vehicle.modelName}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{vehicle.reason}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      ) : null}
    </main>
  );
}
