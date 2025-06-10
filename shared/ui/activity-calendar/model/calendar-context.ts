import { createContext } from 'react';

export interface CalendarContextValue {
  onDateClick?: (date: Date) => void;
  selectedDate?: Date | null;
}

export const CalendarContext = createContext<CalendarContextValue>({
  selectedDate: null,
  onDateClick: () => {
    console.warn('CalendarContextProvider가 필요합니다.');
  },
});
