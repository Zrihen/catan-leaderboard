/** Home / Leaderboard — PRD §4.1: topline stats, CTAs, placeholder for table */

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Topline stats (placeholder) */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Total Games</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[#111315]">—</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Current Leader</p>
          <p className="mt-1 text-2xl font-bold text-[#111315]">—</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">Season</p>
          <p className="mt-1 text-2xl font-bold text-[#111315]">All Time</p>
        </div>
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

      {/* CTAs — PRD: Join the Board prominent when not logged in */}
      <div className="mb-8 flex flex-wrap gap-3">
        <a
          href="/join"
          className="inline-flex items-center justify-center rounded-lg bg-[#C8A24D] px-5 py-2.5 text-sm font-medium text-[#111315] transition-colors hover:bg-[#b8923e]"
        >
          Join the Board
        </a>
        <a
          href="/log-game"
          className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#111315] transition-colors hover:bg-[#F8F9FA]"
        >
          Log Game
        </a>
      </div>

      {/* Leaderboard table placeholder */}
      <section className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="border-b border-[#E5E7EB] px-4 py-3">
          <h2 className="text-lg font-semibold text-[#111315]">Leaderboard</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-[#6B7280]">
          <p className="text-sm">No players yet.</p>
          <p className="text-sm">Join the board to get started.</p>
        </div>
      </section>
    </main>
  );
}
