'use client';

import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import CalendarHeader from './calendar-header';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

export default function Calendar({}) {
  const [calendarState, setCalendarState] = useState<CalendarType>(
    getCalendarDetail(dayjs().format())
  );

  const onChangeCalendarState = useCallback(
    (update: number) => {
      setCalendarState((prev) => getNewCalendar(prev, update));
    },
    [calendarState]
  );

  return (
    <div className="w-full h-auto px-4 mb-4">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg mb-4">
        // !TODO CalendarHeader
      </div>
    </div>
  );
}
