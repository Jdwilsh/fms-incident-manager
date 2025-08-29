import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const slug = String(form.get("type") || "");
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");
    const reporterName = form.get("reporterName") ? String(form.get("reporterName")) : null;
    const reporterEmail = form.get("reporterEmail") ? String(form.get("reporterEmail")) : null;

    if (!slug || !title || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const type = await prisma.incidentType.findUnique({ where: { slug } });
    if (!type) return NextResponse.json({ error: "Unknown incident type" }, { status: 400 });

    const incident = await prisma.incident.create({
      data: {
        typeId: type.id,
        title,
        description,
        reporterName,
        reporterEmail,
        status: "OPEN",
        audits: { create: { action: "CREATED", meta: { via: "web-form" } } }
      },
      select: { id: true },
    });

    return NextResponse.redirect(new URL(`/report/success?ref=${incident.id}`, req.url), 303);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
