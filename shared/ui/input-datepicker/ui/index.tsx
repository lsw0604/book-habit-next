import { ko } from 'date-fns/locale';
import { AlertCircle, CalendarIcon, XIcon } from 'lucide-react';
import { forwardRef, useId, useMemo } from 'react';

import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { ErrorMessage } from '@/shared/ui/error-message';
import {
  inputContainerVariants,
  inputIconVariants,
  inputVariants,
} from '@/shared/ui/input/style';
import { Label } from '@/shared/ui/label';
import { Popover } from '@/shared/ui/popover';
import { cn } from '@/shared/utils/class-name';

import { useInputDatepicker } from '../hook/useInputDatepicker';
import { INPUT_DATEPICKER_CONSTRAINTS } from '../lib/constants';
import type { DateBounds } from '../lib/validator';
import { calendarBTNVariants, clearBTNVariants } from '../style';

import type { InputDatepickerProps } from './types';

type StateType = 'default' | 'disabled' | 'error';

const DEFAULT_FROM_DATE = new Date(INPUT_DATEPICKER_CONSTRAINTS.MIN_YEAR, 0, 1);
const DEFAULT_TO_DATE = new Date(
  INPUT_DATEPICKER_CONSTRAINTS.MAX_YEAR,
  11,
  31
);

const InputDatepicker = forwardRef<HTMLInputElement, InputDatepickerProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      disabled,
      className,
      errorMessage,
      error: externalError,
      fromDate = DEFAULT_FROM_DATE,
      toDate = DEFAULT_TO_DATE,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    // 호출부가 new Date()를 인라인으로 넘겨도 참조가 흔들리지 않게 고정한다
    const fromTime = fromDate.getTime();
    const toTime = toDate.getTime();
    const bounds = useMemo<DateBounds>(
      () => ({ fromDate: new Date(fromTime), toDate: new Date(toTime) }),
      [fromTime, toTime]
    );

    const {
      error,
      dateStr,
      hasError,
      handleClearDate,
      handleInputChange,
      handleCalendarSelect,
    } = useInputDatepicker({ onChange, value, bounds, externalError });

    let state: StateType = 'default';

    if (disabled) {
      state = 'disabled';
    } else if (hasError) {
      state = 'error';
    }
    const finalErrorMessage = error || errorMessage;
    const showErrorMessage = hasError && !!finalErrorMessage;

    return (
      <div className={cn('w-full space-y-1', className)}>
        {label && (
          <Label htmlFor={inputId} className="text-xs ml-1 font-bold">
            {label}
          </Label>
        )}
        <div className={inputContainerVariants({ state })}>
          <div className="absolute inset-y-0 left-0 flex items-center justify-center">
            <Popover>
              <Popover.Trigger>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  aria-label="달력 열기"
                  className={calendarBTNVariants({
                    state: disabled ? 'disabled' : 'default',
                  })}
                >
                  <CalendarIcon
                    size={16}
                    className={inputIconVariants({ state })}
                  />
                </Button>
              </Popover.Trigger>
              <Popover.Content className="p-0 z-50 shadow-lg border border-slate-200 rounded-lg bg-white">
                <Calendar
                  locale={ko}
                  initialFocus
                  mode="single"
                  selected={value}
                  defaultMonth={value}
                  onSelect={handleCalendarSelect}
                  fromDate={bounds.fromDate}
                  toDate={bounds.toDate}
                  className="rounded-lg"
                />
              </Popover.Content>
            </Popover>
          </div>
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            placeholder="YYYY-MM-DD"
            className={inputVariants({ state, hasIcon: true })}
            value={dateStr}
            onChange={handleInputChange}
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={hasError}
            aria-describedby={showErrorMessage ? errorId : undefined}
            {...props}
          />
          {hasError && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <AlertCircle size={16} className={inputIconVariants({ state })} />
            </div>
          )}
          {value && !hasError && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <Button
                type="button"
                variant="none"
                size="icon"
                disabled={disabled}
                aria-label="날짜 지우기"
                className={clearBTNVariants({
                  state: disabled ? 'disabled' : 'default',
                })}
                onClick={handleClearDate}
              >
                <XIcon size={16} />
              </Button>
            </div>
          )}
        </div>
        {showErrorMessage && (
          <ErrorMessage id={errorId}>{finalErrorMessage}</ErrorMessage>
        )}
      </div>
    );
  }
);

InputDatepicker.displayName = 'InputDatepicker';

export default InputDatepicker;
