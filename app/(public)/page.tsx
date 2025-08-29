import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">FMS Incident Manager</h1>
      <p>This site is for reporting and managing incidents related to Festival Medical Services.</p>
      <Link href="/report" className="inline-block rounded-md px-4 py-2 bg-black/20">Report an incident</Link>
    </div>
  );
}
