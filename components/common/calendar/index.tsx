import React, { ComponentType, ReactNode } from 'react';
import dayjs from 'dayjs';
import { cn } from '@/utils/class-name';
import CalendarDateBox from './calendar-date-box';

const COL_START_OBJ: Record<number, string> = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
};

const DAY_OF_WEEK: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const DayOfWeek = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 text-center before:box-border after:box-border">
      {children}
    </div>
  );
};

interface CustomCalendarProps<T> {
  calendar: CalendarDetailType;
  data?: Record<string, T[]>;
  Component?: ComponentType<{ data: T[] }>;
}

export default function CustomCalendar<T>({
  data,
  calendar,
  Component,
}: CustomCalendarProps<T>) {
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className={cn('w-full grid grid-cols-7 gap-0 overflow-hidden')}>
      {DAY_OF_WEEK.map((day) => (
        <DayOfWeek key={day}>{day}</DayOfWeek>
      ))}
      {calendar.dayArr.map((date, i) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const isToday = formattedDate === today;
        const isSunday = dayjs(date).day() === 0;
        const isSaturday = dayjs(date).day() === 6;
        const day = dayjs(date).format('D');

        return (
          <div
            key={formattedDate}
            className={cn(
              i + 1 === 1 ? COL_START_OBJ[calendar.firstDOW + 1] : undefined,
              'relative w-full pt-full'
            )}
          >
            <CalendarDateBox
              isSaturday={isSaturday}
              isSunday={isSunday}
              isToday={isToday}
              day={day}
            >
              {data && data[formattedDate] && Component && (
                <Component data={data[formattedDate]} />
              )}
            </CalendarDateBox>
          </div>
        );
      })}
    </div>
  );
}
