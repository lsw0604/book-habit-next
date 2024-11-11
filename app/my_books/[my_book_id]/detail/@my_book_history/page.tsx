'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

import CustomCalendar from '@/components/common/calendar';
import MyBookHistoryDateBox from './_components/my-book-history-date-box';
import MyBookHistoryLoader from './_components/my-book-history-loader';
import MyBookHistoryHeader from './_components/my-book-history-header';

import { useMyBookHistory } from '@/service/my-book-history/useMyBookHistoryService';
import { getCalendarDetail } from '@/utils/calendar';

/**
 * TODO : CalendarLoader & ErrorBoundary
 */
export default function MyBookHistoryPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const [calendar, setCalendar] = useState(
    getCalendarDetail(dayjs().format('YYYY-MM-DD'))
  );

  const { data, isFetching, isLoading } = useMyBookHistory(params.my_book_id);

  if (!data || isLoading || isFetching) return <MyBookHistoryLoader />;

  return (
    <section className="my-3 px-2">
      <MyBookHistoryHeader myBookId={params.my_book_id} history={data} />
      <CustomCalendar
        data={data}
        calendar={calendar}
        Component={MyBookHistoryDateBox}
        setCalendar={setCalendar}
      />
    </section>
  );
}
