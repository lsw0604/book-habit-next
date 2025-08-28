'use client';

import { ReactNode, useMemo } from 'react';

import { CalendarContext, useCalendar } from '../hooks';
import { CalendarProps } from '../types';

export function ActivityCalendarProvider<T>({
  children,
  ...props
}: CalendarProps<T> & { children: ReactNode }) {
  const {
    initialDate,
    onDateClick,
    selectedDate,
    DayComponent,
    data,
    onTodayClick,
  } = props;

  const calendarLogic = useCalendar({ initialDate });

  const contextValue = useMemo(
    () => ({
      ...calendarLogic,
      onDateClick,
      selectedDate,
      DayComponent,
      data,
      onTodayClick,
    }),
    [calendarLogic, onDateClick, selectedDate, DayComponent, data, onTodayClick]
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}
