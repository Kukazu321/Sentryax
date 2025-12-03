import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/app/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // If this is email confirmation (signup), redirect to confirmed page
      if (type === 'signup' || type === 'email') {
        return NextResponse.redirect(`${origin}/auth/confirmed`);
      }
      // Otherwise (OAuth, magic link login), redirect to dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
