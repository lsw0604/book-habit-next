'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Alert from '@/components/common/alert';
import MyBookHistoryHeader from './my-book-history-header';
import MyBookHistoryCalendar from './my-book-history-calendar';
import MyBookHistoryLoader from './my-book-history-loader';

import { useMyBookHistory } from '@/service/my-book-history/useMyBookHistoryService';

interface MyBookHistoryProps {
  myBookId: number;
}

export default function MyBookHistory({ myBookId }: MyBookHistoryProps) {
  const { data, isFetching, isLoading } = useMyBookHistory(myBookId);

  if (!data || isLoading || isFetching) return <MyBookHistoryLoader />;

  return (
    <ErrorBoundary
      FallbackComponent={(response) => (
        <Alert message={response.error.message} status="ERROR" />
      )}
    >
      <MyBookHistoryHeader myBookId={myBookId} data={data} />
      <MyBookHistoryCalendar data={data} />
    </ErrorBoundary>
  );
}
