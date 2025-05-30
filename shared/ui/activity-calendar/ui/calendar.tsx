'use client';

import { useCalendar } from '../model/useCalendar';
import { CalendarProps } from '../model/types';
import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { cn } from '@/shared/utils/class-name';

const Calendar = <T,>({
  data,
  DayComponent,
  initialDate,
  className,
  onDateClick,
}: CalendarProps<T>) => {
  const { calendarState, navigateMonth, navigateToToday } = useCalendar({
    initialDate,
  });

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border px-2 py-4',
        className
      )}
    >
      <CalendarHeader
        year={calendarState.year}
        month={calendarState.month}
        onNavigateMonth={navigateMonth}
        onNavigateToToday={navigateToToday}
      />

      <CalendarGrid
        daysInMonth={calendarState.daysInMonth}
        firstDayOfWeek={calendarState.firstDayOfWeek}
        data={data}
        DayComponent={DayComponent}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
