'use client';

import { ArrowRightIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { LandingFeature } from '@/data/landingPageData';

interface FeatureSectionProps {
  feature: LandingFeature;
  index: number;
  isDark: boolean;
  isVisible: boolean;
  onGetStarted: () => void;
}

export function FeatureSection({ feature, index, isDark, isVisible, onGetStarted }: FeatureSectionProps) {
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        index % 2 === 0 
          ? (isDark ? 'bg-black' : 'bg-white')
          : (isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]')
      }`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
      </div>

      <div className={`relative z-10 max-w-[1400px] mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
        index % 2 === 1 ? 'lg:grid-flow-dense' : ''
      }`}>
        <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-black/5 border border-black/10'
          }`}>
            <feature.icon className={`w-5 h-5 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">
              {feature.subtitle}
            </span>
          </div>

          <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
            {feature.title}
          </h2>

          <p className="text-xl md:text-2xl leading-relaxed opacity-70 font-light max-w-2xl">
            {feature.description}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-8">
            {feature.stats.map((stat, statIndex) => (
              <div
                key={statIndex}
                className={`p-4 rounded-2xl backdrop-blur-xl border transition-all ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10'
                }`}
                style={{
                  animationDelay: `${statIndex * 0.1}s`,
                  animation: isVisible 
                    ? 'fadeInUp 0.6s ease-out forwards' 
                    : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {stat.split(' ')[0]}
                </div>
                <div className="text-xs opacity-60 mt-1">
                  {stat.split(' ').slice(1).join(' ')}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onGetStarted}
            className={`px-8 py-4 rounded-full font-bold text-base transition-all bg-gradient-to-r ${feature.gradient} text-white shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2`}
          >
            Try It Now
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <div 
            className={`relative p-12 rounded-[3rem] backdrop-blur-2xl border transition-all ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/80 border-black/10'
            } shadow-2xl`}
            style={{
              transform: isVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(50px) scale(0.95)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className={`text-9xl mb-8 text-center bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
              {feature.image}
            </div>

            <div className={`w-full h-64 rounded-2xl bg-gradient-to-br ${feature.gradient} p-8 flex items-center justify-center shadow-2xl`}>
              <div className={`w-full h-full rounded-xl ${
                isDark ? 'bg-black/20' : 'bg-white/20'
              } backdrop-blur-xl flex items-center justify-center`}>
                {index === 0 && (
                  <div className="text-center space-y-4">
                    <GlobeAltIcon className="w-16 h-16 mx-auto text-white" />
                    <div className="text-white font-bold">AI Analyzing...</div>
                    <div className="flex gap-2 justify-center">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-white rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg bg-gradient-to-br ${feature.gradient} animate-pulse`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      />
                    ))}
                  </div>
                )}
                {index === 2 && (
                  <div className="text-center space-y-4">
                    <ShieldCheckIcon className="w-16 h-16 mx-auto text-white" />
                    <div className="text-white font-bold text-2xl">100%</div>
                    <div className="text-white/80">Scan Success Rate</div>
                  </div>
                )}
                {index === 3 && (
                  <div className="flex gap-4">
                    {['SVG', 'PNG', 'JPG'].map((format, i) => (
                      <div
                        key={format}
                        className="px-6 py-4 bg-white/20 rounded-xl backdrop-blur-xl text-white font-bold"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          animation: 'fadeInUp 0.6s ease-out forwards',
                        }}
                      >
                        {format}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
