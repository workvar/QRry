'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface AppFooterProps {
  isDark: boolean;
  links?: FooterLink[];
  copyright?: string;
}

const defaultLinks: FooterLink[] = [
  { label: 'Documentation', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' }
];

export function AppFooter({ 
  isDark, 
  links = defaultLinks,
  copyright = `© ${new Date().getFullYear()} Workvar Pvt. Ltd.`
}: AppFooterProps) {
  return (
    <footer className={`py-12 px-8 border-t ${
      isDark 
        ? 'bg-black border-white/10' 
        : 'bg-white border-black/10'
    }`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/Assets/logo-blue.png"
              alt="QRry Studio"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold">QRry Studio</span>
          </div>
          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={`text-center text-sm border-t pt-8 ${
          isDark ? 'text-white/50 border-white/10' : 'text-black/50 border-black/10'
        }`}>
          {copyright}
        </div>
      </div>
    </footer>
  );
}
