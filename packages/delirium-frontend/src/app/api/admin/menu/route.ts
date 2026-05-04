import { validateSession } from "@/lib/auth";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function checkAuth() {
  const cookieStore = await cookies();
  return validateSession(cookieStore.get("admin_session")?.value);
}

export async function GET() {
  if (!(await checkAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const res = await fetch(backendUrl("/api/admin/menu"), {
      headers: adminHeaders(),
      cache: "no-store",
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const res = await fetch(backendUrl("/api/admin/menu"), {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify(await req.json()),
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
