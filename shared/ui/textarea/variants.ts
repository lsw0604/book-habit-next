import { cva, type VariantProps } from 'class-variance-authority';

export const autoSizeTextareaVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none',
  {
    variants: {
      state: {
        default: [
          'focus:border-ring',
          'focus:ring-slate-800/60',
          'focus:ring-[3px]',
        ],
        error: [
          'border-rose-300',
          'focus:border-rose-400',
          'focus:ring-2',
          'focus:ring-rose-400/30',
        ],
        disabled: 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export type AutoSizeTextareaVariants = VariantProps<
  typeof autoSizeTextareaVariants
>;
