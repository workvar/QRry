
import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Slider from '@radix-ui/react-slider';
import * as Accordion from '@radix-ui/react-accordion';
import * as Label from '@radix-ui/react-label';
import {
    ArrowPathIcon,
    NoSymbolIcon,
    SparklesIcon,
    Squares2X2Icon,
    Square3Stack3DIcon,
    CubeIcon,
    BeakerIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { QRSettings, DotType, CornerSquareType, CornerDotType, FrameStyle } from '@/types';
import { CustomSwitch } from '../ui/CustomSwitch';
import { ColorPicker } from '../ui/ColorPicker';
import { AccordionItem } from '../ui/AccordionItem';

interface StepDesignProps {
    settings: QRSettings;
    onUpdate: (updates: Partial<QRSettings>) => void;
    isDark?: boolean;
}

export const StepDesign: React.FC<StepDesignProps> = ({ settings, onUpdate, isDark = false }) => {
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null);

    const labelClass = `block text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-white/30' : 'text-black/30'}`;

    const handleResetColors = () => {
        const primary = isDark ? '#ffffff' : '#000000';
        const bg = isDark ? '#000000' : '#ffffff';
        onUpdate({
            dotsColor: primary,
            backgroundColor: bg,
            cornerSquareColor: primary,
            cornerDotColor: primary,
            isTransparent: false,
            bgGradientEnabled: false,
            dotsGradientEnabled: false,
            frameColor: primary
        });
        setToast({ message: "Colors reset to defaults", type: 'info' });
        setTimeout(() => setToast(null), 4000);
    };

    return (
        <div className="relative">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full">
                <Accordion.Root type="single" defaultValue="pattern" collapsible className="rounded-3xl border border-current border-opacity-10 overflow-hidden shadow-2xl shadow-blue-900/5">

                    {/* Pattern Section */}
                    <AccordionItem value="pattern" label="Pattern Style" icon={Squares2X2Icon} isDark={isDark}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => onUpdate({ dotsType: type as DotType })}
                                    className={`p-6 md:p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${settings.dotsType === type ? 'border-blue-600 bg-blue-600/5' : 'border-transparent bg-current bg-opacity-[0.03] hover:bg-opacity-[0.05]'}`}
                                >
                                    <div className={`w-8 h-8 rounded border-2 border-dashed ${settings.dotsType === type ? 'border-blue-600/50' : 'border-current opacity-10'}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-center ${settings.dotsType === type ? 'text-blue-600' : 'opacity-40'}`}>{type.replace('-', ' ')}</span>
                                </button>
                            ))}
                        </div>
                    </AccordionItem>

                    {/* Geometry Section */}
                    <AccordionItem value="geometry" label="Eye Geometry" icon={CubeIcon} isDark={isDark}>
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <Label.Root className={labelClass}>Corner Shape</Label.Root>
                                <div className={`p-1.5 flex gap-1 rounded-[1.5rem] ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                    {['square', 'dot', 'extra-rounded'].map((type) => (
                                        <button key={type} onClick={() => onUpdate({ cornerSquareType: type as CornerSquareType })} className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-[1rem] transition-all ${settings.cornerSquareType === type ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-60'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label.Root className={labelClass}>Eye Dot</Label.Root>
                                <div className={`p-1.5 flex gap-1 rounded-[1.5rem] ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                    {['square', 'dot'].map((type) => (
                                        <button key={type} onClick={() => onUpdate({ cornerDotType: type as CornerDotType })} className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-[1rem] transition-all ${settings.cornerDotType === type ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-60'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AccordionItem>

                    {/* Colors Section */}
                    <AccordionItem value="colors" label="Color Palette" icon={BeakerIcon} isDark={isDark}>
                        <div className="space-y-12">
                            <div className="flex justify-between items-center pb-4 border-b border-current border-opacity-5">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Global Colors</h3>
                                <button onClick={handleResetColors} className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all">
                                    <ArrowPathIcon className="w-3 h-3" />
                                    Reset
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="space-y-10">
                                    <ColorPicker
                                        label="Data Points"
                                        value={settings.dotsColor}
                                        onChange={(v: string) => onUpdate({ dotsColor: v, ...(settings.frameSync ? { frameColor: v } : {}) })}
                                        secondaryValue={settings.dotsGradientSecondary}
                                        onSecondaryChange={(v: string) => onUpdate({ dotsGradientSecondary: v })}
                                        gradientEnabled={settings.dotsGradientEnabled}
                                        onGradientToggle={() => onUpdate({ dotsGradientEnabled: !settings.dotsGradientEnabled })}
                                        isDark={isDark}
                                    />

                                    <div className="space-y-6">
                                        <Label.Root className={labelClass}>Canvas Background</Label.Root>
                                        <div className="space-y-4">
                                            <CustomSwitch label="Alpha Transparency" checked={settings.isTransparent} onCheckedChange={(v: boolean) => onUpdate({ isTransparent: v, bgGradientEnabled: false })} icon={NoSymbolIcon} isDark={isDark} />
                                            {!settings.isTransparent && (
                                                <ColorPicker
                                                    label="Background Fill"
                                                    value={settings.backgroundColor}
                                                    onChange={(v: string) => onUpdate({ backgroundColor: v })}
                                                    gradientEnabled={settings.bgGradientEnabled}
                                                    onGradientToggle={() => onUpdate({ bgGradientEnabled: !settings.bgGradientEnabled, isTransparent: false })}
                                                    secondaryValue={settings.bgGradient.colorStops[1].color}
                                                    onSecondaryChange={(v: string) => {
                                                        const newStops = [...settings.bgGradient.colorStops];
                                                        newStops[1] = { ...newStops[1], color: v };
                                                        onUpdate({ bgGradient: { ...settings.bgGradient, colorStops: newStops } });
                                                    }}
                                                    isDark={isDark}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="space-y-8">
                                        <ColorPicker label="Eye Perimeter" value={settings.cornerSquareColor} onChange={(v: string) => onUpdate({ cornerSquareColor: v })} isDark={isDark} />
                                        <ColorPicker label="Eye Center" value={settings.cornerDotColor} onChange={(v: string) => onUpdate({ cornerDotColor: v })} isDark={isDark} />
                                    </div>

                                    <div className="pt-8 border-t border-current border-opacity-5">
                                        <div className="flex items-center justify-between mb-6">
                                            <Label.Root className={labelClass.replace('mb-3', 'mb-0')}>Outer Ring Color</Label.Root>
                                            <Switch.Root checked={settings.frameEnabled} onCheckedChange={(v) => onUpdate({ frameEnabled: v })} className="w-10 h-6 bg-zinc-400/30 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer">
                                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-[18px]" />
                                            </Switch.Root>
                                        </div>
                                        {settings.frameEnabled && (
                                            <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-current bg-opacity-5">
                                                    <Label.Root className="text-[10px] font-bold uppercase opacity-60">Sync Pattern Color</Label.Root>
                                                    <Switch.Root checked={settings.frameSync} onCheckedChange={(v) => onUpdate({ frameSync: v, frameColor: v ? settings.dotsColor : settings.frameColor })} className="w-8 h-4 bg-zinc-400/30 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer">
                                                        <Switch.Thumb className="block w-3 h-3 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-[14px]" />
                                                    </Switch.Root>
                                                </div>
                                                {!settings.frameSync && (
                                                    <ColorPicker label="Ring Fill" value={settings.frameColor} onChange={(v: string) => onUpdate({ frameColor: v })} isDark={isDark} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionItem>

                    {/* Frame Section */}
                    <AccordionItem value="frame" label="Frame Layer" icon={Square3Stack3DIcon} isDark={isDark}>
                        <div className="space-y-10">
                            <CustomSwitch label="Enable Exterior Ring" checked={settings.frameEnabled} onCheckedChange={(v: boolean) => onUpdate({ frameEnabled: v })} icon={SparklesIcon} isDark={isDark} />

                            {settings.frameEnabled && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4 animate-in fade-in zoom-in-95">
                                    <div className="space-y-4">
                                        <Label.Root className={labelClass}>Stroke Style</Label.Root>
                                        <div className={`p-1 flex gap-1 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                            {['solid', 'dashed', 'dotted'].map((s) => (
                                                <button key={s} onClick={() => onUpdate({ frameStyle: s as FrameStyle })} className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-xl transition-all ${settings.frameStyle === s ? 'bg-blue-600 text-white' : 'opacity-40 hover:opacity-60'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Label.Root className={labelClass.replace('mb-3', 'mb-0')}>Stroke Width</Label.Root>
                                                <span className="text-xs font-mono font-bold opacity-40">{settings.frameThickness}px</span>
                                            </div>
                                            <Slider.Root
                                                className="relative flex items-center select-none touch-none w-full h-5"
                                                value={[settings.frameThickness]}
                                                onValueChange={([v]) => onUpdate({ frameThickness: v })}
                                                max={20} min={1} step={1}
                                            >
                                                <Slider.Track className="bg-black/10 relative grow rounded-full h-[3px] overflow-hidden">
                                                    <Slider.Range className="absolute bg-blue-600 h-full" />
                                                </Slider.Track>
                                                <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                                            </Slider.Root>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Label.Root className={labelClass.replace('mb-3', 'mb-0')}>Roundness</Label.Root>
                                                <span className="text-xs font-mono font-bold opacity-40">{settings.frameBorderRadius}px</span>
                                            </div>
                                            <Slider.Root
                                                className="relative flex items-center select-none touch-none w-full h-5"
                                                value={[settings.frameBorderRadius]}
                                                onValueChange={([v]) => onUpdate({ frameBorderRadius: v })}
                                                max={80} min={0} step={1}
                                            >
                                                <Slider.Track className="bg-black/10 relative grow rounded-full h-[3px] overflow-hidden">
                                                    <Slider.Range className="absolute bg-blue-600 h-full" />
                                                </Slider.Track>
                                                <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                                            </Slider.Root>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Label.Root className={labelClass.replace('mb-3', 'mb-0')}>Gap to Data</Label.Root>
                                                <span className="text-xs font-mono font-bold opacity-40">{settings.framePadding}px</span>
                                            </div>
                                            <Slider.Root
                                                className="relative flex items-center select-none touch-none w-full h-5"
                                                value={[settings.framePadding]}
                                                onValueChange={([v]) => onUpdate({ framePadding: v })}
                                                max={60} min={0} step={1}
                                            >
                                                <Slider.Track className="bg-black/10 relative grow rounded-full h-[3px] overflow-hidden">
                                                    <Slider.Range className="absolute bg-blue-600 h-full" />
                                                </Slider.Track>
                                                <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                                            </Slider.Root>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </AccordionItem>
                </Accordion.Root>
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
