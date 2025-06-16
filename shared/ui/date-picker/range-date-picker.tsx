'use client';

import { ko } from 'date-fns/locale';
import { format, isSameDay } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Calendar } from '@/shared/ui/calendar';
import { Button } from '@/shared/ui/button';
import Popover from '@/shared/common/popover';
import { cn } from '@/shared/utils/class-name';

interface RangeDatePickerProps {
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler;
  classNames?: {
    popover?: {
      wrapper?: string;
      trigger?: string;
      button?: string;
      content?: string;
    };
    trigger?: {
      button?: {
        label?: string;
        span?: string;
      };
    };
  };
  numberOfMonths?: number;
}

export default function RangeDatePicker({
  date,
  setDate,
  classNames,
  numberOfMonths = 2,
}: RangeDatePickerProps) {
  return (
    <Popover
      className={cn('inline-block relative', classNames?.popover?.wrapper)}
    >
      <Popover.Trigger
        className={cn('w-auto relative', classNames?.popover?.trigger)}
      >
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full flex-1 flex items-center px-0',
            classNames?.popover?.button
          )}
        >
          <div className="p-2">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div
            className={cn(
              'flex w-full justify-center p-2',
              classNames?.trigger?.button?.label
            )}
          >
            <span className={cn('text-sm', classNames?.trigger?.button?.span)}>
              {date?.from ? (
                date.to && isSameDay(date.from, date.to) ? (
                  format(date.from, 'yyyy년 MM월 dd일')
                ) : (
                  <>
                    {`${format(date.from, 'yyyy년 MM월 dd일')} - ${
                      date.to
                        ? format(date.to, 'yyyy년 MM월 dd일')
                        : '종료 날짜 선택'
                    }`}
                  </>
                )
              ) : (
                <span>날짜를 선택해 주세요.</span>
              )}
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className={cn('p-0 z-9999', classNames?.popover?.content)}
      >
        <Calendar
          locale={ko}
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={numberOfMonths}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
}
