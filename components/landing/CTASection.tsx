'use client';

import { RocketLaunchIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { landingCTABenefits } from '@/data/landingPageData';

interface CTASectionProps {
  isDark: boolean;
  onGetStarted: () => void;
}

export function CTASection({ isDark, onGetStarted }: CTASectionProps) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      isDark ? 'bg-gradient-to-b from-black to-blue-950/20' : 'bg-gradient-to-b from-white to-blue-50'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-xl border ${
          isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-black/5 border-black/10'
        }`}>
          <RocketLaunchIcon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Ready to Transform Your Brand?</span>
        </div>

        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
          Start Creating
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Today
          </span>
        </h2>

        <p className="text-2xl md:text-3xl mb-12 opacity-70 font-light max-w-2xl mx-auto">
          Join thousands of brands creating stunning QR codes in minutes, not hours.
        </p>

        <button
          onClick={onGetStarted}
          className="group px-12 py-6 bg-blue-600 text-white rounded-full font-bold text-xl transition-all shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70 hover:scale-110 active:scale-95 flex items-center gap-3 mx-auto"
        >
          Create Your First QR Code
          <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {landingCTABenefits.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-black/5 border-black/10'
              }`}
            >
              <CheckCircleIcon className={`w-8 h-8 mb-4 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`} />
              <div className="font-bold text-lg mb-2">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
