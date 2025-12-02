'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/branding/logosentryaxx.png" 
            alt="Sentryax" 
            width={200} 
            height={52}
            className="h-14 w-auto"
          />
        </Link>

        {/* Auth button */}
        <Link
          href="/waitlist"
          className="inline-flex items-center gap-2 text-sm font-medium text-white btn-gradient px-4 py-2 rounded-lg transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          Join the Beta Waitlist
        </Link>
      </div>
    </header>
  );
}
