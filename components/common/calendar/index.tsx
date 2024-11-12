import { ComponentType, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';

import CalendarDateBox from './calendar-date-box';
import CalendarHeader from './calendar-header';

import { cn } from '@/utils/class-name';
import { DAY_OF_WEEK } from '@/constant/calendar';

interface CustomCalendarProps<T> {
  calendar: CalendarDetailType;
  setCalendar: Dispatch<SetStateAction<CalendarDetailType>>;
  data?: Record<string, T[]>;
  Component?: ComponentType<{ data?: T[]; date: Date }>;
}

export default function CustomCalendar<T>({
  data,
  calendar,
  Component,
  setCalendar,
}: CustomCalendarProps<T>) {
  return (
    <div className="w-full">
      <CalendarHeader calendar={calendar} setCalendar={setCalendar} />
      <div className={cn('w-full grid grid-cols-7 gap-0 overflow-hidden')}>
        {DAY_OF_WEEK.map((day) => (
          <div
            key={day}
            className="mb-3 text-center before:box-border after:box-border"
          >
            {day}
          </div>
        ))}
        {calendar.dayArr.map((date, index) => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD');
          return (
            <CalendarDateBox
              index={index}
              date={date}
              key={formattedDate}
              firstDow={calendar.firstDOW}
            >
              {Component && (
                <Component
                  data={data ? data[formattedDate] : undefined}
                  date={date}
                />
              )}
            </CalendarDateBox>
          );
        })}
      </div>
    </div>
  );
}
