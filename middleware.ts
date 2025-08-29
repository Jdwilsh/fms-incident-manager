import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { readSession } from "./lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protect = pathname.startsWith("/manage") || pathname.startsWith("/admin");
  if (!protect) return NextResponse.next();

  const token = req.cookies.get("im_session")?.value;
  const session = await readSession(token);

  if (!session) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/manage", req.url));
  }

  return NextResponse.next();
}
