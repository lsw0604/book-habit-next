'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Alert from '@/components/common/alert';
import MyBookHistoryLoader from './_components/my-book-history-loader';
import MyBookHistoryHeader from './_components/my-book-history-header';
import MyBookHistoryCalendar from './_components/my-book-history-calendar';

import { useMyBookHistory } from '@/service/my-book-history/useMyBookHistoryService';

export default function MyBookHistoryPage({
  params,
}: {
  params: { my_book_id: number };
}) {
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
        <MyBookHistoryCalendar data={data} />
      </ErrorBoundary>
    </section>
  );
}
