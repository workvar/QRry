'use client';

import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { CreateStep } from '@/data/createStepsData';

interface StepNavigationProps {
  steps: CreateStep[];
  currentStepIndex: number;
}

export function StepNavigation({ steps, currentStepIndex }: StepNavigationProps) {
  return (
    <nav className="flex items-center gap-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className={`flex flex-col gap-1 ${idx <= currentStepIndex ? 'opacity-100' : 'opacity-20'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">Step 0{idx + 1}</span>
            <span className={`text-xs font-bold ${idx === currentStepIndex ? 'text-blue-600' : ''}`}>
              {step.title}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <ChevronDoubleRightIcon className={`w-3 h-3 transition-colors ${
              idx < currentStepIndex ? 'text-blue-600 opacity-60' : 'opacity-20'
            }`} />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
