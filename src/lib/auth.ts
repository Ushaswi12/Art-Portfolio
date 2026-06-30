import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { SessionData } from '@/types';

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long_1234567890',
  cookieName: 'admin-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
};

export async function getSession(): Promise<SessionData | null> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) return null;
  return session;
}

export async function createSession(userId: string, role: string): Promise<void> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.userId = userId;
  session.role = role;
  session.expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  await session.save();
}

export async function destroySession(): Promise<void> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
}

export async function validateAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

export const ADMIN_ROUTES = [
  '/admin',
  '/admin/dashboard',
  '/admin/artworks',
  '/admin/collections',
  '/admin/content',
] as const;

export function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}