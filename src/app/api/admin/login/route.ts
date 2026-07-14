import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success || !verifyAdminPassword(parsed.data.password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
