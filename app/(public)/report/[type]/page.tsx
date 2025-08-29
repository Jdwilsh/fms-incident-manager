import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ReportTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  const incidentType = await prisma.incidentType.findUnique({ where: { slug: type } });
  if (!incidentType) {
    return (
      <div>
        <p className="mb-3">Unknown incident type.</p>
        <Link href="/report" className="underline">Back to types</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Report: {incidentType.name}</h1>
      <form action="/api/incidents" method="post" className="space-y-3">
        <input type="hidden" name="type" value={type} />
        <div>
          <label htmlFor="title" className="block text-sm mb-1">Title</label>
          <input id="title" name="title" required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm mb-1">Description</label>
          <textarea id="description" name="description" required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" rows={6} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="reporterName" className="block text-sm mb-1">Your name (optional)</label>
            <input id="reporterName" name="reporterName" className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
          </div>
          <div>
            <label htmlFor="reporterEmail" className="block text-sm mb-1">Your email (optional, for updates)</label>
            <input id="reporterEmail" name="reporterEmail" type="email" className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
          </div>
        </div>
        <button className="rounded-md px-4 py-2 bg-black/20">Submit</button>
      </form>

      <Link href="/report" className="text-sm underline">Back to types</Link>
    </div>
  );
}
