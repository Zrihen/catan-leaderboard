import { NextResponse } from "next/server";
import { getAllPlayers, getGames } from "@/lib/store";

export async function GET() {
  const players = getAllPlayers();
  const games = getGames();
  const playerStats = new Map<
    string,
    { games: number; wins: number; losses: number; winRate: number }
  >();
  for (const p of players) {
    playerStats.set(p.id, { games: 0, wins: 0, losses: 0, winRate: 0 });
  }
  for (const g of games) {
    for (const pid of g.playerIds) {
      const s = playerStats.get(pid);
      if (s) {
        s.games += 1;
        if (g.winnerId === pid) s.wins += 1;
        else s.losses += 1;
      }
    }
  }
  for (const s of playerStats.values()) {
    s.winRate = s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0;
  }
  const totalGames = games.length;
  const leader = [...playerStats.entries()]
    .filter(([, s]) => s.games > 0)
    .sort((a, b) => b[1].wins - a[1].wins)[0];
  const leaderPlayer = leader ? players.find((p) => p.id === leader[0]) : null;

  return NextResponse.json({
    players: players.map((p) => {
      const s = playerStats.get(p.id)!;
      return {
        id: p.id,
        displayName: p.displayName,
        city: p.city,
        symbol: p.symbol,
        ...s,
      };
    }),
    totalGames,
    currentLeader: leaderPlayer
      ? { displayName: leaderPlayer.displayName, wins: leader[1].wins }
      : null,
  });
}
