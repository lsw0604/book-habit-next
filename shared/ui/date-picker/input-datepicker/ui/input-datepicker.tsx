import type { InputDatepickerProps } from './type';
import { forwardRef } from 'react';
import { CalendarIcon, XIcon } from 'lucide-react';
import { ko } from 'date-fns/locale';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover } from '@/shared/common/popover';
import { cn } from '@/shared/utils/class-name';
import { ErrorMessage } from '@/shared/ui/error-message';
import { DATE_CONSTRAINTS } from '../constants';
import { useInputDatepickerState } from '../hooks';
import {
  datePickerVariants,
  inputVariants,
  clearButtonVariants,
  clearIconVariants,
  calendarButtonVariants,
  calendarIconVariants,
} from '../style/variants';

const InputDatepicker = forwardRef<HTMLInputElement, InputDatepickerProps>(
  (
    {
      className,
      disabled,
      value,
      onChange: onChangeCallback,
      error: externalError,
      ...props
    },
    ref
  ) => {
    const {
      hasError,
      error,
      dateStr,
      handleInputChange,
      handleCalendarSelect,
      handleClearDate,
      getState,
    } = useInputDatepickerState({
      value,
      onChange: onChangeCallback,
      externalError,
    });

    const state = disabled ? 'disabled' : getState();

    return (
      <div className={cn('w-full space-y-1', className)}>
        <div className={datePickerVariants({ state })}>
          <div className="absolute inset-y-0 left-0 flex items-center justify-center">
            <Popover>
              <Popover.Trigger>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  className={calendarButtonVariants({
                    state: disabled ? 'disabled' : 'default',
                  })}
                >
                  <CalendarIcon
                    size={16}
                    className={calendarIconVariants({ state })}
                  />
                </Button>
              </Popover.Trigger>
              <Popover.Content className="p-0 z-50 shadow-lg border border-slate-200 rounded-lg bg-white">
                <Calendar
                  defaultMonth={value}
                  initialFocus
                  locale={ko}
                  mode="single"
                  selected={value}
                  onSelect={handleCalendarSelect}
                  fromDate={new Date(DATE_CONSTRAINTS.MIN_YEAR, 0, 1)}
                  toDate={new Date(DATE_CONSTRAINTS.MAX_YEAR, 11, 31)}
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
          {value && !hasError && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <Button
                type="button"
                variant="none"
                size="icon"
                onClick={handleClearDate}
                disabled={disabled}
                className={cn(
                  clearButtonVariants({
                    state: disabled ? 'disabled' : 'default',
                  })
                )}
              >
                <XIcon size={16} className={clearIconVariants()} />
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

export { InputDatepicker };
