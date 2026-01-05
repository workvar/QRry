import {
  CpuChipIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

export interface LandingFeature {
  title: string;
  subtitle: string;
  description: string;
  icon: typeof CpuChipIcon;
  gradient: string;
  image: string;
  stats: string[];
}

export const landingFeatures: LandingFeature[] = [
  {
    title: 'AI-Powered Brand Intelligence',
    subtitle: 'Revolutionary Brand Extraction',
    description: 'Our advanced AI analyzes any website in seconds, extracting perfect brand colors, logos, and visual identity. No manual work. No guesswork. Just instant, pixel-perfect brand matching.',
    icon: CpuChipIcon,
    gradient: 'from-blue-500 to-cyan-500',
    image: '🎨',
    stats: ['99.9% Accuracy', 'Instant Analysis', 'Zero Manual Work']
  },
  {
    title: 'Infinite Design Possibilities',
    subtitle: 'Every Pixel, Under Your Control',
    description: 'Control every aspect of your QR code. Patterns, corners, eyes, colors, gradients, transparency—everything. Create designs that are truly yours, not templates.',
    icon: PaintBrushIcon,
    gradient: 'from-purple-500 to-pink-500',
    image: '✨',
    stats: ['50+ Pattern Styles', 'Unlimited Colors', 'Real-time Preview']
  },
  {
    title: 'Enterprise-Grade Reliability',
    subtitle: 'Scans Perfectly. Every Single Time.',
    description: 'Built with military-grade error correction. Your QR codes work flawlessly on any device, in any condition. Print them tiny or huge—they always scan.',
    icon: ShieldCheckIcon,
    gradient: 'from-green-500 to-emerald-500',
    image: '🛡️',
    stats: ['100% Scan Rate', 'Any Size Works', 'Perfect Every Time']
  },
  {
    title: 'Professional Export Suite',
    subtitle: 'Production-Ready Formats',
    description: 'Export in vector SVG for infinite scaling, transparent PNG for overlays, or optimized JPEG for web. Every format is production-ready, every time.',
    icon: PhotoIcon,
    gradient: 'from-orange-500 to-red-500',
    image: '📥',
    stats: ['Vector SVG', 'Transparent PNG', 'Optimized JPEG']
  }
];

export const landingCTABenefits = [
  'No Credit Card',
  'Free Forever',
  'Instant Access'
];

export const landingFooterLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' }
];
