"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: displayName.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push(next.startsWith("/") ? next : "/");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <h2 className="text-xl font-semibold text-[#111315]">Log in</h2>
      <p className="mt-1 text-sm text-[#6B7280]">
        Use your first and last name exactly as you used when you joined the board.
      </p>
      <p className="mt-2 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-2 text-sm text-[#6B7280]">
        <strong>New here?</strong> Add yourself first: go to <Link href="/join" className="font-medium text-[#C8A24D] hover:underline">Join the Board</Link>, fill in your name, pick a symbol, set a password. Then come back here and log in with that name and password.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-[#111315]">
            Name (as on board)
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Mosh Zrihen"
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#111315]">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[#111315] focus:border-[#C8A24D] focus:outline-none focus:ring-1 focus:ring-[#C8A24D]"
            required
            autoComplete="current-password"
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
            {loading ? "Signing in…" : "Log in"}
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
