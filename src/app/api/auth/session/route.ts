import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPlayerById } from "@/lib/store";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const player = getPlayerById(session.playerId);
  if (!player) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({
    user: {
      id: player.id,
      displayName: player.displayName,
    },
  });
}
