import React, { ComponentType, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';

import CalendarDateBox from './calendar-date-box';
import CalendarHeader from './calendar-header';

import { cn } from '@/shared/utils/class-name';
import { DAY_OF_WEEK } from '@/constant/calendar';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Skeleton } from '@/shared/ui/skeleton';

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
      <div className={cn('w-full grid grid-cols-7 gap-0 overflow-hidden p-1')}>
        {DAY_OF_WEEK.map(day => (
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

CustomCalendar.Loader = function () {
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="w-full h-auto flex justify-between p-2">
          <div className="h-10 inline-flex items-center justify-center">
            <ArrowLeftIcon className="w-4 h-4" />
          </div>
          <Skeleton className="w-32 h-10" />
          <div className="h-10 inline-flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4" />
          </div>
          <Skeleton className="w-16 h-10" />
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-7 gap-1 overflow-hidden">
        {DAY_OF_WEEK.map(day => (
          <div
            className="mb-3 before:box-border after:box-border text-center"
            key={day}
          >
            {day}
          </div>
        ))}
        {[...Array(35)].map((_, idx) => (
          <div
            key={`calendar-loader-${idx}`}
            className="w-full pt-full relative"
          >
            <Skeleton className="w-full h-full rounded-lg absolute top-0 left-0" />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
