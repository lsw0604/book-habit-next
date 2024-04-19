'use client';

import { ComponentType, useCallback, useState, useMemo } from 'react';
import dayjs from 'dayjs';

import CalendarHeader from './calendar-header';
import CalendarDateBox from './calendar-date-box';

import { cn } from '@/lib/utils';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';

interface CalendarProps {
  startDate?: Date;
  endDate?: Date;
  history?: MyBookPageQueriesHistoryListType;
  component: ComponentType<DateBoxType>;
}

const GRID_ROW_OBJ: {
  [key: number]: string;
} = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
};

export default function Calendar({
  endDate,
  startDate,
  history,
  component: Component,
}: CalendarProps) {
  const [calendarState, setCalendarState] = useState<CalendarType>(
    getCalendarDetail(dayjs().format())
  );

  const onChangeCalendarState = useCallback(
    (update: number) => {
      setCalendarState((prev) => getNewCalendar(prev, update));
    },
    [calendarState]
  );

  const gridRow = useMemo(
    () => Math.ceil((calendarState.firstDOW + calendarState.lastDate) / 7),
    [calendarState]
  );

  return (
    <>
      <CalendarHeader
        onChange={onChangeCalendarState}
        startDate={startDate}
        endDate={endDate}
        month={calendarState.month}
        year={calendarState.year}
      />
      <div
        className={cn(
          GRID_ROW_OBJ[gridRow],
          'w-full h-full grid grid-cols-7 gap-0'
        )}
      >
        <CalendarDateBox
          colStart={calendarState.firstDOW + 1}
          year={calendarState.year}
          month={calendarState.month}
          date={1}
          endDate={endDate}
          startDate={startDate}
        >
          {history && (
            <Component
              key={1}
              date={1}
              month={parseInt(calendarState.month)}
              year={parseInt(calendarState.year)}
              history={history}
            />
          )}
        </CalendarDateBox>
        {[...Array(calendarState.lastDate)].map((_, i) =>
          i > 0 ? (
            <CalendarDateBox
              key={i}
              year={calendarState.year}
              month={calendarState.month}
              date={i + 1}
              endDate={endDate}
              startDate={startDate}
            >
              {history && (
                <Component
                  key={i}
                  date={i + 1}
                  month={parseInt(calendarState.month)}
                  year={parseInt(calendarState.year)}
                  history={history}
                />
              )}
            </CalendarDateBox>
          ) : null
        )}
      </div>
    </>
  );
}
