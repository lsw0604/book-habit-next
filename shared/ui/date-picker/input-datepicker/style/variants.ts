import { cva } from 'class-variance-authority';

/**
 * TODO CSS 좀 더 견고하게 수정하기
 */
export const datePickerVariants = cva(
  'group relative flex w-full h-10 items-center rounded-lg border-2 bg-white transition-all duration-200',
  {
    variants: {
      state: {
        default: [
          'border-slate-300',
          'hover:border-slate-500',
          'hover:ring-2',
          'hover:ring-slate-500/60',
          'focus-within:border-slate-600',
        ],
        error: [
          'border-rose-300',
          'hover:border-rose-400',
          'hover:ring-2',
          'hover:ring-rose-400/30',
          'focus-within:border-rose-600',
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

export const calendarButtonVariants = cva(
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

export const calendarIconVariants = cva('transition-colors duration-200', {
  variants: {
    state: {
      default:
        'stroke-slate-400 group-hover:stroke-slate-600 group-focus-within:stroke-slate-600',
      error:
        'stroke-rose-300 group-hover:stroke-rose-400 group-focus-within:stroke-rose-600',
      disabled: 'stroke-slate-300',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const clearButtonVariants = cva(
  'flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-slate-300 hover:text-slate-800 active:scale-95',
  {
    variants: {
      state: {
        default: '',
        disabled: 'cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export const clearIconVariants = cva('', {
  variants: {
    size: {
      default: 'h-4 w-4', // lucide-react 기본 사이즈가 24px이므로 16px로 조절
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
