'use client';

import { ComponentType, useCallback, useState, useMemo, FC } from 'react';
import dayjs from 'dayjs';

import CalendarHeader from './calendar-header';
import CalendarDateBox from './calendar-date-box';

import { cn } from '@/lib/utils';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';

interface ICalendarProps {
  calendar: CalendarType;
  onChange?: (ctx: number) => void;
}

export interface CalendarProps<T> extends ICalendarProps {
  startDate?: Date;
  endDate?: Date;
  obj?: Record<string, T>;
  component?: ComponentType<DateBoxType<T>>;
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

const Calendar: FC<CalendarProps<undefined | MyBookHistoryListType>> = ({
  calendar,
  onChange,
  endDate,
  startDate,
  obj,
  component: Component,
}) => {
  // const [calendarState, setCalendarState] = useState<CalendarType>(
  //   getCalendarDetail(dayjs().format())
  // );

  // const onChangeCalendarState = useCallback(
  //   (update: number) => {
  //     setCalendarState((prev) => getNewCalendar(prev, update));
  //   },
  //   [calendar]
  // );

  // const gridRow = useMemo(
  //   () => Math.ceil((calendarState.firstDOW + calendarState.lastDate) / 7),
  //   [calendarState]
  // );

  const gridRow = useMemo(
    () => Math.ceil((calendar.firstDOW + calendar.lastDate) / 7),
    [calendar]
  );

  return (
    <>
      <CalendarHeader
        // onChange={onChangeCalendarState}
        onChange={onChange && onChange}
        startDate={startDate}
        endDate={endDate}
        // month={calendarState.month}
        // year={calendarState.year}
        month={calendar.month}
        year={calendar.year}
      />
      <div
        className={cn(
          GRID_ROW_OBJ[gridRow],
          'w-full h-full grid grid-cols-7 gap-0'
        )}
      >
        <CalendarDateBox
          // colStart={calendarState.firstDOW + 1}
          // year={calendarState.year}
          // month={calendarState.month}
          colStart={calendar.firstDOW + 1}
          year={calendar.year}
          month={calendar.month}
          date={1}
          endDate={endDate}
          startDate={startDate}
        >
          {obj && Component && (
            <Component
              key={1}
              date={1}
              // month={parseInt(calendarState.month)}
              // year={parseInt(calendarState.year)}
              month={parseInt(calendar.month)}
              year={parseInt(calendar.year)}
              obj={obj}
            />
          )}
        </CalendarDateBox>
        {[...Array(calendar.lastDate)].map((_, i) =>
          i > 0 ? (
            <CalendarDateBox
              key={i}
              year={calendar.year}
              month={calendar.month}
              date={i + 1}
              endDate={endDate}
              startDate={startDate}
            >
              {obj && Component && (
                <Component
                  key={i}
                  date={i + 1}
                  month={parseInt(calendar.month)}
                  year={parseInt(calendar.year)}
                  obj={obj}
                />
              )}
            </CalendarDateBox>
          ) : null
        )}
      </div>
    </>
  );
};

export default Calendar;
