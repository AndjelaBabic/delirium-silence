import { validateSession } from "@/lib/auth";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function checkAuth() {
  const cookieStore = await cookies();
  return validateSession(cookieStore.get("admin_session")?.value);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { section } = await params;
  try {
    const res = await fetch(backendUrl(`/api/admin/content/${section}`), {
      headers: adminHeaders(),
      cache: "no-store",
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { section } = await params;
  try {
    const res = await fetch(backendUrl(`/api/admin/content/${section}`), {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify(await req.json()),
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
