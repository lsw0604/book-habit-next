'use client';

import { ComponentType, useMemo, FC } from 'react';

import CalendarHeader from './calendar-header';
import CalendarDateBox from './calendar-date-box';

import { cn } from '@/lib/utils';

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

const Calendar: FC<CalendarProps<T>> = ({
  calendar,
  onChange,
  endDate,
  startDate,
  obj,
  component: Component,
}) => {
  const parsedMonth = parseInt(calendar.month);
  const parsedYear = parseInt(calendar.year);

  const gridRow = useMemo(
    () => Math.ceil((calendar.firstDOW + calendar.lastDate) / 7),
    [calendar]
  );

  return (
    <>
      <CalendarHeader
        onChange={onChange && onChange}
        startDate={startDate}
        endDate={endDate}
        month={calendar.month}
        year={calendar.year}
      />
      <div
        className={cn(
          GRID_ROW_OBJ[gridRow],
          'w-full h-full grid grid-cols-7 gap-0'
        )}
      >
        {Array.from({ length: calendar.lastDate }, (_, i) => (
          <CalendarDateBox<>
            key={i}
            year={parsedYear}
            month={parsedMonth}
            date={i}
            endDate={endDate}
            startDate={startDate}
            obj={obj}
            component={Component}
          />
        ))}
      </div>
    </>
  );
};

export default Calendar;
