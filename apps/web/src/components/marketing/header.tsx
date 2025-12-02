'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-2 sm:py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/branding/logosentryaxx.png" 
            alt="Sentryax" 
            width={200} 
            height={52}
            priority
            className="h-10 sm:h-14 w-auto object-contain"
            style={{ width: 'auto', height: 'auto', maxHeight: '56px' }}
          />
        </Link>

        {/* Auth button */}
        <Link
          href="/waitlist"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white btn-gradient px-3 sm:px-4 py-2 rounded-lg transition-colors"
        >
          <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Join the Beta Waitlist</span>
          <span className="sm:hidden">Join Beta</span>
        </Link>
      </div>
    </header>
  );
}
