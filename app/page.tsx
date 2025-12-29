
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { useQRSettings } from '@/hooks/useQRSettings';

export default function Page() {
  const router = useRouter();
  const { settings, updateSettings } = useQRSettings();
  const isDark = settings.theme === 'dark';

  const handleStart = () => {
    router.push('/create/content');
  };

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  return (
    <LandingPage
      onStart={handleStart}
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  );
}
