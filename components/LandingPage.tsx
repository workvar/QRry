'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { CTASection } from '@/components/landing/CTASection';
import { landingFeatures, landingFooterLinks } from '@/data/landingPageData';

interface LandingPageProps {
    onStart: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, isDark, toggleTheme }) => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
    const featuresRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            
            // Check visibility of feature sections
            featuresRef.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                    setIsVisible(prev => ({ ...prev, [`feature-${index}`]: isInView }));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${
            isDark 
                ? 'bg-black text-white' 
                : 'bg-[#F5F5F7] text-[#1D1D1F]'
        }`}>
            <AppHeader 
                isDark={isDark}
                onToggleTheme={toggleTheme}
                showPricing
                showDashboard
                onGetStarted={onStart}
            />

            <main>
                <HeroSection 
                    isDark={isDark}
                    scrollY={scrollY}
                    onGetStarted={onStart}
                />

                {landingFeatures.map((feature, index) => (
                    <div
                        key={index}
                        ref={el => { featuresRef.current[index] = el; }}
                    >
                        <FeatureSection
                            feature={feature}
                            index={index}
                            isDark={isDark}
                            isVisible={isVisible[`feature-${index}`] || false}
                            onGetStarted={onStart}
                        />
                    </div>
                ))}

                <CTASection 
                    isDark={isDark}
                    onGetStarted={onStart}
                />
            </main>

            <AppFooter 
                isDark={isDark}
            />

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
