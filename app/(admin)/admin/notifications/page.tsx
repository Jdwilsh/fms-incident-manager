import { prisma } from "@/lib/db";

export default async function AdminNotifications() {
  const rows = await prisma.notificationRule.findMany({
    include: { incidentType: { select: { name: true, slug: true } } },
    orderBy: { incidentType: { name: "asc" } },
  });
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Notification rules</h1>
      <div className="rounded-md border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/10">
            <tr><th className="text-left p-2">Incident type</th><th className="text-left p-2">Recipients</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2">{r.incidentType?.name}</td>
                <td className="p-2">{r.recipients || <span className="text-slate-400">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">Editing will come next.</p>
    </div>
  );
}
