'use client';

import { useCallback, useState } from 'react';

import Calendar from '@/components/common/calendar';
import CalendarLoader from '@/components/common/calendar/calendar-loader';

import MyBookDetailCalendarDateBox from './my-book-detail-calendar-date-box';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import dayjs from 'dayjs';

interface MyBookDetailCalendarProps {
  startDate?: Date;
  endDate?: Date;
  obj: Record<string, MyBookHistoryListType>;
}

function useCalendar() {
  const [calendar, setCalendar] = useState(getCalendarDetail(dayjs().format()));

  const handleCalendar = useCallback(
    (ctx: number) => {
      setCalendar((prev) => getNewCalendar(prev, ctx));
    },
    [calendar]
  );

  return {
    calendar,
    handleCalendar,
  };
}

export default function MyBookDetailCalendar({
  startDate,
  endDate,
  obj,
}: MyBookDetailCalendarProps) {
  // const [calendar, setCalendar] = useState(getCalendarDetail(dayjs().format()));

  // const handleCalendar = useCallback(
  //   (ctx: number) => {
  //     setCalendar((prev) => getNewCalendar(prev, ctx));
  //   },
  //   [calendar]
  // );

  const { calendar, handleCalendar } = useCalendar();

  return (
    <div className="w-full h-auto px-4 mb-4">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg mb-4">
        <Calendar<MyBookHistoryListType>
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
