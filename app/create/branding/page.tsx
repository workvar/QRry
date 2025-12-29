
'use client';

import React from 'react';
import { useQRSettings } from '@/hooks/useQRSettings';
import { StepBranding } from '@/components/steps/StepBranding';

export default function BrandingPage() {
    const { settings, updateSettings } = useQRSettings();
    const isDark = settings.theme === 'dark';

    return (
        <StepBranding
            settings={settings}
            onUpdate={updateSettings}
            isDark={isDark}
        />
    );
}
