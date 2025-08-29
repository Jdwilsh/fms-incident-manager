import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ReportIndex() {
  const types = await prisma.incidentType.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Choose incident type</h1>
      <div className="grid sm:grid-cols-2 gap-3">
        {types.map(t => (
          <Link key={t.id} href={`/report/${t.slug}`} className="rounded-md border border-white/10 p-4 hover:bg-white/5">
            {t.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
