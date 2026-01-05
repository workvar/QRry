'use client';

import Link from 'next/link';
import { QrCodeIcon, PlusIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  isDark: boolean;
}

export function EmptyState({ isDark }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className={`w-24 h-24 mx-auto mb-6 rounded-[2rem] flex items-center justify-center ${
        isDark ? 'bg-white/5' : 'bg-black/5'
      }`}>
        <QrCodeIcon className={`w-12 h-12 ${isDark ? 'text-white/30' : 'text-black/30'}`} />
      </div>
      <h3 className="text-2xl font-bold mb-3">
        No QR codes yet
      </h3>
      <p className={`text-base mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
        Create your first QR code to get started
      </p>
      <Link
        href="/create/content"
        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
      >
        <PlusIcon className="w-5 h-5" />
        Create Your First QR Code
      </Link>
    </div>
  );
}
