import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createAdminAlbum, getAdminAlbums } from "@/lib/services/admin-store";
import { adminAlbumSchema } from "@/lib/validations/admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const albums = await getAdminAlbums();
  return NextResponse.json({ ok: true, albums });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = adminAlbumSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Invalid album details.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const album = await createAdminAlbum(parsed.data);
  return NextResponse.json({ ok: true, album });
}
