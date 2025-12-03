'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Hero } from '@/components/marketing/hero';
import { TryItOut } from '@/components/marketing/try-it-out';

function AuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Detect auth callback parameters and redirect to /auth/callback
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');

    if (code || token_hash) {
      // eslint-disable-next-line no-console
      console.log('🔄 Auth params detected on home page, redirecting to /auth/callback');
      const params = new URLSearchParams(searchParams.toString());
      router.replace(`/auth/callback?${params.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={null}>
        <AuthRedirect />
      </Suspense>
      <Hero />
      <TryItOut />
    </main>
  );
}
