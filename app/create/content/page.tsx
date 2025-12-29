
'use client';

import React from 'react';
import { useQRSettings } from '@/hooks/useQRSettings';
import { StepContent } from '@/components/steps/StepContent';

export default function ContentPage() {
    const { settings, updateSettings } = useQRSettings();
    const isDark = settings.theme === 'dark';

    return (
        <StepContent
            settings={settings}
            onUpdate={updateSettings}
            isDark={isDark}
        />
    );
}
