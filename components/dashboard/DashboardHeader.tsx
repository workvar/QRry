'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/common/ThemeToggle';

interface DashboardHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  showDashboardLink?: boolean;
  showPricingLink?: boolean;
}

export function DashboardHeader({ 
  isDark, 
  onToggleTheme, 
  showDashboardLink = false,
  showPricingLink = false 
}: DashboardHeaderProps) {
  return (
    <header className={`h-16 border-b sticky top-0 z-50 flex items-center backdrop-blur-md transition-colors ${
      isDark ? 'border-white/10 bg-black/70' : 'border-black/5 bg-white/70'
    }`}>
      <div className="max-w-[1200px] w-full mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 cursor-pointer">
          <Image
            src={isDark ? "/Assets/logo.png" : "/Assets/logo-black.png"}
            alt="QRry Studio"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold tracking-tight">QRry Studio</span>
        </Link>

        <div className="flex items-center gap-4">
          {showPricingLink && (
            <Link
              href="/pricing"
              className={`hidden sm:block text-sm font-semibold hover:opacity-70 transition-opacity ${
                isDark ? 'text-white/80' : 'text-black/80'
              }`}
            >
              Pricing
            </Link>
          )}
          {showDashboardLink && (
            <Link
              href="/dashboard"
              className={`hidden sm:block text-sm font-semibold hover:opacity-70 transition-opacity ${
                isDark ? 'text-white/80' : 'text-black/80'
              }`}
            >
              Dashboard
            </Link>
          )}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} variant="minimal" />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
