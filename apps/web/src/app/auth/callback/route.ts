import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/app/dashboard';

  if (token_hash && type) {
    const supabase = await createClient();
    
    // Verify the token hash for email confirmation
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    if (!error) {
      // If this is email confirmation (signup), redirect to confirmed page
      if (type === 'signup' || type === 'email') {
        return NextResponse.redirect(`${origin}/auth/confirmed`);
      }
      // Otherwise, redirect to dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Also handle OAuth callback with code
  const code = searchParams.get('code');
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
