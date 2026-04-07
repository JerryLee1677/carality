import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col gap-4 px-6 py-16">
      <span className="w-fit rounded-full bg-amber-200 px-4 py-1 text-sm font-medium">准备开始</span>
      <h1 className="text-4xl font-semibold tracking-tight">汽车人格测试</h1>
      <p className="max-w-2xl text-lg text-slate-600">
        你将完成 12 道题。测试不需要登录，完成后会直接得到四字母汽车人格和推荐车型。
      </p>
      <Link
        href="/quiz/local-session"
        className="mt-2 w-fit rounded-full bg-slate-900 px-6 py-3 text-white"
      >
        开始正式答题
      </Link>
    </main>
  );
}
