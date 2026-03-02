import Image from "next/image";
import type { Symbol } from "@/lib/symbols";

const ICON_SRC: Record<Symbol, string> = {
  AXE: "/icons/axe_founder.png",
  STAFF: "/icons/staff.png",
  HAMMER: "/icons/hammer.png",
  SHIP_WHEEL: "/icons/ship_wheel.png",
  SCYTHE: "/icons/scythe.png",
  TROWEL: "/icons/trowel.png",
};

/** Renders the provided PNG icons for each symbol, with a subtle badge behind. */
export function SymbolIcon({
  symbol,
  gold = false,
  className = "",
}: {
  symbol: Symbol | string;
  gold?: boolean;
  className?: string;
}) {
  const key = symbol as Symbol;
  const src = ICON_SRC[key];

  if (!src) {
    return null;
  }

  const goldStyle =
    gold && key === "AXE"
      ? {
          // Approximate gold tint for the dark axe PNG
          filter:
            "invert(70%) sepia(63%) saturate(400%) hue-rotate(5deg) brightness(0.95)",
        }
      : undefined;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white/70 p-1 shadow-sm ${className}`}
    >
      <Image
        src={src}
        alt={key.toLowerCase().replace("_", " ")}
        width={24}
        height={24}
        className={gold ? "brightness-110" : ""}
        style={goldStyle}
      />
    </span>
  );
}
