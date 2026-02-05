import { cva } from 'class-variance-authority';

import { cn } from '@/shared/utils/class-name';

import { ModeSwitchProps } from './types';

const modeSwitchButtonVariants = cva(
  'flex flex-1 flex-col min-w-0 items-center justify-center gap-1 py-2 px-1 text-sm font-medium transition-all rounded-md',
  {
    variants: {
      active: {
        true: 'bg-white text-black shadow-sm',
        false: 'text-gray-400 hover:text-gray-600',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function ModeSwitch<T extends string>({
  options,
  value,
  onValueChange,
  className,
}: ModeSwitchProps<T>) {
  return (
    <div
      className={cn(
        'flex bg-primary-foreground rounded-lg p-1 w-full',
        className
      )}
    >
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={cn(
            modeSwitchButtonVariants({ active: value === option.value })
          )}
        >
          {option.icon && <option.icon className="w-4 h-4" />}
          <span className="w-full truncate">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
