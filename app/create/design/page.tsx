
'use client';

import React from 'react';
import { useQRSettings } from '@/hooks/useQRSettings';
import { StepDesign } from '@/components/steps/StepDesign';

export default function DesignPage() {
    const { settings, updateSettings } = useQRSettings();
    const isDark = settings.theme === 'dark';

    return (
        <StepDesign
            settings={settings}
            onUpdate={updateSettings}
            isDark={isDark}
        />
    );
}
