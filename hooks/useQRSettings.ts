
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { QRSettings } from '../types';
import { DEFAULT_SETTINGS } from '../lib/defaults';

export const useQRSettings = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const settings = useMemo(() => {
        const config = searchParams.get('config');
        if (!config) return DEFAULT_SETTINGS;
        try {
            const parsed = JSON.parse(decodeURIComponent(atob(config)));
            return { ...DEFAULT_SETTINGS, ...parsed };
        } catch (e) {
            console.error('Failed to parse settings', e);
            return DEFAULT_SETTINGS;
        }
    }, [searchParams]);

    const updateSettings = useCallback((updates: Partial<QRSettings>) => {
        const newSettings = { ...settings, ...updates };
        try {
            const serialized = btoa(encodeURIComponent(JSON.stringify(newSettings)));
            const params = new URLSearchParams(searchParams.toString());
            params.set('config', serialized);

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } catch (e) {
            console.error('Failed to serialize settings', e);
        }
    }, [settings, pathname, router, searchParams]);

    return { settings, updateSettings };
};
