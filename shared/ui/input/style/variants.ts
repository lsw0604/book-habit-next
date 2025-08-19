import { cva } from 'class-variance-authority';

export const inputContainerVariants = cva(
  'group relative flex w-full h-10 border items-center border-input rounded-lg bg-transparent transition-all duration-200',
  {
    variants: {
      state: {
        default: [
          'focus-within:border-ring',
          'focus-within:ring-slate-800/60',
          'focus-within:ring-[3px]',
        ],
        error: [
          'border-rose-300',
          'focus-within:border-rose-400',
          'focus-within:ring-2',
          'focus-within:ring-rose-400/30',
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
  'w-full py-1 text-sm bg-transparent outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  {
    variants: {
      state: {
        default: 'text-slate-900 placeholder:text-slate-400',
        error: 'text-rose-300 placeholder:text-rose-300',
        disabled:
          'text-slate-400 placeholder:text-slate-300 cursor-not-allowed',
      },
      hasIcon: {
        true: 'pl-10 pr-2',
        false: 'px-2',
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
      error: ['stroke-rose-300', 'group-focus-within:stroke-rose-400'],
      disabled: 'stroke-slate-200',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
