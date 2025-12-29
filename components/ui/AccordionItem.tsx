
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
    value: string;
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isDark?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, label, icon: Icon, children, isDark = false }) => (
    <Accordion.Item value={value} className={`border-b border-current border-opacity-5 overflow-hidden transition-all ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.01]'}`}>
        <Accordion.Header className="flex">
            <Accordion.Trigger className={`group flex h-16 flex-1 cursor-pointer items-center justify-between px-6 text-left transition-all hover:bg-current hover:bg-opacity-[0.03]`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-white/5' : 'bg-black/5'} group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-tight uppercase tracking-widest opacity-80">{label}</span>
                </div>
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180 opacity-40" />
            </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="AccordionContent">
            <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
                {children}
            </div>
        </Accordion.Content>
    </Accordion.Item>
);
