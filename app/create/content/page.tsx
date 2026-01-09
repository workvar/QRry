
'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateSettings } from '@/store/qrSettingsSlice';
import { StepContent } from '@/components/steps/StepContent';
import { useEffect, useState, Suspense } from 'react';
import { getDynamicQRQuota } from '@/app/actions';
import { useSearchParams } from 'next/navigation';

function ContentPageContent() {
    const settings = useAppSelector((state: any) => state.qrSettings);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const isDark = settings.theme === 'dark';
    const [isEditing, setIsEditing] = useState(false);
    const [isDynamic, setIsDynamic] = useState(false);
    const [dynamicQRQuota, setDynamicQRQuota] = useState<{ count: number; limit: number; canCreate: boolean } | null>(null);

    useEffect(() => {
        // Check if we're editing an existing QR code (from URL query or sessionStorage)
        const editParam = searchParams.get('edit');
        
        if (typeof window !== 'undefined') {
            const editingQR = sessionStorage.getItem('editingQR');
            if (editingQR || editParam) {
                try {
                    const parsed = editingQR ? JSON.parse(editingQR) : null;
                    setIsEditing(true);
                    setIsDynamic(parsed?.settings?.isDynamic || false);
                } catch (e) {
                    console.error('Error parsing editing QR:', e);
                }
            }
        }

        // Load dynamic QR quota
        loadDynamicQRQuota();
    }, [searchParams]);

    const loadDynamicQRQuota = async () => {
        try {
            const data = await getDynamicQRQuota();
            setDynamicQRQuota(data);
        } catch (error) {
            console.error('Error loading dynamic QR quota:', error);
        }
    };

    const handleUpdate = (updates: Partial<typeof settings>) => {
        dispatch(updateSettings(updates));
    };

    return (
        <StepContent
            settings={settings}
            onUpdate={handleUpdate}
            isDark={isDark}
            isEditing={isEditing}
            isDynamic={isDynamic}
            dynamicQRQuota={dynamicQRQuota}
        />
    );
}

export default function ContentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContentPageContent />
        </Suspense>
    );
}
