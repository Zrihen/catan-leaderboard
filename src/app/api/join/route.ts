import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createPlayer, getPlayerByDisplayName, PLAYER_SYMBOLS, type Symbol } from "@/lib/store";
import { setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      city,
      password,
      symbol,
    } = body as { firstName?: string; lastName?: string; city?: string; password?: string; symbol?: string };

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 }
      );
    }
    if (!password || String(password).length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }
    if (!symbol || !PLAYER_SYMBOLS.includes(symbol as Symbol)) {
      return NextResponse.json(
        { error: "Please select a symbol from the list." },
        { status: 400 }
      );
    }

    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (getPlayerByDisplayName(displayName)) {
      return NextResponse.json(
        { error: "A player with this name already exists." },
        { status: 400 }
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const player = createPlayer({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      city: city?.trim(),
      symbol: symbol as Symbol,
      passwordHash,
      role: "PLAYER",
    });

    const res = NextResponse.json({ ok: true, displayName: player.displayName });
    res.headers.set("Set-Cookie", setSessionCookie(player.id));
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
