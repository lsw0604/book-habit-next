import { ComponentType, createContext, useContext } from 'react';

import { DayComponentProps } from '../types';

import { useCalendar } from './useCalendar';

export type CalendarContextValue<T> = ReturnType<typeof useCalendar> & {
  onTodayClick?: () => void;
  onDateClick?: (date: Date) => void;
  data?: Record<string, readonly T[]>;
  selectedDate?: Date | null;
  DayComponent?: ComponentType<DayComponentProps<T>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CalendarContext = createContext<CalendarContextValue<any> | null>(
  null
);

export const useCalendarContext = <T>() => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext는 CalendarContextProvider 내부에서 사용해야 합니다.'
    );
  }
  return context as CalendarContextValue<T>;
};
