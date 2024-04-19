'use client';

import { useState } from 'react';

import MyBookDetailSelector from './_components/my-book-detail-selector';
import MyBookDetailCalendar from './_components/my-book-detail-calendar';
import MyBookDetailHistoryList from './_components/my-book-detail-history-list';

import useMyBookHistoryListQuery from '@/queries/myBook/useMyBookHistoryListQuery';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const [category, setCategory] = useState<CategoryType>('calendar');
  const { users_books_id } = params;

  const { data } = useMyBookHistoryListQuery(users_books_id);

  const onClick = (type: CategoryType) => {
    setCategory(type);
  };

  return (
    <div className="w-full h-auto">
      <MyBookDetailSelector onClick={onClick} category={category} />
      {!data && <MyBookDetailCalendar.Loader />}
      {category === 'calendar' && data && (
        <MyBookDetailCalendar
          startDate={data.start_date}
          endDate={data.end_date}
          history={data.books}
        />
      )}
      {category === 'list' && data && (
        <MyBookDetailHistoryList
          users_books_id={users_books_id}
          history={data.books}
        />
      )}
    </div>
  );
}
