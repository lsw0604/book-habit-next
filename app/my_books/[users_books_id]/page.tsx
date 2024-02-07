import MyBookDetailInfo from './_components/my-book-detail-info';
import Calendar from './_components/my-book-detail-calendar';
import { Suspense } from 'react';
import MyBookDetailCalendarLoader from './_components/my-book-detail-calendar-loader';
import MyBookDetailInfoLoader from './_components/my-book-detail-info-loader';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;

  return (
    <div>
      <Suspense fallback={<MyBookDetailInfoLoader />}>
        <MyBookDetailInfo users_books_id={users_books_id} />
      </Suspense>
      <Suspense fallback={<MyBookDetailCalendarLoader />}>
        <Calendar />
      </Suspense>
    </div>
  );
}
