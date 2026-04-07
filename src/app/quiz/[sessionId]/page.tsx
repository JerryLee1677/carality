"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/quiz/questions";

export default function QuizSessionPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array.from({ length: questions.length }, () => -1),
  );

  const question = questions[index];
  const canContinue = selectedOptions[index] >= 0;
  const progress = useMemo(
    () => `${index + 1} / ${questions.length}`,
    [index],
  );

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">第 {progress} 题</p>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">{question.title}</h1>
        {question.description ? (
          <p className="mt-3 text-slate-600">{question.description}</p>
        ) : null}

        <div className="mt-8 grid gap-3">
          {question.options.map((option, optionIndex) => (
            <label
              key={`${question.slug}-${option.order}`}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-slate-400"
            >
              <input
                type="radio"
                name={question.slug}
                checked={selectedOptions[index] === optionIndex}
                onChange={() => {
                  setSelectedOptions((current) => {
                    const next = [...current];
                    next[index] = optionIndex;
                    return next;
                  });
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="rounded-full border border-slate-300 px-5 py-3 text-slate-700 disabled:opacity-50"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          上一题
        </button>
        <button
          className="rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
          disabled={!canContinue}
          onClick={() => {
            if (index === questions.length - 1) {
              router.push(`/result/local-session?answers=${selectedOptions.join(",")}`);
              return;
            }

            setIndex((current) => current + 1);
          }}
        >
          {index === questions.length - 1 ? "查看结果" : "下一题"}
        </button>
      </div>
    </main>
  );
}
