import { backendUrl } from "@/lib/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(backendUrl("/api/menu"), { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
