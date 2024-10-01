'use client';

import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Calendar from '@/components/common/calendar';
import CalendarLoader from '@/components/common/calendar/calendar-loader';
import MyBookDetailCalendarDateBox from './my-book-detail-calendar-date-box';

import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';

interface MyBookDetailCalendarProps {
  startDate?: Date;
  endDate?: Date;
  obj: Record<string, MyBookHistoryListType>;
}

interface CalendarProps extends Omit<MyBookDetailCalendarProps, 'obj'> {}

const useCalendar = ({ startDate, endDate }: CalendarProps) => {
  const [calendar, setCalendar] = useState(getCalendarDetail(dayjs().format()));

  const handleCalendar = useCallback(
    (ctx: number) => {
      setCalendar((prev) => getNewCalendar(prev, ctx));
    },
    [calendar]
  );

  useEffect(() => {
    if (!!endDate) {
      setCalendar(getCalendarDetail(dayjs(endDate).format()));
    }
  }, [startDate, endDate]);

  return {
    calendar,
    handleCalendar,
  };
};

export default function MyBookDetailCalendar({
  startDate,
  endDate,
  obj,
}: MyBookDetailCalendarProps) {
  const { calendar, handleCalendar } = useCalendar({ startDate, endDate });

  return (
    <div className="w-full h-auto px-4 mb-4">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg mb-4">
        <Calendar
          calendar={calendar}
          onChange={handleCalendar}
          endDate={endDate}
          startDate={startDate}
          obj={obj}
          component={MyBookDetailCalendarDateBox}
        />
      </div>
    </div>
  );
}

MyBookDetailCalendar.Loader = () => {
  return (
    <div className="w-full h-auto px-4 flex flex-col">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg">
        <CalendarLoader />
      </div>
    </div>
  );
};
