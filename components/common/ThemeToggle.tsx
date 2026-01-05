'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import * as Switch from '@radix-ui/react-switch';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  variant?: 'default' | 'minimal';
}

export function ThemeToggle({ isDark, onToggle, variant = 'default' }: ThemeToggleProps) {
  if (variant === 'minimal') {
    return (
      <button
        onClick={onToggle}
        className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
        aria-label="Toggle theme"
      >
        {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full">
      <SunIcon className={`w-4 h-4 transition-opacity ${isDark ? 'opacity-40' : 'opacity-100'}`} />
      <Switch.Root
        checked={isDark}
        onCheckedChange={onToggle}
        className={`w-11 h-6 rounded-full relative outline-none cursor-pointer transition-all ${
          isDark ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px] shadow-md" />
      </Switch.Root>
      <MoonIcon className={`w-4 h-4 transition-opacity ${isDark ? 'opacity-100' : 'opacity-40'}`} />
    </div>
  );
}
