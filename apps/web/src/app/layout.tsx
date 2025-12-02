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
  title: 'PriceWatch - Competitive Intelligence for E-commerce',
  description: 'Monitor competitors, detect changes, and automate counter-attacks for your Shopify store.',
  keywords: ['competitive intelligence', 'e-commerce', 'shopify', 'price monitoring', 'competitor analysis'],
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
