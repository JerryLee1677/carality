import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="shell grid min-h-[calc(100vh-88px)] gap-6 py-8 md:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-14">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <div className="metric-chip">12 Questions / 4 Axes / 1 Main Recommendation</div>
          <div className="space-y-5">
            <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              Car Personality Match
            </p>
            <h1 className="max-w-4xl text-[3rem] font-semibold leading-[0.94] text-[var(--color-text)] sm:text-[4.2rem] lg:text-[5.5rem]">
              找到最适合你的汽车人格与选车方案
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              用连续答题的方式判断你更偏向实用还是情绪、品牌还是性价比，最后直接给出更适合你的主推荐车型与备选清单。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["2 分钟", "完成整套测试"],
              ["匿名", "无需登录即可开始"],
              ["购车建议", "结果页直接可用"],
            ].map(([value, label]) => (
              <div key={label} className="dashboard-panel rounded-[1.4rem] p-4">
                <p className="display-font text-2xl text-[var(--color-text)]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              as={Link}
              href="/quiz"
              className="race-button race-button-primary px-7 py-4"
            >
              开始测试
            </Button>
            <Button
              as={Link}
              href="/guides"
              className="race-button race-button-ghost px-7 py-4"
            >
              先看购车指南
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["P / E", "实用 or 情绪"],
              ["S / Q", "省钱 or 品质"],
              ["C / D", "舒适 or 驾控"],
            ].map(([code, label], index) => (
              <div
                key={code}
                className="dashboard-panel panel-stripe relative rounded-[1.8rem] p-5"
                style={{ animation: `gear-shift 500ms ease ${index * 120}ms both` }}
              >
                <p className="display-font text-3xl uppercase text-[var(--color-accent)]">
                  {code}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="dashboard-panel-strong relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="tach-ring relative mx-auto grid aspect-square w-full max-w-[18rem] place-items-center rounded-full border border-[var(--color-line)] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(235,226,212,0.86))]">
                <div className="relative z-10 grid h-[74%] w-[74%] place-items-center rounded-full border border-[var(--color-line)] bg-[rgba(255,251,246,0.92)] text-center">
                  <div>
                    <p className="display-font text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">
                      Sample Result
                    </p>
                    <p className="display-font mt-3 text-6xl font-semibold uppercase text-[var(--color-accent)] sm:text-7xl">
                      PSCV
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[var(--color-accent-2)]">
                      实用 / 省钱 / 舒适 / 性价比
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-[var(--color-line)] bg-white/70 p-4">
                  <p className="display-font text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                    主推荐
                  </p>
                  <p className="mt-2 display-font text-3xl uppercase text-[var(--color-text)]">
                    比亚迪 宋 PLUS DM-i
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    更适合重视空间、家庭舒适性和长期用车成本的人群。
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["12", "道题完成测试"],
                    ["1 + 3", "主推荐 + 备选"],
                    ["20+", "首版精选车型"],
                    ["移动端", "优先设计"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/60 p-4"
                    >
                      <p className="display-font text-3xl uppercase text-[var(--color-accent)]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="dashboard-panel rounded-[2rem] p-6 sm:p-7">
            <p className="display-font text-sm uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              为什么适合首版上线
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              先把用户最关心的
              <span className="block text-[var(--color-accent)]">选车判断做清楚</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              首页负责快速建立理解，答题页保持节奏，结果页优先展示推荐车型。广告、登录、支付和地区服务可以后续继续往里接，不会破坏现有链路。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "信息更醒目",
                text: "首屏聚焦测试价值、开始按钮和样例结果，不再堆叠次要装饰。",
              },
              {
                title: "移动端更顺手",
                text: "按钮尺寸、留白和卡片宽度都按手机优先，Pad 和桌面端再自然拉伸。",
              },
              {
                title: "汽车感保留但克制",
                text: "只保留轮毂转动、进度扫光这类轻量动画，让页面有记忆点但不显得压抑。",
              },
              {
                title: "后续可扩展",
                text: "推荐、内容、商业化和地域服务都可以继续接入，不需要推翻前后端结构。",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="dashboard-panel rounded-[1.6rem] p-5"
                style={{ animation: `gear-shift 560ms ease ${index * 90}ms both` }}
              >
                <p className="display-font text-2xl uppercase text-[var(--color-text)]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
