import "./globals.css";
import TopBar from "../components/layout/TopBar";
import { cookies } from "next/headers";
import { readSession } from "../lib/session";

export const metadata = { title: "FMS Incident Manager" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();                        // 👈 await it in Next 15
  const token = cookieStore.get("im_session")?.value;         // now .get(...) exists
  const user = await readSession(token);

  return (
    <html lang="en">
      <body>
        <TopBar user={user || undefined} />
        <main id="main" className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
