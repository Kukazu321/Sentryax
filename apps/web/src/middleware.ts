import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/manifesto',
  '/privacy',
  '/api/waitlist',
  '/auth/callback',
];

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
