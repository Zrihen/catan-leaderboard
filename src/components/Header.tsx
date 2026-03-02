/** Header — deep charcoal bg, simple text logo + glyph */

type Session = { playerId: string; displayName: string } | null;

export function Header({ session }: { session: Session }) {
  return (
    <header className="bg-[#0F1115] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            <span className="text-[#C8A24D]">✡</span>
          </span>
          <h1
            className="text-sm font-medium tracking-tight text-white sm:text-base"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Mosh&apos;s Catan Leaderboard
          </h1>
        </div>
        <nav className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-[#9CA3AF]">{session.displayName}</span>
              <a
                href="/api/auth/logout"
                className="text-sm font-medium text-[#C8A24D] hover:text-[#d4b05a] transition-colors"
              >
                Log out
              </a>
            </>
          ) : (
            <a
              href="/login"
              className="text-sm font-medium text-[#C8A24D] hover:text-[#d4b05a] transition-colors"
            >
              Log in
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
