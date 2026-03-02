import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin || "http://localhost:3000";
  const res = NextResponse.redirect(origin + "/");
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}
