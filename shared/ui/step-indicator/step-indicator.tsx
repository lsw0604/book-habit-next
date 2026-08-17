import { cva } from 'class-variance-authority';
import { Check } from 'lucide-react';

import { cn } from '@/shared/utils/class-name';

import type { StepIndicatorProps } from './types';

const stepCircleVariants = cva(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
  {
    variants: {
      state: {
        complete: 'border-primary bg-primary text-primary-foreground',
        current: 'border-primary bg-white text-primary ring-2 ring-primary/20',
        upcoming: 'border-gray-200 bg-white text-gray-400',
      },
    },
    defaultVariants: {
      state: 'upcoming',
    },
  }
);

const stepLabelVariants = cva('text-xs transition-colors', {
  variants: {
    state: {
      complete: 'text-gray-500',
      current: 'font-semibold text-foreground',
      upcoming: 'text-gray-400',
    },
  },
  defaultVariants: {
    state: 'upcoming',
  },
});

function getStepState(index: number, currentIndex: number) {
  if (index < currentIndex) return 'complete' as const;
  if (index === currentIndex) return 'current' as const;
  return 'upcoming' as const;
}

export function StepIndicator({
  steps,
  currentIndex,
  onStepSelect,
  className,
}: StepIndicatorProps) {
  return (
    <ol className={cn('flex w-full items-start', className)}>
      {steps.map((step, index) => {
        const state = getStepState(index, currentIndex);
        const isSelectable = !!onStepSelect && index < currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className={cn('flex items-start', !isLast && 'flex-1')}
          >
            <button
              type="button"
              onClick={isSelectable ? () => onStepSelect(index) : undefined}
              disabled={!isSelectable}
              aria-current={state === 'current' ? 'step' : undefined}
              className="flex flex-col items-center gap-1.5 disabled:cursor-default"
            >
              <span className={cn(stepCircleVariants({ state }))}>
                {state === 'complete' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span className={cn(stepLabelVariants({ state }))}>
                {step.label}
              </span>
            </button>
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  'mx-2 mt-4 h-px flex-1',
                  index < currentIndex ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
