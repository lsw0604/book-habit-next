import { type InputHTMLAttributes, useState, forwardRef } from 'react';

import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/class-name';

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  setValue: (value: string) => void;
  stepTime: (value: number) => void;
  value: string;
  max: number;
  label: string;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      id,
      label,
      value,
      className,
      setValue,
      onRightFocus,
      onLeftFocus,
      stepTime,
      max,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = useState<boolean>(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
      if (e.key === 'ArrowDown') stepTime(-1);
      if (e.key === 'ArrowUp') stepTime(1);

      if (e.key >= '0' && e.key <= '9') {
        let newValue = !flag ? `0${e.key}` : value.slice(1) + e.key;

        if (parseInt(newValue, 10) > max) {
          newValue = max.toString().padStart(2, '0');
        }

        setValue(newValue);
        if (flag) {
          onRightFocus?.();
        }
        setFlag(prev => !prev);
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      e.preventDefault();

    return (
      <div className="space-y-0">
        <input
          id={id}
          ref={ref}
          value={value}
          type="tel"
          inputMode="decimal"
          className={cn(
            'w-8 h-full',
            'tabular-nums caret-transparent text-center',
            '[&::-webkit-inner-spin-button]:appearance-none',
            'focus:ring-offset-0 focus:ring-0 focus:outline-none focus:border-none focus:bg-slate-100 rounded-sm',
            className
          )}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          {...props}
        />
        <Label htmlFor={id} className="text-xs font-semibold">
          {label}
        </Label>
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
