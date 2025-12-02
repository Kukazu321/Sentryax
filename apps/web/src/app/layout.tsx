import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
    icon: '/images/branding/logosentryaxfondblanc.png',
    apple: '/images/branding/logosentryaxfondblanc.png',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
