'use client';

import { ComponentType, useCallback, useState, JSX, useMemo } from 'react';
import dayjs from 'dayjs';

import CalendarHeader from './calendar-header';
import CalendarDateBox from './calendar-date-box';

import { cn } from '@/lib/utils';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

interface CalendarProps<T extends JSX.IntrinsicAttributes> {
  component: ComponentType<T>;
  componentProps: T;
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

export default function Calendar<T extends JSX.IntrinsicAttributes>({
  component: Component,
  componentProps,
}: CalendarProps<T>) {
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
    <div className="w-full h-auto px-4 mb-4">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg mb-4">
        <CalendarHeader onChange={onChangeCalendarState} {...calendarState} />
        <div
          className={cn(
            GRID_ROW_OBJ[gridRow],
            'w-full h-full grid grid-cols-7 gap-0:'
          )}
        >
          <CalendarDateBox />
          {[...Array(calendarState.lastDate)].map((_, i) =>
            i > 0 ? <CalendarDateBox /> : null
          )}
        </div>
        <Component {...componentProps} />
      </div>
    </div>
  );
}
