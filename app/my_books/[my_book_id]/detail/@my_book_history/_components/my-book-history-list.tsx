'use client';

import CustomCalendar from '@/components/common/calendar';
// import useMyBookHistoryQuery from '@/queries/my-book-history/useMyBookHistoryQuery';

interface MyBookHistoryListProps {
  myBookId: number;
}

export default function MyBookHistoryList({
  myBookId,
}: MyBookHistoryListProps) {
  // const { data, isLoading } = useMyBookHistoryQuery(myBookId);

  // if (!data || isLoading) return <div>loading...</div>;
  return <div className="w-full h-auto">{/* <CustomCalendar /> */}</div>;
}
