'use client';

import dayjs from 'dayjs';
import { CalendarDayProps } from '../model/types';
import { cn } from '@/shared/utils/class-name';

const CALENDAR_DAY_STYLE = {
  base: 'p-2 cursor-pointer aspect-square',
  on: 'bg-blue-100 text-blue-800 font-bold rounded-full',
  isSaturday: 'bg-gray-200 text-blue-900',
  isSunday: 'bg-gray-200 text-rose-300',
};

export const CalendarDay = <T,>({
  date,
  data,
  isCurrentMonth,
  isToday,
}: CalendarDayProps<T>) => {
  const dayNumber = dayjs(date).date();
  const isSunday = dayjs(date).day() === 0;
  const isSaturday = dayjs(date).day() === 6;

  return (
    <div
      className={cn(
        CALENDAR_DAY_STYLE.base,
        isToday && CALENDAR_DAY_STYLE.on,
        isSaturday && CALENDAR_DAY_STYLE.isSaturday,
        isSunday && CALENDAR_DAY_STYLE.isSunday
      )}
    >
      <div className="text-sm as">{dayNumber}</div>
      {data && data.length > 0 && (
        <div className="flex gap-1 mt-1">
          {data.slice(0, 3).map((_, index) => (
            <div key={index} className="w-2 h-2 bg-blue-500 rounded-full" />
          ))}
          {data.length > 3 && (
            <span className="text-xs text-gray-500">+{data.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};
