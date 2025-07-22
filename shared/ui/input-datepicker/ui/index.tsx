import { ko } from 'date-fns/locale';
import { AlertCircle, CalendarIcon, XIcon } from 'lucide-react';
import { forwardRef } from 'react';

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
import { calendarBTNVariants, clearBTNVariants } from '../style';

import type { InputDatepickerProps } from './types';

type StateType = 'default' | 'disabled' | 'error';

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
      ...props
    },
    ref
  ) => {
    const {
      error,
      dateStr,
      hasError,
      handleClearDate,
      handleInputChange,
      handleCalendarSelect,
    } = useInputDatepicker({ onChange, value, externalError });
    let state: StateType = 'default';

    if (disabled) {
      state = 'disabled';
    } else if (hasError) {
      state = 'error';
    }
    const finalErrorMessage = error || errorMessage;

    return (
      <div className={cn('w-full space-y-1', className)}>
        {label && (
          <Label htmlFor={id} className="text-xs ml-1 font-bold">
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
                  fromDate={
                    new Date(INPUT_DATEPICKER_CONSTRAINTS.MIN_YEAR, 0, 1)
                  }
                  toDate={new Date()}
                  className="rounded-lg"
                />
              </Popover.Content>
            </Popover>
          </div>
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            placeholder="YYYY-MM-DD"
            className={inputVariants({ state, hasIcon: true })}
            value={dateStr}
            onChange={handleInputChange}
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
        {hasError && finalErrorMessage && (
          <ErrorMessage>{finalErrorMessage}</ErrorMessage>
        )}
      </div>
    );
  }
);

InputDatepicker.displayName = 'InputDatepicker';

export default InputDatepicker;
