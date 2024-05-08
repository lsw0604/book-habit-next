'use client';

import { useCallback, useState } from 'react';

import MyBookDetailSelector from './_components/my-book-detail-selector';
import MyBookDetailCalendar from './_components/my-book-detail-calendar';
import MyBookDetailHistoryList from './_components/my-book-detail-history-list';

import useMyBookHistoryListQuery from '@/queries/myBook/useMyBookHistoryListQuery';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  const [category, setCategory] = useState<CategoryType>('calendar');

  const { data } = useMyBookHistoryListQuery(users_books_id);

  const handleCategory = useCallback((type: CategoryType) => {
    setCategory(type);
  }, []);

  return (
    <div className="w-full h-auto">
      <MyBookDetailSelector onChange={handleCategory} category={category} />
      {!data && <MyBookDetailCalendar.Loader />}
      {category === 'calendar' && data && (
        <MyBookDetailCalendar
          startDate={data.start_date}
          endDate={data.end_date}
          obj={data.books}
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
