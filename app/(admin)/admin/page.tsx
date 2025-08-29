import { prisma } from "@/lib/db";

export default async function AdminHome() {
  const [users, types] = await Promise.all([
    prisma.user.count(),
    prisma.incidentType.count(),
  ]);
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Admin — Overview</h1>
      <p className="text-sm text-slate-400">Users: {users} · Incident types: {types}</p>
    </div>
  );
}
