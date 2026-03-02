"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SymbolIcon } from "@/components/SymbolIcon";

type PlayerOption = { id: string; displayName: string; symbol: string };

export default function LogGamePage() {
  const router = useRouter();
  const [players, setPlayers] = useState<PlayerOption[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [playerIds, setPlayerIds] = useState<string[]>([]);
  const [winnerId, setWinnerId] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => {
        if (res.status === 401) {
          router.replace("/login?next=/log-game");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (data?.players) setPlayers(data.players);
      })
      .catch(() => setError("Could not load players."))
      .finally(() => setLoadingPlayers(false));
  }, [router]);

  function togglePlayer(id: string) {
    setPlayerIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    if (winnerId === id && playerIds.includes(id)) setWinnerId("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (playerIds.length < 2) {
      setError("Select at least two players.");
      return;
    }
    if (!winnerId) {
      setError("Select the winner.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          playerIds,
          winnerId,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Failed to log game.");
        return;
      }
      router.push("/?logged=1");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingPlayers) {
    return (
      <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <p className="text-[#6B7280]">Loading…</p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-[#C8A24D] hover:underline">
          ← Back to leaderboard
        </Link>
      </main>
    );
  }

  if (players.length === 0) {
    return (
      <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <h2 className="text-xl font-semibold text-[#111315]">Log Game</h2>
        <p className="mt-2 text-[#6B7280]">No players on the board yet. Join the board first.</p>
        <Link href="/join" className="mt-4 inline-block text-sm font-medium text-[#C8A24D] hover:underline">
          Join the Board
        </Link>
        <Link href="/" className="ml-4 inline-block text-sm font-medium text-[#C8A24D] hover:underline">
          ← Back to leaderboard
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
      <h2 className="text-xl font-semibold text-[#111315]">Log Game</h2>
      <p className="mt-1 text-sm text-[#6B7280]">You must be one of the players. Pick the winner.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[#111315]">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#111315]">
            Players (select all who played) *
          </label>
          <div className="mt-2 space-y-2">
            {players.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  playerIds.includes(p.id)
                    ? "border-[#C8A24D] bg-[#C8A24D]/10"
                    : "border-[#E5E7EB] bg-white hover:border-[#C8A24D]/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={playerIds.includes(p.id)}
                  onChange={() => togglePlayer(p.id)}
                  className="h-4 w-4 rounded border-[#E5E7EB] text-[#C8A24D] focus:ring-[#C8A24D]"
                />
                <SymbolIcon symbol={p.symbol} size="sm" gold={p.symbol === "AXE"} />
                <span className="font-medium text-[#111315]">{p.displayName}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#111315]">
            Winner *
          </label>
          <select
            value={winnerId}
            onChange={(e) => setWinnerId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
            required
          >
            <option value="">Select winner</option>
            {players.filter((p) => playerIds.includes(p.id)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.displayName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-[#111315]">
            Notes (optional)
          </label>
          <input
            id="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Seafarers"
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#C8A24D] px-4 py-2 text-sm font-medium text-[#111315] hover:bg-[#b8923e] disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Log Game"}
          </button>
          <Link
            href="/"
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111315] hover:bg-[#F8F9FA]"
          >
            Cancel
          </Link>
        </div>
      </form>
      <Link href="/" className="mt-4 inline-block text-sm font-medium text-[#C8A24D] hover:underline">
        ← Back to leaderboard
      </Link>
    </main>
  );
}
