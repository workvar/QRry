
import React from 'react';
import {
    SparklesIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    PhotoIcon,
    PaintBrushIcon,
    CloudArrowDownIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/24/outline';
import * as Switch from '@radix-ui/react-switch';

interface LandingPageProps {
    onStart: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, isDark, toggleTheme }) => {
    const features = [
        {
            title: 'AI Smart Fetch',
            description: 'Automatically extract high-resolution brand assets simply by entering a domain.',
            icon: CloudArrowDownIcon,
            color: 'text-blue-500'
        },
        {
            title: 'Precision Styling',
            description: 'Granular control over pattern dots, eye geometry, and corner curvatures.',
            icon: PaintBrushIcon,
            color: 'text-purple-500'
        },
        {
            title: 'Enterprise Safety',
            description: 'Built-in error correction and verification ensure your QR scans every single time.',
            icon: ShieldCheckIcon,
            color: 'text-green-500'
        },
        {
            title: 'Professional Export',
            description: 'Download in SVG vector format, transparent PNG, or optimized JPEG for any medium.',
            icon: PhotoIcon,
            color: 'text-orange-500'
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 flex flex-col ${isDark ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'}`}>
            <header className="h-20 flex items-center justify-between px-8 max-w-[1400px] mx-auto w-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                        <span className="text-white font-black text-xl">N</span>
                    </div>
                    <span className="text-xl font-black tracking-tight">NovaQR</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-3 bg-current bg-opacity-5 px-3 py-1.5 rounded-full">
                        <SunIcon className={`w-4 h-4 ${isDark ? 'opacity-20' : 'text-orange-500'}`} />
                        <Switch.Root
                            checked={isDark}
                            onCheckedChange={toggleTheme}
                            className="w-10 h-6 bg-zinc-400/30 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
                        >
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-[18px]" />
                        </Switch.Root>
                        <MoonIcon className={`w-4 h-4 ${!isDark ? 'opacity-20' : 'text-blue-400'}`} />
                    </div>
                    <button
                        onClick={onStart}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                    >
                        Create Now
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center">
                {/* Hero Section */}
                <section className="py-20 lg:py-32 px-6 text-center max-w-[1000px] mx-auto relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in">
                        <SparklesIcon className="w-4 h-4" />
                        Next Gen QR Generation
                    </div>

                    <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                        QR Design for <br />
                        <span className="text-blue-600">The Modern Era.</span>
                    </h1>

                    <p className="text-lg lg:text-xl opacity-60 leading-relaxed mb-12 max-w-[700px] mx-auto">
                        Professional-grade QR generation with pixel-perfect styling, AI branding integration, and high-fidelity vector exports. Built for designers and brands.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onStart}
                            className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-95"
                        >
                            Open Studio
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="py-24 px-6 max-w-[1200px] mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] border border-current border-opacity-5 bg-current bg-opacity-[0.02] transition-all hover:-translate-y-2">
                                <div className={`w-14 h-14 rounded-2xl bg-current bg-opacity-5 flex items-center justify-center mb-6 ${f.color}`}>
                                    <f.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                <p className="text-sm opacity-50 leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Visual Showcase Marquee */}
                <section className="py-24 px-6 w-full overflow-hidden bg-current bg-opacity-[0.02] border-y border-current border-opacity-5">
                    <div className="max-w-[1200px] mx-auto text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Crafted for Clarity</h2>
                        <p className="opacity-40 max-w-[600px] mx-auto">Used by top-tier marketing teams to bridge the physical and digital world.</p>
                    </div>

                    <div className="flex gap-8 animate-marquee">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="w-64 h-64 shrink-0 rounded-[3rem] bg-current bg-opacity-5 flex items-center justify-center border border-current border-opacity-10">
                                <div className="w-32 h-32 bg-white rounded-2xl shadow-xl overflow-hidden p-4">
                                    <div className="w-full h-full bg-slate-100 rounded opacity-20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 border-t border-current border-opacity-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">NovaQR Studio • Enterprise Grade</p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                    <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
                </div>
            </footer>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>
        </div>
    );
};

export default LandingPage;
