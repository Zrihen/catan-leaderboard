import { NextResponse } from "next/server";
import { getGames } from "@/lib/store";

/** Returns daily game counts for the chart. */
export async function GET() {
  const games = getGames();
  const byDate = new Map<string, number>();
  for (const g of games) {
    const d = g.date;
    byDate.set(d, (byDate.get(d) ?? 0) + 1);
  }
  const sorted = [...byDate.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let cumulative = 0;
  const points = sorted.map(([date, count]) => {
    cumulative += count;
    return { date, games: count, total: cumulative };
  });
  return NextResponse.json({ points });
}
