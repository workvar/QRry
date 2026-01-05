import {
  SparklesIcon,
  RocketLaunchIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  gradient: string;
  icon: typeof SparklesIcon;
  features: string[];
  buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'AI Suggestions Pack',
    price: '$10',
    period: 'one-time',
    description: 'Get 25 additional AI-powered design suggestions to enhance your QR codes',
    gradient: 'from-purple-500 to-pink-500',
    icon: SparklesIcon,
    features: [
      '25 AI suggestions',
      'One-time payment',
      'Never expires',
      'Works with any account',
      'Instant activation',
    ],
    buttonText: 'Purchase Now',
  },
  {
    name: 'QR Code Boost',
    price: '$5',
    period: 'one-time',
    description: 'Add 20 more QR codes to your account permanently',
    gradient: 'from-blue-500 to-cyan-500',
    icon: RocketLaunchIcon,
    features: [
      '20 additional QR codes',
      'One-time payment',
      'Permanent addition',
      'Works with any account',
      'Instant activation',
    ],
    buttonText: 'Purchase Now',
  },
  {
    name: 'Dynamic QR Codes',
    price: '$5',
    period: 'per month',
    description: 'Update QR code content without changing the code itself. Perfect for campaigns and marketing materials.',
    gradient: 'from-green-500 to-emerald-500',
    icon: QrCodeIcon,
    features: [
      '50 dynamic QR codes',
      'Update content anytime',
      'No reprinting needed',
      'Real-time updates',
      'Monthly subscription',
    ],
    buttonText: 'Subscribe Now',
  },
];

export interface FAQ {
  q: string;
  a: string;
}

export const pricingFAQs: FAQ[] = [
  {
    q: 'What do I get for free?',
    a: 'Every account starts with 4 QR codes and 2 AI suggestions at no cost. You can use these features forever without any payment.',
  },
  {
    q: 'Can I purchase multiple add-ons?',
    a: 'Yes! You can purchase any combination of add-ons. For example, you can buy multiple AI suggestion packs or QR code boosts to stack them.',
  },
  {
    q: 'Do one-time purchases expire?',
    a: 'No, one-time purchases (AI Suggestions Pack and QR Code Boost) never expire. They\'re permanently added to your account.',
  },
  {
    q: 'Can I cancel my Dynamic QR Codes subscription?',
    a: 'Yes, you can cancel your Dynamic QR Codes subscription at any time. You\'ll retain access until the end of your billing period.',
  },
  {
    q: 'What happens if I exceed my free limits?',
    a: 'You can continue using the free tier, but you\'ll need to purchase add-ons to create more QR codes or use more AI suggestions.',
  },
];

export const freePlanFeatures = {
  qrCodes: 4,
  aiSuggestions: 2,
};

export const pricingNote = 'All add-ons can be purchased at any time and work with your free account. Dynamic QR Codes require an active monthly subscription.';
