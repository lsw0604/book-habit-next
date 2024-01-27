'use client';

import { cn } from '@/lib/utils';
import {
  getCalendarDetail,
  getUpdatedCalendar,
  getNewCalendar,
} from '@/utils/calendar';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import CalendarDateBox from './calendar-date-box';
import CalendarHeader from './calendar-header';
import clsx from 'clsx';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

export default function Calendar() {
  const [calendarState, setCalendarState] = useState<CalendarType>(
    getCalendarDetail(dayjs().format())
  );

  const onChangeCalendarState = (update: number) => {
    setCalendarState((prev) => getNewCalendar(prev, update));
  };

  const gridRow = Math.ceil(
    (calendarState.firstDOW + calendarState.lastDate) / 7
  );

  return (
    <div className="w-full h-auto px-4 flex flex-col">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg">
        <CalendarHeader
          year={calendarState.year}
          month={calendarState.month}
          onChange={onChangeCalendarState}
        />
        <div
          className={clsx(
            `grid-rows-${gridRow}`,
            'w-full h-full grid grid-cols-7'
          )}
        >
          <CalendarDateBox date={1} colStart={calendarState.firstDOW + 1} />
          {[...Array(calendarState.lastDate)].map((_, i) =>
            i > 0 ? <CalendarDateBox key={i} date={i + 1} /> : null
          )}
        </div>
      </div>
    </div>
  );
}
