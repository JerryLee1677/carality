import { notFound } from "next/navigation";
import { vehicleRepository } from "@/modules/catalog/repository/vehicle-repository";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicleRepository.getBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        {vehicle.brand} {vehicle.series}
      </h1>
      <p className="mt-4 text-slate-600">{vehicle.summary}</p>
      <div className="mt-8 grid gap-4 rounded-3xl bg-white p-8 shadow-sm">
        <p>指导价区间：¥{vehicle.priceMin.toLocaleString()} - ¥{vehicle.priceMax.toLocaleString()}</p>
        <p>能源类型：{vehicle.energyType}</p>
        <p>车身类型：{vehicle.bodyType}</p>
        <p>{vehicle.recommendation}</p>
      </div>
    </main>
  );
}
