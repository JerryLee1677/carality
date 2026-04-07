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
  const progress = useMemo(() => `${index + 1} / ${questions.length}`, [index]);

  return (
    <main className="shell py-6 sm:py-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="dashboard-panel rounded-[1.8rem] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="display-font text-xs uppercase tracking-[0.32em] text-[var(--color-accent-2)]">
                In Progress
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">第 {progress} 题</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs uppercase tracking-[0.24em] text-[var(--color-muted)] sm:inline-flex">
                quiz progress
              </span>
              <div className="relative h-3 w-full max-w-[12rem] overflow-hidden rounded-full bg-[rgba(31,38,45,0.08)] sm:w-40">
                <div
                  className="absolute inset-y-0 left-0 w-full opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0, transparent 14%, rgba(255,255,255,0.45) 14%, rgba(255,255,255,0.45) 16%)",
                    backgroundSize: "28px 100%",
                    animation: "road-flow 10s linear infinite",
                  }}
                />
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] transition-all"
                  style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel-strong rounded-[2rem] p-5 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
                Decision Prompt
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
                {question.title}
              </h1>
              {question.description ? (
                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
                  {question.description}
                </p>
              ) : null}
            </div>
            <div className="tach-ring relative hidden h-28 w-28 shrink-0 rounded-full border border-[var(--color-line)] bg-white/70 md:block">
              <div className="absolute inset-0 grid place-items-center">
                <div className="display-font text-center text-3xl uppercase text-[var(--color-accent)]">
                  Q{index + 1}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {question.options.map((option, optionIndex) => {
              const isActive = selectedOptions[index] === optionIndex;

              return (
                <label
                  key={`${question.slug}-${option.order}`}
                  className={`option-panel panel-stripe flex cursor-pointer items-start gap-4 ${
                    isActive ? "border-[rgba(217,106,44,0.55)] bg-[rgba(217,106,44,0.12)]" : ""
                  }`}
                >
                  <span
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] uppercase ${
                      isActive
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#fffaf5]"
                        : "border-white/20 text-[var(--color-muted)]"
                    }`}
                  >
                    {optionIndex + 1}
                  </span>
                  <div className="flex-1">
                    <input
                      type="radio"
                      name={question.slug}
                      checked={isActive}
                      className="sr-only"
                      onChange={() => {
                        setSelectedOptions((current) => {
                          const next = [...current];
                          next[index] = optionIndex;
                          return next;
                        });
                      }}
                    />
                    <p className="text-base leading-7 text-[var(--color-text)] sm:text-lg">
                      {option.label}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      选项 {optionIndex + 1}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="race-button race-button-ghost justify-center px-5 py-3 disabled:opacity-45"
            disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            上一题
          </button>
          <button
            className="race-button race-button-primary justify-center px-6 py-3 disabled:opacity-45"
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
      </div>
    </main>
  );
}
