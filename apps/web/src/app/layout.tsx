import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sentryax - Competitive Intelligence Platform',
  description: 'Stop losing sales to competitors you don\'t even see. Track ads, pricing, SEO, and product launches in real-time.',
  keywords: ['competitive intelligence', 'competitor monitoring', 'market intelligence', 'competitor analysis', 'business intelligence'],
  icons: {
    icon: '/images/branding/favicon.ico',
    apple: '/images/branding/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sentryax - Competitive Intelligence Platform',
    description: 'Stop losing sales to competitors you don\'t even see.',
    siteName: 'Sentryax',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
