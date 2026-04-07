import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-20">
      <span className="max-w-fit rounded-full bg-amber-200 px-4 py-1 text-sm font-medium">
        汽车人格测试
      </span>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
        找到最适合你的汽车人格与选车方案
      </h1>
      <p className="max-w-2xl text-lg text-slate-600">
        通过 12 道题，生成你的四字母汽车人格，并给出 1 台最优推荐车型和 3 台备选方案。
      </p>
      <div className="flex flex-wrap gap-4">
        <Button
          as={Link}
          href="/quiz"
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          开始测试
        </Button>
        <Button
          as={Link}
          href="/guides"
          className="border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          查看购车指南
        </Button>
      </div>
    </main>
  );
}
