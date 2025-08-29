import { prisma } from "@/lib/db";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" }, select: { id:true, name:true, email:true, role:true } });
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">User management</h1>
      <div className="rounded-md border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/10">
            <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Role</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
