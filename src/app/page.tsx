"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SymbolIcon } from "@/components/SymbolIcon";
import { GamesOverTimeChart } from "@/components/GamesOverTimeChart";

type PlayerRow = {
  id: string;
  displayName: string;
  city: string;
  symbol: string;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
};

type LeaderboardData = {
  players: PlayerRow[];
  totalGames: number;
  currentLeader: { displayName: string; wins: number } | null;
};

export default function Home() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ players: [], totalGames: 0, currentLeader: null }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Topline stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Total Games</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[#111315]">
            {loading ? "—" : data?.totalGames ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Current Leader</p>
          <p className="mt-1 text-2xl font-bold text-[#111315]">
            {loading ? "—" : data?.currentLeader?.displayName ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Season</p>
          <p className="mt-1 text-2xl font-bold text-[#111315]">All Time</p>
        </div>
      </section>

      {/* Games over time chart */}
      <section className="mb-8">
        <GamesOverTimeChart />
      </section>

      {/* Year filter + sort (placeholder) */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#6B7280]">
          Year: All Time
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#6B7280]">
          Sort: Rating
        </div>
      </div>

      {/* CTAs */}
      <div className="mb-8 space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          {/* Gold Log in button */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-[#C8A24D] px-5 py-2.5 text-sm font-medium text-[#111315] transition-colors hover:bg-[#b8923e]"
          >
            Log in
          </Link>

          {/* Log Game stays neutral */}
          <Link
            href="/log-game"
            className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#111315] transition-colors hover:bg-[#F8F9FA]"
          >
            Log Game
          </Link>

          {/* New? → Join the Board */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#6B7280]">New?</span>
            <span className="text-lg leading-none text-[#C8A24D]">→</span>
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-[#C8A24D] px-4 py-2 text-sm font-medium text-[#111315] transition-colors hover:bg-[#b8923e]"
            >
              Join the Board
            </Link>
          </div>
        </div>

        {/* Helper copy under the buttons */}
        <p className="text-sm text-[#6B7280]">
          New? Add yourself to{" "}
          <Link href="/join" className="font-medium text-[#C8A24D] hover:underline">
            join the board
          </Link>
          , then log in to track your games.
        </p>
      </div>

      {/* Leaderboard table */}
      <section className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="border-b border-[#E5E7EB] px-4 py-3">
          <h2 className="text-lg font-semibold text-[#111315]">Leaderboard</h2>
        </div>
        {loading ? (
          <div className="flex justify-center px-4 py-12 text-[#6B7280]">Loading…</div>
        ) : !data?.players?.length ? (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-[#6B7280]">
            <p className="text-sm">No players yet.</p>
            <p className="text-sm">Join the board to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                  <th className="px-4 py-3 font-medium text-[#6B7280]">Name</th>
                  <th className="px-4 py-3 font-medium text-[#6B7280]">City</th>
                  <th className="px-4 py-3 font-medium text-[#6B7280]">Games</th>
                  <th className="px-4 py-3 font-medium text-[#6B7280]">Wins</th>
                  <th className="px-4 py-3 font-medium text-[#6B7280]">Losses</th>
                  <th className="px-4 py-3 font-medium text-[#6B7280]">Win %</th>
                </tr>
              </thead>
              <tbody>
                {data.players
                  .sort((a, b) => b.wins - a.wins)
                  .map((p) => (
                    <tr key={p.id} className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA]">
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2 font-medium text-[#111315]">
                          <SymbolIcon symbol={p.symbol} gold={p.symbol === "AXE"} />
                          {p.displayName.split(" ")[0]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#6B7280]">{p.city || "—"}</td>
                      <td className="px-4 py-3 tabular-nums text-[#111315]">{p.games}</td>
                      <td className="px-4 py-3 tabular-nums text-[#111315]">{p.wins}</td>
                      <td className="px-4 py-3 tabular-nums text-[#111315]">{p.losses}</td>
                      <td className="px-4 py-3 tabular-nums text-[#111315]">{p.winRate}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
