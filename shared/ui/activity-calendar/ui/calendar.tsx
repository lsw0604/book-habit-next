'use client';

import {
  type CalendarContextValue,
  type CalendarProps,
  CalendarContext,
  useCalendar,
} from '../model';
import { useMemo } from 'react';
import CalendarHeader from './calendar-header';
import CalendarGrid from './calendar-grid';
import { cn } from '@/shared/utils/class-name';

const Calendar = <T,>({
  data,
  DayComponent,
  initialDate,
  className,
  onDateClick,
  selectedDate,
}: CalendarProps<T>) => {
  const { calendarState, navigateMonth, navigateToToday } = useCalendar({
    initialDate,
  });

  const contextValue: CalendarContextValue = useMemo(() => {
    return {
      selectedDate,
      onDateClick,
    };
  }, [selectedDate, onDateClick]);

  return (
    <CalendarContext.Provider value={contextValue}>
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
        />
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
