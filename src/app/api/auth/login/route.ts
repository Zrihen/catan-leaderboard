import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPlayerByDisplayName } from "@/lib/store";
import { setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { displayName, password } = body as { displayName?: string; password?: string };
    if (!displayName?.trim() || !password) {
      return NextResponse.json(
        { error: "Display name and password are required." },
        { status: 400 }
      );
    }
    const player = getPlayerByDisplayName(displayName.trim());
    if (!player) {
      return NextResponse.json(
        { error: "No player found with that name." },
        { status: 401 }
      );
    }
    const ok = await bcrypt.compare(password, player.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }
    const res = NextResponse.json({ ok: true, displayName: player.displayName });
    res.headers.set("Set-Cookie", setSessionCookie(player.id));
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
