'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import CalendarDateBox from './my-book-detail-calendar-date-box';
import CalendarHeader from './my-book-detail-calendar-header';
import { Skeleton } from '@/components/ui/skeleton';

import { queriesKey } from '@/queries';
import { myBookHistoryAPI, myBookTimeRangeAPI } from '@/lib/api/myBook';
import { GRID_ROW_OBJ } from '@/utils/staticData';
import { cn } from '@/lib/utils';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

const { time, history } = queriesKey.myBook.useMyBookPageQueriesKey;

export default function MyBookDetailCalendar() {
  const pathname = usePathname();

  const [calendarState, setCalendarState] = useState<CalendarType>(
    getCalendarDetail(dayjs().format())
  );

  const myBookId = parseInt(
    pathname.split('/')[pathname.split('/').length - 1]
  );

  // const { data } = useQuery([time, myBookId.toString()], () =>
  //   myBookTimeRangeAPI(myBookId)
  // );

  const { data: historyData } = useQuery([history, myBookId.toString()], () =>
    myBookHistoryAPI(myBookId)
  );

  // if (!data || !historyData) return <MyBookDetailCalendar.Loader />;
  if (!historyData) return <MyBookDetailCalendar.Loader />;

  // const { startDate, endDate } = data;
  const { books, end_date, start_date } = historyData;

  const startDate = dayjs(start_date).add(9, 'hour').format('YYYY-MM-DD');
  const endDate = dayjs(end_date).add(9, 'hour').format('YYYY-MM-DD');

  // const start_date = startDate
  //   ? dayjs(data?.startDate).add(9, 'hour').format('YYYY-MM-DD')
  //   : undefined;

  // const end_date = endDate
  //   ? dayjs(data?.endDate).add(9, 'hour').format('YYYY-MM-DD')
  //   : dayjs().format('YYYY-MM-DD');

  // const obj: { [date: string]: HistoryStatusType[] } = {};
  // historyData.books.forEach((item) => {
  //   const dateStr = dayjs(item.date).add(9, 'hour').format('YYYY-MM-DD');
  //   obj[dateStr] = obj[dateStr] || [];
  //   obj[dateStr].push(item.status);
  // });

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
          // startDate={startDate}
          // endDate={endDate}

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
            // obj={obj}

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
                // obj={obj}
                // startDate={start_date}
                // endDate={end_date}
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

MyBookDetailCalendar.Loader = function () {
  return (
    <div className="w-full h-auto px-4 flex flex-col">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg">
        <div className="w-full h-10 flex justify-between items-center px-8 mb-2 border-solid border-b-2 border-slate-300">
          <div>
            <ArrowLeftIcon />
          </div>
          <div>
            <Skeleton className="h-6 w-24 bg-slate-100 rounded-lg" />
          </div>
          <div>
            <ArrowRightIcon />
          </div>
        </div>
        <div className="w-full h-[240px] grid grid-cols-7 grid-rows-5 gap-1">
          {[...Array(35)].map((_, i) => (
            <Skeleton
              className="w-full h-full bg-slate-100 rounded-lg"
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
