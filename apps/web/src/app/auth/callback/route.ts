/* eslint-disable no-console */
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('🔍 AUTH CALLBACK - Full URL:', request.url);
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/app/dashboard';

  console.log('📋 Params:', { token_hash, type, code, next });

  const supabase = await createClient();

  // Handle PKCE flow with token_hash (email confirmation)
  if (token_hash && type) {
    console.log('✉️ Email verification flow detected with token_hash');
    
    try {
      console.log('🔐 Calling verifyOtp with:', { token_hash: token_hash.substring(0, 20) + '...', type });
      
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'signup' | 'email' | 'recovery' | 'magiclink',
      });

      console.log('📊 VerifyOtp result - error:', error);
      console.log('📊 VerifyOtp result - data:', data ? 'Session created' : 'No session');

      if (error) {
        console.error('❌ VerifyOtp error:', error.message, error.status);
        return NextResponse.redirect(`${origin}/sign-in?error=verification_failed&msg=${encodeURIComponent(error.message)}`);
      }

      if (data?.session) {
        console.log('✅ Email verified successfully, session created');
        if (type === 'signup') {
          console.log('🎉 Redirecting to /auth/confirmed');
          return NextResponse.redirect(`${origin}/auth/confirmed`);
        }
        console.log('🏠 Redirecting to dashboard');
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (err) {
      console.error('💥 Exception in verifyOtp:', err);
      return NextResponse.redirect(`${origin}/sign-in?error=exception&msg=${encodeURIComponent(String(err))}`);
    }
  }

  // Handle OAuth callback with code
  if (code) {
    console.log('🔑 OAuth/PKCE flow detected with code');
    
    try {
      console.log('🔄 Exchanging code for session');
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      console.log('📊 ExchangeCode result - error:', error);
      console.log('📊 ExchangeCode result - data:', data ? 'Session created' : 'No session');

      if (error) {
        console.error('❌ ExchangeCode error:', error.message);
        return NextResponse.redirect(`${origin}/sign-in?error=code_exchange_failed&msg=${encodeURIComponent(error.message)}`);
      }

      if (data?.session) {
        console.log('✅ Code exchange successful, redirecting to:', next);
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (err) {
      console.error('💥 Exception in exchangeCode:', err);
      return NextResponse.redirect(`${origin}/sign-in?error=exception&msg=${encodeURIComponent(String(err))}`);
    }
  }

  // No valid params found
  console.error('⚠️ No valid token_hash or code found');
  console.error('⚠️ Available params:', Object.fromEntries(searchParams.entries()));
  return NextResponse.redirect(`${origin}/sign-in?error=no_params`);
}
