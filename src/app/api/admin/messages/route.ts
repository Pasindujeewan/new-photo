import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/services/admin-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ ok: true, messages });
}
