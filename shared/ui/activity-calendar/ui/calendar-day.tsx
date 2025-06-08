'use client';

import { getDate, getDay } from 'date-fns';
import { CalendarDayProps } from '../model/types';
import { cn } from '@/shared/utils/class-name';

export const CalendarDay = <T,>({
  date,
  data,
  isToday,
  onDateClick,
  DayComponent,
}: CalendarDayProps<T>) => {
  const dayNumber = getDate(date);
  const dayOfWeek = getDay(date);
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  return (
    <div
      className={cn(
        'p-1 cursor-pointer aspect-square bg-gray-50 rounded-md m-0.5',
        isToday && 'bg-gray-200 font-bold rounded-md',
        isSaturday && 'text-blue-500',
        isSunday && 'text-rose-500'
      )}
      onClick={() => onDateClick?.(date, data)}
    >
      <div className="text-xs">{dayNumber}</div>
      {DayComponent && <DayComponent date={date} data={data} />}
    </div>
  );
};
