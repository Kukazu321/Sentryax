'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function EmailConfirmedPage() {
  return (
    <div className="min-h-screen hero-noise flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 pt-10 text-center">
          {/* Success icon */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #fef3e7 0%, #fde8d7 100%)' }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: '#b8860b' }} />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Email confirmed!
          </h1>
          
          {/* Message */}
          <p className="text-gray-500 text-sm mb-8">
            Your email has been successfully verified.<br />
            You can now sign in to your account.
          </p>
          
          {/* CTA Button */}
          <Link
            href="/sign-in"
            className="inline-block w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all text-center"
          >
            Sign In
          </Link>
          
          {/* Footer */}
          <p className="text-gray-400 text-xs mt-6">
            Welcome to Sentryax 👋
          </p>
        </div>
      </div>
    </div>
  );
}
