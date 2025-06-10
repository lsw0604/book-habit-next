import { type ComponentType, useContext } from 'react';
import { type DayComponentProps, CalendarContext } from '../model';
import { getDate, getDay, isSameDay } from 'date-fns';
import { cn } from '@/shared/utils/class-name';

interface CalendarDayProps<T> {
  readonly date: Date;
  readonly data?: readonly T[];
  readonly isToday?: boolean;
  readonly DayComponent?: ComponentType<DayComponentProps<T>>;
}

export const CalendarDay = <T,>({
  date,
  data,
  isToday,
  DayComponent,
}: CalendarDayProps<T>) => {
  const { onDateClick, selectedDate } = useContext(CalendarContext);

  const dayNumber = getDate(date);
  const dayOfWeek = getDay(date);
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  const isSelectedDate = selectedDate ? isSameDay(selectedDate, date) : false;

  return (
    <div
      className={cn(
        'p-1 cursor-pointer aspect-square bg-gray-50 rounded-md m-0.5 border-2',
        isToday && 'bg-gray-200 font-bold rounded-md',
        isSaturday && 'text-blue-500',
        isSunday && 'text-rose-500',
        isSelectedDate && 'border-2 border-solid border-black font-bold'
      )}
      onClick={() => onDateClick?.(date)}
    >
      <div className="text-xs">{dayNumber}</div>
      {DayComponent && <DayComponent date={date} data={data} />}
    </div>
  );
};
