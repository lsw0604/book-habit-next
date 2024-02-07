'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import CalendarDateBox from './my-book-detail-calendar-date-box';
import CalendarHeader from './my-book-detail-calendar-header';
import { Skeleton } from '@/components/ui/skeleton';

import { queriesKey } from '@/queries';
import { myBookHistoryAPI } from '@/lib/api/myBook';
import { GRID_ROW_OBJ } from '@/utils/staticData';
import { cn } from '@/lib/utils';
import MyBookDetailCalendarLoader from './my-book-detail-calendar-loader';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

const { history } = queriesKey.myBook.useMyBookPageQueriesKey;

export default function MyBookDetailCalendar() {
  const pathname = usePathname();

  const [calendarState, setCalendarState] = useState<CalendarType>(
    getCalendarDetail(dayjs().format())
  );

  const myBookId = parseInt(
    pathname.split('/')[pathname.split('/').length - 1]
  );

  const { data: historyData, isSuccess } = useQuery(
    [history, myBookId.toString()],
    () => myBookHistoryAPI(myBookId)
  );

  useEffect(() => {
    if (isSuccess && historyData.end_date) {
      setCalendarState(getCalendarDetail(dayjs(historyData.end_date).format()));
    }
  }, [isSuccess, historyData]);

  if (!historyData) return <MyBookDetailCalendarLoader />;

  const { books, end_date, start_date } = historyData;

  const startDate = start_date
    ? dayjs(start_date).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;
  const endDate = end_date
    ? dayjs(end_date).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;

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
          startDate={startDate}
          endDate={endDate}
          onChange={onChangeCalendarState}
        />
        <div
          className={cn(
            GRID_ROW_OBJ[gridRow],
            'w-full h-full grid grid-cols-7 gap-0'
          )}
        >
          <CalendarDateBox
            date={1}
            colStart={calendarState.firstDOW + 1}
            year={calendarState.year}
            month={calendarState.month}
            obj={books}
            startDate={startDate}
            endDate={endDate}
          />
          {[...Array(calendarState.lastDate)].map((_, i) =>
            i > 0 ? (
              <CalendarDateBox
                key={i}
                date={i + 1}
                month={calendarState.month}
                year={calendarState.year}
                obj={books}
                startDate={startDate}
                endDate={endDate}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
