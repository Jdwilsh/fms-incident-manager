import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">FMS Incident Manager</h1>
      <p>This site is for reporting and managing incidents related to Festival Medical Services.</p>
      <Link href="/report" className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium
           bg-brand-600 text-white hover:bg-brand-700
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2
           shadow">Report an incident</Link>
    </div>
  );
}
