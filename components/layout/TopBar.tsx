// components/layout/TopBar.tsx
import Link from "next/link";

export default function TopBar({ user }: { user?: { name: string; email: string } }) {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold">FMS Incident Manager</Link>
        <nav className="text-sm flex items-center gap-3">
          <Link href="/report" className="hover:underline">Report</Link>
          {user ? (
            <form action="/api/logout" method="post">
              <span className="hidden sm:inline text-slate-300 mr-2">👤 {user.name}</span>
              <button className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium
           bg-white text-text border border-border
           hover:bg-gray-50
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">Logout</button>
            </form>
          ) : (
            <Link href="/login" className="px-3 py-1.5 rounded-md bg-black/20">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
