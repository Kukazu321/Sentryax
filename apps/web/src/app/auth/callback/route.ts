import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/app/dashboard';

  console.log('🔍 AUTH CALLBACK - Full URL:', request.url);
  console.log('📋 Params:', { token_hash, type, code, next });

  // Handle email confirmation with token_hash
  if (token_hash && type) {
    console.log('✉️ Email verification flow detected');
    const supabase = await createClient();
    
    console.log('🔐 Calling verifyOtp with:', { token_hash, type });
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    console.log('📊 VerifyOtp result:', { data, error });

    if (error) {
      console.error('❌ VerifyOtp error:', error);
      return NextResponse.redirect(`${origin}/sign-in?error=auth&details=${encodeURIComponent(error.message)}`);
    }

    if (!error) {
      console.log('✅ Email verified successfully');
      // If this is email confirmation (signup), redirect to confirmed page
      if (type === 'signup' || type === 'email') {
        console.log('🎉 Redirecting to /auth/confirmed');
        return NextResponse.redirect(`${origin}/auth/confirmed`);
      }
      // Otherwise, redirect to dashboard
      console.log('🏠 Redirecting to dashboard');
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Handle OAuth callback with code
  if (code) {
    console.log('🔑 OAuth flow detected with code');
    const supabase = await createClient();
    
    console.log('🔄 Exchanging code for session');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    console.log('📊 ExchangeCode result:', { data, error });

    if (error) {
      console.error('❌ ExchangeCode error:', error);
      return NextResponse.redirect(`${origin}/sign-in?error=auth&details=${encodeURIComponent(error.message)}`);
    }

    if (!error) {
      console.log('✅ OAuth successful, redirecting to:', next);
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No valid params found
  console.error('⚠️ No valid token_hash or code found, redirecting to error');
  return NextResponse.redirect(`${origin}/sign-in?error=auth&details=no_valid_params`);
}
