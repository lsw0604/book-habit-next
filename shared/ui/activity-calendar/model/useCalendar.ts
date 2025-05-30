'use client';

import { useCallback, useMemo, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

interface CalendarState {
  readonly year: number;
  readonly month: number;
  readonly date: Dayjs;
  readonly firstDayOfWeek: number;
  readonly daysInMonth: readonly Date[];
}

interface UseCalendarOptions {
  initialDate?: string | Date;
  locale?: string;
}

export const useCalendar = ({
  initialDate,
  locale = 'ko',
}: UseCalendarOptions = {}) => {
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs(initialDate || new Date())
  );

  const calendarState = useMemo((): CalendarState => {
    const year = currentDate.year();
    const month = currentDate.month() + 1;
    const firstDay = currentDate.startOf('month');
    const lastDay = currentDate.endOf('month');
    const firstDayOfWeek = firstDay.day();

    const daysInMonth: Date[] = [];
    for (
      let d = firstDay;
      d.isBefore(lastDay) || d.isSame(lastDay, 'day');
      d = d.add(1, 'day')
    ) {
      daysInMonth.push(d.toDate());
    }

    return {
      year,
      month,
      date: currentDate,
      firstDayOfWeek,
      daysInMonth: Object.freeze(daysInMonth),
    };
  }, [currentDate]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev =>
      direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month')
    );
  }, []);

  const navigateToToday = useCallback(() => {
    setCurrentDate(dayjs());
  }, []);

  const navigateToDate = useCallback((date: string | Date | Dayjs) => {
    setCurrentDate(dayjs(date));
  }, []);

  return {
    calendarState,
    navigateMonth,
    navigateToToday,
    navigateToDate,
    currentDate,
  };
};
