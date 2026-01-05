'use client';

import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface HeroSectionProps {
  isDark: boolean;
  scrollY: number;
  onGetStarted: () => void;
}

export function HeroSection({ isDark, scrollY, onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black' 
              : 'bg-gradient-to-br from-blue-50 via-purple-50 to-white'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 mt-5 rounded-full mb-8 backdrop-blur-xl border transition-all ${
          isDark 
            ? 'bg-white/5 border-white/10 text-blue-400' 
            : 'bg-black/5 border-black/10 text-blue-600'
        }`}>
          <SparklesIcon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">AI-Powered QR Generation</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tight">
          <span className="block">Create QR Codes</span>
          <span className={`block bg-gradient-to-r ${
            isDark 
              ? 'from-blue-400 to-cyan-400' 
              : 'from-blue-600 to-cyan-600'
          } bg-clip-text text-transparent`}>
            That Actually Matter
          </span>
        </h1>

        <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed font-light opacity-80">
          The most advanced QR code generator ever built. 
          <br />
          <span className="font-medium">AI-powered. Infinitely customizable. Production-ready.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button
            onClick={onGetStarted}
            className="group px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg transition-all shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70 hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            Start Creating Free
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className={`px-10 py-5 rounded-full font-bold text-lg transition-all border-2 ${
              isDark
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-black/20 text-black hover:bg-black/10'
            } hover:scale-105 active:scale-95`}
          >
            Watch Demo
          </button>
        </div>

        <div className="relative pb-10">
          <div 
            className={`inline-block p-8 rounded-[3rem] backdrop-blur-2xl border transition-all ${
              isDark 
                ? 'bg-white/5 border-white/10 shadow-2xl' 
                : 'bg-white/80 border-black/10 shadow-2xl'
            }`}
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px) rotate(${Math.sin(scrollY * 0.005) * 2}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="w-48 h-48 bg-white rounded-2xl p-4">
                <div className="w-full h-full bg-black rounded-lg grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded transition-all duration-300 ${
                        Math.random() > 0.5 
                          ? 'bg-black' 
                          : isDark ? 'bg-white/20' : 'bg-gray-200'
                      }`}
                      style={{
                        animationDelay: `${i * 0.01}s`,
                        animation: 'pulse 2s ease-in-out infinite',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 rounded-full border-2 ${
          isDark ? 'border-white/30' : 'border-black/30'
        } flex items-start justify-center p-2`}>
          <div className={`w-1 h-3 rounded-full ${
            isDark ? 'bg-white/50' : 'bg-black/50'
          } animate-pulse`} />
        </div>
      </div>
    </section>
  );
}
