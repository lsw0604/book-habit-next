'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const spinnerVariants = cva(
  'relative inline-block border-solid rounded-full animate-spin border-t-transparent',
  {
    variants: {
      size: {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  statusText?: string;
}

export function Spinner({
  size,
  className,
  statusText = 'Loading...',
}: SpinnerProps) {
  return (
    <div role="status" className={cn(spinnerVariants({ size, className }))}>
      <span className="sr-only">{statusText}</span>
    </div>
  );
}
