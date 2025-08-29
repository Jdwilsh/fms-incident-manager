// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect("/");
  res.cookies.set("im_session", "", { httpOnly: true, sameSite: "lax", path: "/", secure: true, maxAge: 0 });
  return res;
}
