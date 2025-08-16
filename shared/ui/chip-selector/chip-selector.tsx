import { cva } from 'class-variance-authority';

import { cn } from '@/shared/utils/class-name';

import type { ChipSelectorOption } from './types';

interface ChipSelectorProps<T extends string | number> {
  options: ChipSelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

const chipSelectorButtonVariants = cva(
  'px-3 py-1.5 rounded-full border transition-colors duration-200',
  {
    variants: {
      selected: {
        true: 'bg-primary text-primary-foreground',
        false: 'hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export default function ChipSelector<T extends string | number>({
  options,
  value,
  onChange,
  className,
}: ChipSelectorProps<T>) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map(option => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(chipSelectorButtonVariants({ selected: isSelected }))}
          >
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
