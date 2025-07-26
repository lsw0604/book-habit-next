import { cva } from 'class-variance-authority';

import { cn } from '@/shared/utils/class-name';

import { ModeSwitchProps } from './types';

const modeSwitchVariants = cva(
  'flex mb-6 bg-gray-100 rounded-lg p-1',
  {
    variants: {
      variant: {
        default:
          'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
        on: 'bg-white text-blue-600 shadow-sm',
        off: 'text-gray-600 hover:text-gray-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export default function ModeSwitch<T extends string>({
  options,
  value,
  onValueChange,
  className,
}: ModeSwitchProps<T>) {
  return (
    <div className={cn(modeSwitchVariants({}), className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={cn(
            modeSwitchVariants({ variant: 'default' }),
            value === option.value
              ? modeSwitchVariants({ variant: 'on' })
              : modeSwitchVariants({ variant: 'off' }),
          )}
        >
          <option.icon className="w-4 h-4 inline mr-2" />
          {option.label}
        </button>
      ))}
    </div>
  );
}