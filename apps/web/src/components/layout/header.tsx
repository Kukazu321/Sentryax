'use client';

import { UserButton } from '@clerk/nextjs';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@pricewatch/ui';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
