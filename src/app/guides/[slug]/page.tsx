import Link from "next/link";
import { notFound } from "next/navigation";
import { buyingGuides } from "@/data/content/buying-guides";
import { vehicleRepository } from "@/modules/catalog/repository/vehicle-repository";

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = buyingGuides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  const relatedVehicles = guide.relatedVehicleSlugs
    .map((vehicleSlug) => vehicleRepository.getBySlug(vehicleSlug))
    .filter(
      (
        vehicle,
      ): vehicle is NonNullable<ReturnType<typeof vehicleRepository.getBySlug>> =>
        Boolean(vehicle),
    );

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{guide.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{guide.excerpt}</p>
      <article className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
        <p className="leading-8 text-slate-700">{guide.body}</p>
      </article>

      {relatedVehicles.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">相关车型</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relatedVehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/cars/${vehicle.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-medium">
                  {vehicle.brand} {vehicle.series}
                </p>
                <p className="mt-2 text-sm text-slate-600">{vehicle.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
