
import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Label from '@radix-ui/react-label';
import {
    PhotoIcon,
    ArrowPathIcon,
    CloudArrowDownIcon,
    PlusIcon,
    ExclamationCircleIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { QRSettings } from '@/types';

interface StepBrandingProps {
    settings: QRSettings;
    onUpdate: (updates: Partial<QRSettings>) => void;
    isDark?: boolean;
}

export const StepBranding: React.FC<StepBrandingProps> = ({ settings, onUpdate, isDark = false }) => {
    const [isFetchingLogo, setIsFetchingLogo] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null);

    const labelClass = `block text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-white/30' : 'text-black/30'}`;

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpdate({ logoUrl: event.target?.result as string });
                setToast({ message: "Logo uploaded successfully!", type: 'info' });
                setTimeout(() => setToast(null), 4000);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchBrandLogo = async () => {
        if (!settings.url) return;
        setIsFetchingLogo(true);
        try {
            let domain = settings.url.trim();
            if (!domain.startsWith('http')) domain = 'https://' + domain;
            const host = new URL(domain).hostname;
            const logoUrl = `https://logo.clearbit.com/${host}?size=512`;

            // Use server action to bypass CORS
            const { fetchLogo } = await import('@/app/actions');
            let base64 = await fetchLogo(logoUrl);

            if (base64) {
                onUpdate({ logoUrl: base64 });
                setIsFetchingLogo(false);
                setToast({ message: `Fetched asset for ${host}`, type: 'info' });
            } else {
                const fallbackUrl = `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
                base64 = await fetchLogo(fallbackUrl);

                if (base64) {
                    onUpdate({ logoUrl: base64 });
                } else {
                    setToast({ message: "Could not fetch logo. Please upload manually.", type: 'error' });
                }
                setIsFetchingLogo(false);
            }
            setTimeout(() => setToast(null), 4000);
        } catch (error) {
            console.error(error);
            setIsFetchingLogo(false);
            setToast({ message: "Fetch failed. Try manual upload.", type: 'error' });
            setTimeout(() => setToast(null), 4000);
        }
    };

    return (
        <div className="relative">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    <div className={`w-40 h-40 rounded-[2.5rem] border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 transition-all ${settings.logoUrl ? 'border-blue-600 bg-blue-600/5' : isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain p-6" />
                        ) : (
                            <PhotoIcon className="w-12 h-12 opacity-10" />
                        )}
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${isDark ? 'border-white/10 hover:border-white/30' : 'border-black/5 hover:border-black/20'}`}>
                            <PlusIcon className="w-6 h-6 opacity-40" />
                            <span className="text-xs font-bold uppercase tracking-widest text-center">Upload File</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                        <button
                            onClick={fetchBrandLogo}
                            className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-[2rem] transition-all ${isDark ? 'border-blue-500/20 hover:border-blue-500/50' : 'border-blue-600/10 hover:border-blue-600/30'}`}
                        >
                            {isFetchingLogo ? (
                                <ArrowPathIcon className="w-6 h-6 animate-spin text-blue-600" />
                            ) : (
                                <CloudArrowDownIcon className="w-6 h-6 text-blue-600" />
                            )}
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 text-center">Smart Fetch</span>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label.Root className={labelClass}>Asset Size</Label.Root>
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-full h-5"
                            value={[settings.logoSize]}
                            onValueChange={([v]) => onUpdate({ logoSize: v })}
                            max={0.5} min={0.1} step={0.01}
                        >
                            <Slider.Track className="bg-black/10 relative grow rounded-full h-[3px] overflow-hidden">
                                <Slider.Range className="absolute bg-blue-600 h-full" />
                            </Slider.Track>
                            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        </Slider.Root>
                    </div>
                    <div className="space-y-4">
                        <Label.Root className={labelClass}>Buffer Margin</Label.Root>
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-full h-5"
                            value={[settings.logoMargin]}
                            onValueChange={([v]) => onUpdate({ logoMargin: v })}
                            max={20} min={0} step={1}
                        >
                            <Slider.Track className="bg-black/10 relative grow rounded-full h-[3px] overflow-hidden">
                                <Slider.Range className="absolute bg-blue-600 h-full" />
                            </Slider.Track>
                            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        </Slider.Root>
                    </div>
                </div>
            </div>

            {toast && (
                <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all animate-in slide-in-from-bottom-4 duration-300 z-[1000] border ${toast.type === 'error'
                    ? 'bg-red-500 border-red-600 text-white'
                    : 'bg-blue-600 border-blue-700 text-white'
                    }`}>
                    {toast.type === 'error' ? <ExclamationCircleIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
                    <span className="text-sm font-bold">{toast.message}</span>
                </div>
            )}
        </div>
    );
};
