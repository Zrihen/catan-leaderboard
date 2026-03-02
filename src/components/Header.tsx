/** PRD: Header — deep charcoal bg, gold monoline coffee icon, title left-aligned */

export function Header() {
  return (
    <header className="bg-[#0F1115] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        {/* Monoline coffee cup — stroke only, gold #C8A24D */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C8A24D"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 8h10v8H6zM6 6v2M16 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M4 10h1" />
        </svg>
        <h1 className="font-medium tracking-tight text-white" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
          Mosh&apos;s Catan Leaderboard
        </h1>
      </div>
    </header>
  );
}
