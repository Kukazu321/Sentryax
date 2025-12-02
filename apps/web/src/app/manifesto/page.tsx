'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManifestoPage() {
  return (
    <div className="min-h-screen hero-noise">
      {/* Header */}
      <header className="w-full py-2 sm:py-4 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/branding/logosentryaxx.png" 
              alt="Sentryax" 
              width={200} 
              height={52}
              priority
              className="h-10 sm:h-14 w-auto"
            />
          </Link>
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-16 sm:py-24">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-16 leading-tight">
            Unfair advantages.
          </h1>

          {/* Poetry-style content */}
          <div className="space-y-12 text-gray-700 text-lg sm:text-xl leading-relaxed">
            
            <p>
              Every day, your competitors launch products, 
              cut prices, run campaigns, and make moves 
              you never see coming.
            </p>

            <p>
              By the time you notice, it&apos;s already too late. 
              Customers gone. Opportunities missed. 
              Always one step behind.
            </p>

            <p className="text-gray-900 font-medium">
              That&apos;s why we built Sentryax.
            </p>

            <p>
              A tool that watches everything for you. 
              Ads, pricing, SEO, launches — in real-time. 
              So you can act before they even finish moving.
            </p>

            <div className="py-8 space-y-4">
              <p className="text-gray-900 font-semibold text-2xl sm:text-3xl">
                See everything.
              </p>
              <p className="text-gray-900 font-semibold text-2xl sm:text-3xl">
                Miss nothing.
              </p>
              <p className="text-gray-900 font-semibold text-2xl sm:text-3xl">
                Move first.
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white btn-gradient rounded-xl transition-all"
            >
              Join the waitlist
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
