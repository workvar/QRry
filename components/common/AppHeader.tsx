'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';

interface AppHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  showPricing?: boolean;
  showDashboard?: boolean;
  onGetStarted?: () => void;
}

export function AppHeader({ 
  isDark, 
  onToggleTheme, 
  showPricing = false,
  showDashboard = false,
  onGetStarted 
}: AppHeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-500 ${
      isDark 
        ? 'bg-black/80 border-b border-white/10' 
        : 'bg-white/80 border-b border-black/5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={isDark ? "/Assets/logo.png" : "/Assets/logo-black.png"}
            alt="QRry Studio"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold tracking-tight">QRry Studio</span>
        </Link>
        <div className="flex items-center gap-4">
          {showPricing && (
            <Link
              href="/pricing"
              className={`hidden sm:block text-sm font-semibold hover:opacity-70 transition-opacity ${
                isDark ? 'text-white/80' : 'text-black/80'
              }`}
            >
              Pricing
            </Link>
          )}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <SignedIn>
            {showDashboard && (
              <Link
                href="/dashboard"
                className={`hidden sm:block text-sm font-semibold hover:opacity-70 transition-opacity ${
                  isDark ? 'text-white/80' : 'text-black/80'
                }`}
              >
                Dashboard
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            {onGetStarted && (
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            )}
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
