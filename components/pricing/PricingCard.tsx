'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import { PricingPlan } from '@/data/pricingData';

interface PricingCardProps {
  plan: PricingPlan;
  isDark: boolean;
  isVisible: boolean;
  index: number;
  onPurchase: () => void;
}

export function PricingCard({ plan, isDark, isVisible, index, onPurchase }: PricingCardProps) {
  return (
    <div
      className={`border flex flex-col h-full ${
        isDark 
          ? 'bg-black border-white/10 hover:border-white/20' 
          : 'bg-white border-black/10 hover:border-black/20'
      } transition-all`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0)' 
          : 'translateY(20px)',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
            <plan.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className={`text-4xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              {plan.price}
            </span>
            <span className={`text-base font-medium ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              /{plan.period}
            </span>
          </div>
          <p className={`text-sm leading-relaxed mb-6 ${
            isDark ? 'text-white/70' : 'text-black/70'
          }`}>
            {plan.description}
          </p>
        </div>

        <div className="mt-auto mb-8">
          <button
            onClick={onPurchase}
            className="w-full py-3 bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            {plan.buttonText}
          </button>
        </div>

        <div className="border-t pt-6" style={{
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}>
          <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
            isDark ? 'text-white/50' : 'text-black/50'
          }`}>
            Features
          </div>
          <div className="space-y-3">
            {plan.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-start gap-3"
              >
                <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`text-sm ${
                  isDark ? 'text-white/90' : 'text-black/90'
                }`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
