import { cva } from 'class-variance-authority';

export const inputContainerVariants = cva(
  'group relative flex w-full h-10 items-center rounded-lg border-2 bg-white transition-all duration-200',
  {
    variants: {
      state: {
        default: [
          'border-slate-600',
          'hover:border-slate-700',
          'hover:ring-2',
          'hover:ring-slate-400/50',
          'focus-within:border-slate-800',
          'focus-within:ring-2',
          'focus-within:ring-slate-600/60',
        ],
        error: [
          'border-rose-300',
          'hover:border-rose-400',
          'hover:ring-2',
          'hover:ring-rose-400/30',
          'focus-within:border-rose-600',
          'focus-within:ring-2',
          'focus-within:ring-rose-600/60',
        ],
        disabled: 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export const inputVariants = cva(
  'w-full px-11 py-2 text-sm bg-transparent outline-none transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'text-slate-900 placeholder:text-slate-400',
        error: 'text-rose-300 placeholder:text-rose-300',
        disabled:
          'text-slate-400 placeholder:text-slate-300 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export const inputIconVariants = cva('transition-colors duration-200', {
  variants: {
    state: {
      default: [
        'stroke-slate-600',
        'group-hover:stroke-slate-700',
        'group-focus-within:stroke-slate-800',
      ],

      error: [
        'stroke-rose-300',
        'group-hover:stroke-rose-400',
        'group-focus-within:stroke-rose-600',
      ],
      disabled: 'stroke-slate-200',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
