'use client';

import { FAQ } from '@/data/pricingData';

interface FAQItemProps {
  faq: FAQ;
  isDark: boolean;
}

export function FAQItem({ faq, isDark }: FAQItemProps) {
  return (
    <div className={`p-6 border ${
      isDark 
        ? 'bg-black border-white/10' 
        : 'bg-white border-black/10'
    }`}>
      <h3 className={`text-lg font-semibold mb-3 ${
        isDark ? 'text-white' : 'text-black'
      }`}>
        {faq.q}
      </h3>
      <p className={`text-base leading-relaxed ${
        isDark ? 'text-white/70' : 'text-black/70'
      }`}>
        {faq.a}
      </p>
    </div>
  );
}
