
import React, { useEffect, useRef, useState } from 'react';
import { QRSettings } from '../types';
import { FEATURE_FLAGS } from '../config';
import { ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const SCRIPT_URL = 'https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js';

interface PreviewCardProps {
    settings: QRSettings;
    showDownload?: boolean;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ settings, showDownload = false }) => {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrStylingRef = useRef<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [libLoaded, setLibLoaded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isDark = settings.theme === 'dark';

    useEffect(() => {
        // Check if script is already loaded
        if ((window as any).QRCodeStyling) {
            setLibLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = SCRIPT_URL;
        script.async = true;
        script.onload = () => setLibLoaded(true);
        document.body.appendChild(script);
        return () => {
            // Don't remove script as it might be used by other components or re-mounts
            // document.body.removeChild(script); 
        };
    }, []);

    useEffect(() => {
        if (!libLoaded || !qrRef.current) return;

        // @ts-ignore
        const QRCodeStyling = (window as any).QRCodeStyling;
        if (!QRCodeStyling) return;

        const dotsOptions: any = {
            type: settings.dotsType,
            color: settings.dotsGradientEnabled ? undefined : settings.dotsColor,
            gradient: settings.dotsGradientEnabled ? {
                type: settings.dotsGradientType,
                rotation: (settings.dotsGradientRotation * Math.PI) / 180,
                colorStops: [
                    { offset: 0, color: settings.dotsColor },
                    { offset: 1, color: settings.dotsGradientSecondary }
                ]
            } : undefined
        };

        const qrConfig = {
            width: 320,
            height: 320,
            data: settings.url || ' ',
            margin: settings.margin,
            dotsOptions,
            backgroundOptions: {
                color: settings.isTransparent ? 'transparent' : (settings.bgGradientEnabled ? undefined : settings.backgroundColor),
                gradient: !settings.isTransparent && settings.bgGradientEnabled ? {
                    type: settings.bgGradient.type,
                    rotation: (settings.bgGradient.rotation * Math.PI) / 180,
                    colorStops: settings.bgGradient.colorStops
                } : undefined
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: settings.logoMargin,
                imageSize: settings.logoSize,
                hideBackgroundDots: true,
            },
            cornersSquareOptions: {
                color: settings.cornerSquareColor,
                type: settings.cornerSquareType,
            },
            cornersDotOptions: {
                color: settings.cornerDotColor,
                type: settings.cornerDotType,
            },
            image: settings.logoUrl
        };

        if (!qrStylingRef.current) {
            qrStylingRef.current = new QRCodeStyling(qrConfig);
            qrStylingRef.current.append(qrRef.current);
        } else {
            qrStylingRef.current.update(qrConfig);
        }
    }, [settings, libLoaded]);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDownload = (ext: 'png' | 'svg' | 'webp' | 'jpeg', transparent = false) => {
        if (qrStylingRef.current) {
            if (transparent && ext === 'png') {
                const oldBg = settings.backgroundColor;
                const wasTransparent = settings.isTransparent;
                qrStylingRef.current.update({ backgroundOptions: { color: 'transparent', gradient: undefined } });
                qrStylingRef.current.download({ name: 'NovaQR_Transparent', extension: ext });
                setTimeout(() => {
                    qrStylingRef.current.update({
                        backgroundOptions: {
                            color: wasTransparent ? 'transparent' : (settings.bgGradientEnabled ? undefined : oldBg),
                            gradient: !wasTransparent && settings.bgGradientEnabled ? {
                                type: settings.bgGradient.type,
                                rotation: (settings.bgGradient.rotation * Math.PI) / 180,
                                colorStops: settings.bgGradient.colorStops
                            } : undefined
                        }
                    });
                }, 150);
            } else {
                qrStylingRef.current.download({ name: 'NovaQR_Design', extension: ext });
            }
        }
        setIsDropdownOpen(false);
    };

    const frameStyle = settings.frameEnabled ? {
        border: `${settings.frameThickness}px ${settings.frameStyle} ${settings.frameColor}`,
        padding: `${settings.framePadding}px`,
        borderRadius: `${settings.frameBorderRadius}px`,
    } : {};

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">

            <div className={`relative p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden ${isDark ? 'bg-[#1D1D1F] ring-1 ring-white/10' : 'bg-white'
                }`}>

                {/* Anti-Direct-Download Overlay */}
                <div
                    className="absolute inset-0 z-[50]"
                    onContextMenu={(e) => e.preventDefault()}
                />

                {/* Watermark Layer */}
                {FEATURE_FLAGS.ENABLE_WATERMARK && (
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-5 flex items-center justify-center rotate-[-25deg]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, #C0C0C0 0, #C0C0C0 1px, transparent 0, transparent 50%)',
                            backgroundSize: '150px 150px',
                            color: '#999'
                        }}
                    >
                        <div className="grid grid-cols-4 gap-x-24 gap-y-16">
                            {Array(20).fill(0).map((_, i) => (
                                <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">NOVAQR STUDIO</span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="relative aspect-square flex items-center justify-center">
                    <div style={frameStyle} className="relative z-10 transition-all duration-500 scale-95 group-hover:scale-100 flex items-center justify-center">
                        <div ref={qrRef} className="rounded-lg overflow-hidden flex items-center justify-center" />
                    </div>

                    {!libLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>

            {/* Unified Download Button with Dropdown */}
            {showDownload && FEATURE_FLAGS.ENABLE_DOWNLOAD_FORMATS && (
                <div className="relative" ref={dropdownRef}>
                    <div className="flex">
                        <button
                            onClick={() => handleDownload('png')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-l-full text-sm font-semibold transition-all ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Download QR
                        </button>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`px-5 py-4 rounded-r-full border-l flex items-center justify-center transition-all ${isDark
                                    ? 'bg-white text-black hover:bg-gray-200 border-black/10'
                                    : 'bg-black text-white hover:bg-gray-800 border-white/10'
                                }`}
                        >
                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className={`absolute bottom-full left-0 right-0 mb-3 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 z-[100] ${isDark ? 'bg-zinc-900 ring-1 ring-white/10' : 'bg-white ring-1 ring-black/5'
                            }`}>
                            <div className="p-2 space-y-1">
                                {FEATURE_FLAGS.DOWNLOAD_OPTIONS.PNG && (
                                    <button onClick={() => handleDownload('png')} className={`w-full text-left px-6 py-3 text-xs font-semibold rounded-2xl hover:bg-blue-600 hover:text-white transition-colors`}>PNG Image</button>
                                )}
                                {FEATURE_FLAGS.DOWNLOAD_OPTIONS.PNG_TRANSPARENT && (
                                    <button onClick={() => handleDownload('png', true)} className={`w-full text-left px-6 py-3 text-xs font-semibold rounded-2xl hover:bg-blue-600 hover:text-white transition-colors`}>PNG (Transparent)</button>
                                )}
                                {FEATURE_FLAGS.DOWNLOAD_OPTIONS.JPG && (
                                    <button onClick={() => handleDownload('jpeg')} className={`w-full text-left px-6 py-3 text-xs font-semibold rounded-2xl hover:bg-blue-600 hover:text-white transition-colors`}>JPG Format</button>
                                )}
                                {FEATURE_FLAGS.DOWNLOAD_OPTIONS.SVG && (
                                    <button onClick={() => handleDownload('svg')} className={`w-full text-left px-6 py-3 text-xs font-semibold rounded-2xl hover:bg-blue-600 hover:text-white transition-colors`}>Vector SVG</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-center gap-8 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                <span>High Quality ECC</span>
                <span>•</span>
                <span>Resolution Optimized</span>
            </div>
        </div>
    );
};

export default PreviewCard;
