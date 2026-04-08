import { StartQuizButton } from "@/components/quiz/start-quiz-button";

export default function QuizPage() {
  return (
    <main className="shell py-8 sm:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="dashboard-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="metric-chip">Start The Quiz</div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
            准备开始
            <span className="block text-[var(--color-accent)]">汽车人格测试</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)]">
            这不是传统性格测试。你可以选择更轻的极速版，或者更充分的标准版。系统会围绕真实购车决策连续追问，最后给出汽车人格和车型推荐。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["24 / 56", "两种题量"],
              ["匿名", "无需登录"],
              ["约 4 / 9 分钟", "完成测试"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/65 p-4">
                <p className="display-font text-3xl uppercase text-[var(--color-accent)]">
                  {value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.6rem] border border-[var(--color-line)] bg-white/70 p-5">
              <p className="display-font text-sm uppercase tracking-[0.26em] text-[var(--color-accent)]">
                极速版
              </p>
              <p className="mt-3 text-3xl font-semibold text-[var(--color-text)]">24 题</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                适合快速得到方向判断。会覆盖预算、家庭、补能、驾驶风格和核心偏好，但解释颗粒度更粗。
              </p>
              <StartQuizButton mode="quick" />
            </div>

            <div className="rounded-[1.6rem] border border-[var(--color-line)] bg-[rgba(217,106,44,0.08)] p-5">
              <p className="display-font text-sm uppercase tracking-[0.26em] text-[var(--color-accent-2)]">
                标准版
              </p>
              <p className="mt-3 text-3xl font-semibold text-[var(--color-text)]">56 题</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                适合更认真地做一次。会展开更多生活决策、场景约束、能源接受度和品牌取向，推荐更稳定。
              </p>
              <StartQuizButton mode="standard" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="dashboard-panel rounded-[1.6rem] p-5">
            <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              你会被如何判断
            </p>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              每道题都在帮助系统判断你在四组维度里的真实倾向，结果不会停留在性格解释，而是直接落到可比较的车型推荐。
            </p>
          </div>
          {[
            {
              title: "实用 vs 情绪",
              text: "你买车更偏向长期省心，还是更容易被喜欢和驾驶情绪打动。",
            },
            {
              title: "省钱 vs 品质",
              text: "你更在意购车和养车成本，还是更愿意为质感和体验付费。",
            },
            {
              title: "舒适 vs 驾控",
              text: "你更在意全家的乘坐感，还是更在意自己开起来的反馈。",
            },
            {
              title: "品牌 vs 性价比",
              text: "当品牌认知和配置价格冲突时，你到底会怎么选。",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="dashboard-panel rounded-[1.6rem] p-5"
              style={{ animation: `gear-shift 560ms ease ${index * 90}ms both` }}
            >
              <p className="display-font text-2xl text-[var(--color-text)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
