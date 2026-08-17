import { type InputHTMLAttributes, useState, forwardRef } from 'react';

import { cn } from '@/shared/utils/class-name';

import { EMPTY_SEGMENT } from '../hooks/useTimepicker';

interface TimeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  setValue: (value: string) => void;
  stepTime: (value: number) => void;
  value: string;
  max: number;
}

/** 키 입력을 직접 해석하므로 브라우저 기본 입력은 무시한다 */
const ignoreNativeChange = () => {};

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      id,
      value,
      className,
      setValue,
      onRightFocus,
      onLeftFocus,
      stepTime,
      max,
      disabled,
      ...props
    },
    ref
  ) => {
    /** 두 자리 중 첫 자리를 이미 눌렀는지 */
    const [isSecondDigit, setIsSecondDigit] = useState<boolean>(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();

      if (disabled) return;

      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
      if (e.key === 'ArrowDown') stepTime(-1);
      if (e.key === 'ArrowUp') stepTime(1);

      // 지우기: 해당 칸만 00으로 되돌리고 다시 첫 자리부터 받는다
      if (e.key === 'Backspace' || e.key === 'Delete') {
        setValue('00');
        setIsSecondDigit(false);
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        const previousDigit =
          value === EMPTY_SEGMENT ? '0' : value.slice(1) || '0';
        let newValue = isSecondDigit ? previousDigit + e.key : `0${e.key}`;

        if (parseInt(newValue, 10) > max) {
          newValue = max.toString().padStart(2, '0');
        }

        setValue(newValue);
        if (isSecondDigit) {
          onRightFocus?.();
        }
        setIsSecondDigit(prev => !prev);
      }
    };

    /**
     * 포커스가 돌아왔을 때 다시 첫 자리부터 받는다.
     * 초기화하지 않으면 한 자리만 누르고 다른 칸에 갔다 온 뒤
     * 두 번째 자리부터 입력되는 상태가 남는다.
     */
    const handleFocus = () => setIsSecondDigit(false);

    return (
      <input
        id={id}
        ref={ref}
        value={value}
        type="tel"
        inputMode="numeric"
        disabled={disabled}
        className={cn(
          'w-8 h-full',
          'tabular-nums caret-transparent text-center',
          'bg-transparent',
          '[&::-webkit-inner-spin-button]:appearance-none',
          'focus:ring-offset-0 focus:ring-0 focus:outline-none focus:border-none focus:bg-slate-100 rounded-sm',
          'disabled:cursor-not-allowed',
          className
        )}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onChange={ignoreNativeChange}
        {...props}
      />
    );
  }
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
