import { getDate, getDay, isSameDay } from 'date-fns';

import { cn } from '@/shared/utils/class-name';

import { useCalendarContext } from '../hooks';
import type { CalendarDayProps } from '../types';

export function ActivityCalendarDay<T>({
  date,
  data,
  isToday,
  DayComponent,
}: CalendarDayProps<T>) {
  const { onDateClick, selectedDate } = useCalendarContext();

  const dayNumber = getDate(date);
  const dayOfWeek = getDay(date);
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  const isSelectedDate = selectedDate ? isSameDay(selectedDate, date) : false;

  return (
    <button
      type="button"
      className={cn(
        'border-0 appearance-none bg-transparent p-0', // 브라우저 설정 초기화
        'p-1 cursor-pointer aspect-square bg-gray-50 rounded-md m-0.5',
        'flex flex-col justify-center',
        'text-left font-bold',
        isToday && 'bg-gray-200',
        isSaturday && 'text-blue-500',
        isSunday && 'text-rose-500',
        isSelectedDate && 'bg-primary text-primary-foreground'
      )}
      onClick={() => onDateClick?.(date)}
    >
      <div className="text-xs">{dayNumber}</div>
      <div className="flex-grow min-h-6">
        {DayComponent && <DayComponent date={date} data={data} />}
      </div>
    </button>
  );
}
