'use client';

import { useCallback, useMemo, useState } from 'react';

import MyBookDetailSelector from './_components/my-book-detail-selector';
import MyBookDetailCalendar from './_components/my-book-detail-calendar';
import MyBookDetailHistoryList from './_components/my-book-detail-history-list';

import useMyBookHistoryListQuery from '@/queries/myBook/useMyBookHistoryListQuery';

function useCategory(initialCategory: CategoryType) {
  const [category, setCategory] = useState<CategoryType>(initialCategory);

  const handleCategory = useCallback((type: CategoryType) => {
    setCategory(type);
  }, []);

  return { category, handleCategory };
}

function useBookHistoryData(user_book_id: number) {
  const { data } = useMyBookHistoryListQuery(user_book_id);

  const calendarData = useMemo(() => {
    return data
      ? {
          startDate: data.start_date,
          endDate: data.end_date,
          books: data.books,
        }
      : undefined;
  }, [data]);

  const listData = useMemo(() => {
    return data ? data.books : [];
  }, [data]);

  return { data, calendarData, listData };
}

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  const { category, handleCategory } = useCategory('calendar');
  const { data, calendarData, listData } = useBookHistoryData(users_books_id);
  // const [category, setCategory] = useState<CategoryType>('calendar');

  // // action
  // const { data } = useMyBookHistoryListQuery(users_books_id);

  // const handleCategory = useCallback((type: CategoryType) => {
  //   setCategory(type);
  // }, []);

  return (
    <div className="w-full h-auto">
      <MyBookDetailSelector onChange={handleCategory} category={category} />
      {!data && <MyBookDetailCalendar.Loader />}
      {/* {category === 'calendar' && data  && ( */}
      {category === 'calendar' && data && calendarData && (
        <MyBookDetailCalendar
          startDate={calendarData.startDate}
          endDate={calendarData.endDate}
          obj={calendarData.books}
        />
      )}
      {category === 'list' && data && listData && (
        <MyBookDetailHistoryList
          users_books_id={users_books_id}
          history={listData}
        />
      )}
    </div>
  );
}
