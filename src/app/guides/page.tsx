import Link from "next/link";
import { buyingGuides } from "@/data/content/buying-guides";

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">购车指南</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {buyingGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-medium">{guide.title}</h2>
            <p className="mt-3 text-slate-600">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
