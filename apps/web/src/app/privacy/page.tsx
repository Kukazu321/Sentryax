'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen hero-noise">
      {/* Header */}
      <header className="w-full py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, update your profile, or sign up for our newsletter. This may include your name, email address, and password.
              </p>
              <p>
                When you access our service, we automatically collect certain information about your device and usage, including your IP address, browser type, and operating system.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To process your transactions and manage your account</li>
                <li>To send you technical notices, updates, and security alerts</li>
                <li>To communicate with you about products, services, and events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use industry-standard encryption to protect your data in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Cookies</h2>
              <p>
                We use cookies and similar technologies to collect information about your activity, browser, and device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:charlie@sentryax.com" className="text-gray-900 font-medium hover:underline">charlie@sentryax.com</a>.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-100 text-sm text-gray-500">
              Last updated: December 2024
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
