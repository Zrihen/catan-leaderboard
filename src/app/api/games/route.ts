import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createGame, getPlayerById } from "@/lib/store";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to log a game." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { date, playerIds, winnerId, notes } = body as {
      date?: string;
      playerIds?: string[];
      winnerId?: string;
      notes?: string;
    };
    if (!date || !Array.isArray(playerIds) || playerIds.length < 2 || !winnerId) {
      return NextResponse.json(
        { error: "Date, at least two players, and a winner are required." },
        { status: 400 }
      );
    }
    if (!playerIds.includes(session.playerId)) {
      return NextResponse.json(
        { error: "You must include yourself in the players list." },
        { status: 400 }
      );
    }
    if (!playerIds.includes(winnerId)) {
      return NextResponse.json(
        { error: "Winner must be one of the selected players." },
        { status: 400 }
      );
    }
    const game = createGame({
      date,
      playerIds,
      winnerId,
      submittedByPlayerId: session.playerId,
      notes: notes?.trim() || undefined,
    });
    const winner = getPlayerById(winnerId);
    return NextResponse.json({
      ok: true,
      game: {
        id: game.id,
        date: game.date,
        winner: winner?.displayName,
      },
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
