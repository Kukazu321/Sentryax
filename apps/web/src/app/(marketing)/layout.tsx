import { Header } from '@/components/marketing/header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen hero-noise">
      <Header />
      {children}
    </div>
  );
}
