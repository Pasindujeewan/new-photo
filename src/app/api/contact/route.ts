import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/services/email";
import { saveContactMessage } from "@/lib/services/admin-store";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await saveContactMessage(parsed.data);
  await sendContactEmail(parsed.data);
  return NextResponse.json({ ok: true });
}
