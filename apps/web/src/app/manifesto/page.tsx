'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, TrendingUp, Zap, Shield, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
};

const features = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Real-time Monitoring',
    description: 'Track every move your competitors make. Ads, pricing changes, SEO updates, product launches — nothing escapes your radar.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'AI-Powered Insights',
    description: 'Our AI analyzes patterns and delivers actionable recommendations. Know not just what changed, but what it means for your business.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Alerts',
    description: 'Get notified the moment something important happens. Stay ahead of the curve, never be caught off guard again.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Strategic Dashboard',
    description: 'All your competitive intelligence in one beautiful interface. Make decisions faster with clarity and confidence.',
  },
];

export default function ManifestoPage() {
  return (
    <div className="min-h-screen hero-noise">
      {/* Header */}
      <header className="w-full py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/branding/logosentryaxx.png" 
              alt="Sentryax" 
              width={160} 
              height={42}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={glassStyle}>
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Our Manifesto</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              We believe in
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                unfair advantages.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              In business, information is power. The companies that win aren&apos;t always the biggest — they&apos;re the ones who see what others miss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 sm:p-12"
            style={glassStyle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              The Problem
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Every single day, your competitors are making moves. They&apos;re launching new products, 
                adjusting prices, running aggressive ad campaigns, optimizing their SEO, and pivoting 
                their strategies.
              </p>
              <p>
                And most of the time? <span className="font-semibold text-gray-900">You have no idea.</span>
              </p>
              <p>
                By the time you notice, it&apos;s too late. You&apos;ve already lost customers. You&apos;ve already 
                missed opportunities. You&apos;re always one step behind.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
              Enter Sentryax
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Your competitive intelligence command center. We watch your competitors so you don&apos;t have to.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-6"
                  style={glassStyle}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <span className="text-gray-700">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 sm:p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(251,146,60,0.08) 100%)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <Shield className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our Promise
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              We&apos;re building Sentryax for founders who refuse to fly blind. For teams who know that 
              in today&apos;s market, the difference between winning and losing often comes down to 
              <span className="font-semibold"> who sees the opportunity first.</span>
            </p>
            <p className="text-gray-600 text-sm">
              Currently in private beta. Join the waitlist to get early access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Ready to see everything?
            </h2>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded-xl btn-gradient transition-all hover:scale-105"
            >
              Join the Beta Waitlist
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2024 Sentryax. Built with ❤️ for ambitious founders.
          </p>
        </div>
      </footer>
    </div>
  );
}
