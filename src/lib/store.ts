/**
 * In-memory store for MVP. Replace with D1 when ready.
 * PRD: Player (id, firstName, lastName, city, symbol, passwordHash, role), Game (date, playerIds, winnerId, submittedByPlayerId).
 */

import type { Symbol } from "./symbols";
import { PLAYER_SYMBOLS } from "./symbols";

export type { Symbol };
export { PLAYER_SYMBOLS };

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  city: string;
  symbol: Symbol;
  role: "FOUNDER" | "PLAYER";
  passwordHash: string;
  createdAt: Date;
}

export interface Game {
  id: string;
  date: string; // YYYY-MM-DD
  year: number;
  playerIds: string[];
  winnerId: string;
  submittedByPlayerId: string;
  notes?: string;
  createdAt: Date;
}

const players = new Map<string, Player>();
const playersByDisplayName = new Map<string, Player>();
const games: Game[] = [];

function uuid(): string {
  return crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getPlayerById(id: string): Player | undefined {
  return players.get(id);
}

export function getPlayerByDisplayName(displayName: string): Player | undefined {
  return playersByDisplayName.get(displayName.trim());
}

export function getAllPlayers(): Player[] {
  return Array.from(players.values()).sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function createPlayer(data: {
  firstName: string;
  lastName: string;
  city?: string;
  symbol: Symbol;
  passwordHash: string;
  role?: "FOUNDER" | "PLAYER";
}): Player {
  const id = uuid();
  const displayName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  if (playersByDisplayName.has(displayName)) {
    throw new Error("A player with this name already exists.");
  }
  const player: Player = {
    id,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    displayName,
    city: (data.city ?? "").trim(),
    symbol: data.symbol,
    role: data.role ?? "PLAYER",
    passwordHash: data.passwordHash,
    createdAt: new Date(),
  };
  players.set(id, player);
  playersByDisplayName.set(displayName, player);
  return player;
}

export function getGames(): Game[] {
  return [...games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function createGame(data: {
  date: string;
  playerIds: string[];
  winnerId: string;
  submittedByPlayerId: string;
  notes?: string;
}): Game {
  const id = uuid();
  const year = new Date(data.date).getFullYear();
  const game: Game = {
    id,
    date: data.date,
    year,
    playerIds: data.playerIds,
    winnerId: data.winnerId,
    submittedByPlayerId: data.submittedByPlayerId,
    notes: data.notes,
    createdAt: new Date(),
  };
  games.push(game);
  return game;
}

// Seed founder so you can log in immediately (password: founder)
import bcrypt from "bcryptjs";
if (players.size === 0) {
  const hash = bcrypt.hashSync("founder", 10);
  createPlayer({
    firstName: "Mosh",
    lastName: "Zrihen",
    city: "San Francisco",
    symbol: "AXE",
    passwordHash: hash,
    role: "FOUNDER",
  });
}
