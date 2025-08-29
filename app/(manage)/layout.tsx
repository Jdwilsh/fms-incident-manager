// app/(manage)/layout.tsx
import SubNav from "../../components/layout/SubNav";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={[{ href: "/manage", label: "Dashboard" }]} />
      <section className="mx-auto max-w-6xl p-4">{children}</section>
    </>
  );
}
