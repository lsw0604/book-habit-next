'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Popover from '@/components/common/popover';
import { cn } from '@/utils/class-name';

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
                dayjs(date.from).format('YYYY년 MM월 DD일') !==
                dayjs(date.to).format('YYYY년 MM월 DD일') ? (
                  <>
                    {`${dayjs(date.from).format('YYYY년 MM월 DD일')} - ${dayjs(
                      date.to
                    ).format('YYYY년 MM월 DD일')}`}
                  </>
                ) : (
                  dayjs(date.from).format('YYYY년 MM월 DD일')
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
