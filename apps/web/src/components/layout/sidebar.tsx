'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@pricewatch/ui';
import {
  LayoutDashboard,
  Users,
  Search,
  Zap,
  Link2,
  Webhook,
  Settings,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Competitors', href: '/competitors', icon: Users },
  { name: 'Scans', href: '/scans', icon: Search },
  { name: 'Counter-Attacks', href: '/counter-attacks', icon: Zap },
  { name: 'Integrations', href: '/integrations', icon: Link2 },
  { name: 'Webhooks', href: '/webhooks', icon: Webhook },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">PriceWatch</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
