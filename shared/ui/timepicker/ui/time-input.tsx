import { cn } from '@/shared/utils/class-name';
import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  setValue: (value: string) => void;
  stepTime: () => void;
  value: string;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    { value, className, setValue, onRightFocus, onLeftFocus, ...props },
    ref
  ) => {
    const [flag, setFlag] = useState<boolean>(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();

      if (e.key >= '0' && e.key <= '9') {
        const newValue = !flag ? '0' + e.key : value.slice(1) + e.key;
        setValue(newValue);
        if (flag) onRightFocus?.();
        setFlag(prev => !prev);
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      e.preventDefault();

    useEffect(() => {}, []);

    return (
      <input
        ref={ref}
        type="tel"
        inputMode="decimal"
        className={cn(
          'w-[48px] h-10 text-3xl text-center font-mono tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        {...props}
      />
    );
  }
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
