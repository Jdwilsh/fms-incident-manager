"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-10 flex items-center gap-3 text-sm">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`px-2 py-1 rounded ${pathname === it.href ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
