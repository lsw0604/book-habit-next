'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';
import dayjs from 'dayjs';

import Alert from '@/components/common/alert';
import CustomCalendar from '@/components/common/calendar';
import MyBookHistoryDateBox from './_components/my-book-history-date-box';
import MyBookHistoryLoader from './_components/my-book-history-loader';
import MyBookHistoryHeader from './_components/my-book-history-header';
import MyBookHistoryList from './_components/my-book-history-list';

import { useMyBookHistory } from '@/service/my-book-history/useMyBookHistoryService';
import { getCalendarDetail } from '@/utils/calendar';

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
    <section className="my-3">
      <ErrorBoundary
        FallbackComponent={(response) => (
          <Alert message={response.error.message} status="ERROR" />
        )}
      >
        <MyBookHistoryHeader myBookId={params.my_book_id} history={data} />
      </ErrorBoundary>
      <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
        <CustomCalendar
          data={data}
          calendar={calendar}
          Component={MyBookHistoryDateBox}
          setCalendar={setCalendar}
        />
        <MyBookHistoryList />
      </div>
    </section>
  );
}
