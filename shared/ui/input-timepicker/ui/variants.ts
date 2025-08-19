import { cva } from 'class-variance-authority';

export const timepickerVariants = cva(
  [
    'flex',
    'items-center',
    'w-auto',
    'h-10',
    'px-2',
    'text-xl',
    'text-slate-600',
    'text-center',
    'font-mono',
    'border',
    'rounded-lg',
    'bg-transparent',
    'transition-all',
    'duration-200',
    'focus-within:ring-[3px]',
  ],
  {
    variants: {
      error: {
        true: 'border-destructive text-destructive focus-within:border-destructive focus-within:ring-destructive/60',
        false:
          'border-input focus-within:border-ring focus-within:ring-slate-800/60',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);
