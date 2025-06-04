import { CalendarIcon } from 'lucide-react';
import { ko } from 'date-fns/locale';
import { InputDatepickerProps } from './model/types';
import { useInputDatePicker } from './lib/useInputDatepicker';
import { Button } from '../../button';
import { Calendar } from '../../calendar';
import { ErrorMessage } from '../../error-message';
import Popover from '@/shared/common/popover';
import { cn } from '@/shared/utils/class-name';

export default function InputDatepicker({
  onChange,
  value,
  className,
}: InputDatepickerProps) {
  const {
    date,
    yearRef,
    monthRef,
    dayRef,
    handleInputChange,
    isMonthInvalid,
    isDayInvalidBasic,
    isDateCompositionInvalid,
    defaultCalendarMonth,
  } = useInputDatePicker({ onChange, value });

  return (
    <>
      <div
        className={cn(
          'flex w-full h-10 text-sm border border-input rounded-md justify-center items-center',
          className
        )}
      >
        <div className="flex-1 flex items-center">
          <Popover>
            <Popover.Trigger>
              <Button type="button" variant="none" className="p-2">
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content className="p-0 z-9999">
              <Calendar
                defaultMonth={defaultCalendarMonth}
                initialFocus
                locale={ko}
                mode="single"
                selected={value}
                onSelect={onChange}
              />
            </Popover.Content>
          </Popover>
          <div className="inline-flex justify-center items-center mr-auto ml-auto">
            <input
              id="year"
              type="text"
              ref={yearRef}
              value={date.year || ''}
              onChange={handleInputChange}
              placeholder="YYYY"
              maxLength={4}
              autoComplete="off"
              className="border-none w-8 focus:outline-none py-2 box-border text-center h-full text-gray-700"
            />
            <span
              className={cn(
                'text-gray-400 py-2',
                date.year !== '' && 'text-gray-700'
              )}
            >
              년
            </span>
            <input
              id="month"
              type="text"
              ref={monthRef}
              value={date.month || ''}
              onChange={handleInputChange}
              placeholder="MM"
              maxLength={2}
              autoComplete="off"
              className="border-none w-7 focus:outline-none py-2 box-border text-center h-full"
            />
            <span
              className={cn(
                'text-gray-400 py-2',
                date.month !== '' && 'text-gray-700'
              )}
            >
              월
            </span>
            <input
              id="day"
              type="text"
              ref={dayRef}
              value={date.day || ''}
              onChange={handleInputChange}
              placeholder="DD"
              maxLength={2}
              autoComplete="off"
              className="border-none w-7 focus:outline-none py-2 box-border text-center h-full"
            />
            <span
              className={cn(
                'text-gray-400 py-2',
                date.day !== '' && 'text-gray-700'
              )}
            >
              일
            </span>
          </div>
        </div>
      </div>
      {isMonthInvalid && (
        <ErrorMessage className="ml-auto mr-auto">
          Month는 01~12월 사이의 값을 입력해야합니다.
        </ErrorMessage>
      )}
      {isDayInvalidBasic && (
        <ErrorMessage className="ml-auto mr-auto">
          Day는 01~31일 사이의 값을 입력해야 합니다.
        </ErrorMessage>
      )}
      {isDateCompositionInvalid && (
        <ErrorMessage className="ml-auto mr-auto">
          {date.year}년 {date.month}월 {date.day}일은 유효하지 않은 날짜입니다.
        </ErrorMessage>
      )}
    </>
  );
}
