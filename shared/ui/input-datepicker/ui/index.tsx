import type { InputDatepickerProps } from './types';
import { forwardRef } from 'react';
import { ko } from 'date-fns/locale';
import { AlertCircle, CalendarIcon, XIcon } from 'lucide-react';

import { Popover } from '@/shared/common/popover';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { ErrorMessage } from '@/shared/ui/error-message';
import { cn } from '@/shared/utils/class-name';
import {
  inputContainerVariants,
  inputIconVariants,
  inputVariants,
} from '@/shared/ui/input/style';

import { useInputDatepicker } from '../hook/useInputDatepicker';
import { DATE_CONSTRAINTS } from '../lib/constants';
import { calendarBTNVariants, clearBTNVariants } from '../style';

const InputDatepicker = forwardRef<HTMLInputElement, InputDatepickerProps>(
  (
    { className, disabled, value, onChange, error: externalError, ...props },
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
    const state = disabled ? 'disabled' : hasError ? 'error' : 'default';

    return (
      <div className={cn('w-full space-y-1', className)}>
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
                  fromDate={new Date(DATE_CONSTRAINTS.MIN_YEAR, 0, 1)}
                  toDate={new Date()}
                  className="rounded-lg"
                />
              </Popover.Content>
            </Popover>
          </div>
          <input
            ref={ref}
            disabled={disabled}
            placeholder="YYYY-MM-DD"
            className={inputVariants({ state })}
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
        {error && (
          <ErrorMessage className="text-xs px-1 animate-in slide-in-from-top-1 duration-200">
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  }
);

InputDatepicker.displayName = 'InputDatepicker';

export default InputDatepicker;
