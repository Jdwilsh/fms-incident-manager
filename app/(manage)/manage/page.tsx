import { prisma } from "@/lib/db";

export default async function ManageHome() {
  const [open, inprog, closed30, unassigned] = await Promise.all([
    prisma.incident.count({ where: { status: "OPEN" } }),
    prisma.incident.count({ where: { status: "IN_PROGRESS" } }),
    prisma.incident.count({ where: { status: "CLOSED", closedAt: { gte: new Date(Date.now() - 1000*60*60*24*30) } } }),
    prisma.incident.count({ where: { assignedToId: null, status: { in: ["OPEN","IN_PROGRESS"] } } }),
  ]);

  const latest = await prisma.incident.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id:true, title:true, status:true, createdAt:true, type:{select:{name:true}}, assignedTo:{select:{name:true}} },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {label: "Open", value: open},
          {label: "In progress", value: inprog},
          {label: "Closed (30d)", value: closed30},
          {label: "Unassigned", value: unassigned},
        ].map(s => (
          <div key={s.label} className="rounded-md border border-white/10 p-4">
            <div className="text-sm text-slate-400">{s.label}</div>
            <div className="text-2xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-white/10">
        <div className="px-4 py-2 border-b border-white/10 font-semibold text-sm">Recent investigations</div>
        <div className="divide-y divide-white/10">
          {latest.length === 0 && <div className="px-4 py-3 text-sm text-slate-400">No incidents yet.</div>}
          {latest.map(i => (
            <a key={i.id} href={`/manage/incidents/${i.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-white/5">
              <div className="text-sm">
                <div className="font-medium">{i.title}</div>
                <div className="text-slate-400">{i.type.name} · {new Date(i.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-xs text-slate-300">{i.status}{i.assignedTo ? ` · ${i.assignedTo.name}` : ""}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
