import { cva } from 'class-variance-authority';

export const calendarBTNVariants = cva(
  'flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-slate-100',
  {
    variants: {
      state: {
        default: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export const clearBTNVariants = cva(
  'flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-slate-300 hover:text-slate-800 active:scale-96',
  {
    variants: {
      state: {
        default: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);
