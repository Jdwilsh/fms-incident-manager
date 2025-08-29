// app/(admin)/layout.tsx
import SubNav from "../../components/layout/SubNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={[
        { href: "/admin", label: "Overview" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/notifications", label: "Notifications" },
      ]} />
      <section className="mx-auto max-w-6xl p-4">{children}</section>
    </>
  );
}
