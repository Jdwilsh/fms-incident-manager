// lib/session.ts
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@prisma/client";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-only-change-me");

export type Session = {
  uid: string;
  role: Role;               // <— use Prisma enum
  name: string;
  email: string;
};

export async function createSession(payload: Session) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(secret);
}

export async function readSession(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as Session;
  } catch {
    return null;
  }
}
