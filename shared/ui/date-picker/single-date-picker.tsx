'use client';

import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SelectSingleEventHandler } from 'react-day-picker';

import { Calendar } from '@/shared/ui/calendar';
import { Button } from '@/shared/ui/button';
import Popover from '@/shared/common/popover';
import { cn } from '@/shared/utils/class-name';

interface SingleDatePickerProps {
  date: Date | undefined;
  setDate: SelectSingleEventHandler;
  className?: string;
  classNames?: {
    popover?: {
      triggerWrapper?: string;
      button?: string;
      buttonLabel?: string;
      calendarContent?: string;
    };
  };
}

export default function SingleDatePicker({
  date,
  setDate,
  className,
  classNames,
}: SingleDatePickerProps) {
  return (
    <Popover className={cn('inline-block relative', className)}>
      <Popover.Trigger
        className={cn('w-auto relative', classNames?.popover?.triggerWrapper)}
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
              'text-sm flex w-full justify-center p-2',
              classNames?.popover?.buttonLabel
            )}
          >
            <span>
              {date
                ? format(date, 'yyyy년 MM월 dd일')
                : '날짜를 선택해 주세요.'}
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className={cn('p-0 z-9999', classNames?.popover?.calendarContent)}
      >
        <Calendar
          locale={ko}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
}
