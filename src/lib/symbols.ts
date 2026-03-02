/** Shared types and constants for player symbols (PRD §6.1). */

export type Symbol = "AXE" | "STAFF" | "HAMMER" | "SHIP_WHEEL" | "SCYTHE" | "TROWEL";

/** Symbols players can choose; AXE is founder-only. */
export const PLAYER_SYMBOLS: Symbol[] = ["STAFF", "HAMMER", "SHIP_WHEEL", "SCYTHE", "TROWEL"];
