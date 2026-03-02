import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAllPlayers } from "@/lib/store";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const players = getAllPlayers();
  return NextResponse.json({
    players: players.map((p) => ({
      id: p.id,
      displayName: p.displayName,
      symbol: p.symbol,
    })),
  });
}
