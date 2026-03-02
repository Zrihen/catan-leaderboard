"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PLAYER_SYMBOLS, type Symbol } from "@/lib/symbols";

const SYMBOL_LABELS: Record<Symbol, string> = {
  AXE: "Axe (Founder only)",
  STAFF: "Staff",
  HAMMER: "Hammer",
  SHIP_WHEEL: "Ship wheel",
  SCYTHE: "Scythe",
  TROWEL: "Trowel",
};

export default function JoinPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [symbol, setSymbol] = useState<Symbol | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!symbol) {
      setError("Please select a symbol.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          city: city.trim() || undefined,
          password,
          symbol,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Sign-up failed.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
      <h2 className="text-xl font-semibold text-[#111315]">Join the Board</h2>
      <p className="mt-1 text-sm text-[#6B7280]">Create your player. You can log in with your name and password after.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#111315]">
              First name *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#111315]">
              Last name *
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#111315]">
            City (optional)
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#111315]">
            Symbol * (permanent — pick one)
          </label>
          <p className="mt-1 text-xs text-[#6B7280]">Axe is reserved for the founder.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PLAYER_SYMBOLS.map((s) => (
              <label
                key={s}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  symbol === s
                    ? "border-[#C8A24D] bg-[#C8A24D]/10"
                    : "border-[#E5E7EB] bg-white hover:border-[#C8A24D]/50"
                }`}
              >
                <input
                  type="radio"
                  name="symbol"
                  value={s}
                  checked={symbol === s}
                  onChange={() => setSymbol(s)}
                  className="sr-only"
                />
                {SYMBOL_LABELS[s]}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#111315]">
            Password * (min 6 characters)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
            required
            autoComplete="new-password"
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
            disabled={loading}
            className="rounded-lg bg-[#C8A24D] px-4 py-2 text-sm font-medium text-[#111315] hover:bg-[#b8923e] disabled:opacity-50"
          >
            {loading ? "Creating…" : "Join the Board"}
          </button>
          <Link
            href="/"
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111315] hover:bg-[#F8F9FA]"
          >
            Cancel
          </Link>
        </div>
      </form>
      <p className="mt-4 text-sm text-[#6B7280]">
        Already on the board? <Link href="/login" className="font-medium text-[#C8A24D] hover:underline">Log in</Link>.
      </p>
      <Link href="/" className="mt-4 inline-block text-sm font-medium text-[#C8A24D] hover:underline">
        ← Back to leaderboard
      </Link>
    </main>
  );
}
