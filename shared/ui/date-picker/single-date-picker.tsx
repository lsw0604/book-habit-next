'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
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
    trigger?: {
      button?: {
        label?: string;
        content?: string;
      };
      content?: string;
    };
    content?: string;
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
        className={cn('w-auto relative', classNames?.trigger?.content)}
      >
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full flex-1 flex items-center px-0',
            classNames?.trigger?.button?.content
          )}
        >
          <div className="p-2">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div
            className={cn(
              'text-sm flex w-full justify-center p-2',
              classNames?.trigger?.button?.label
            )}
          >
            <span>
              {date
                ? dayjs(date).format('YYYY년 MM월 DD일')
                : '날짜를 선택해 주세요.'}
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content className={cn('p-0 z-9999', classNames?.content)}>
        <Calendar
          locale={ko}
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </Popover.Content>
    </Popover>
  );
}
