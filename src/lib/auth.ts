import { cookies } from "next/headers";
import { getPlayerById } from "./store";

const SESSION_COOKIE = "catan_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getSession(): Promise<{ playerId: string; displayName: string } | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const { playerId } = JSON.parse(value) as { playerId: string };
    const player = getPlayerById(playerId);
    if (!player) return null;
    return { playerId: player.id, displayName: player.displayName };
  } catch {
    return null;
  }
}

export function setSessionCookie(playerId: string) {
  return `${SESSION_COOKIE}=${encodeURIComponent(JSON.stringify({ playerId }))}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
