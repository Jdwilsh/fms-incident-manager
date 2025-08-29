// app/api/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const nextUrl = String(form.get("next") || "/");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.redirect(new URL(`/login?error=1`, req.url));

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return NextResponse.redirect(new URL(`/login?error=1`, req.url));

  const token = await createSession({
    uid: user.id,
    role: user.role,           // <— no any
    name: user.name,
    email: user.email,
  });

  const res = NextResponse.redirect(new URL(nextUrl || "/", req.url));
  res.cookies.set("im_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
