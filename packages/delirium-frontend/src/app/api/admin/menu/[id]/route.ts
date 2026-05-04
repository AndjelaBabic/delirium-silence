import { NextRequest, NextResponse } from "next/server";
import { backendUrl, adminHeaders } from "@/lib/backend";
import { validateSession } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  return validateSession(cookieStore.get("admin_session")?.value);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const res = await fetch(backendUrl(`/api/admin/menu/${id}`), { method: "PUT", headers: adminHeaders(), body: JSON.stringify(await req.json()) });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const res = await fetch(backendUrl(`/api/admin/menu/${id}`), { method: "DELETE", headers: adminHeaders() });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
