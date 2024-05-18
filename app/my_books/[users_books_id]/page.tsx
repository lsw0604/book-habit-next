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
          history: data.history,
        }
      : undefined;
  }, [data]);

  const listData = useMemo(() => {
    return data?.history;
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
  const mockAPI: Record<string, MyBookHistoryListType> = {
    '2023-08-06': [
      {
        id: 299,
        status: '읽기시작함',
        date: '2023-08-05T15:00:00.000Z',
        page: null,
        created_at: '2023-12-21T03:27:22.000Z',
        updated_at: null,
      },
      {
        id: 300,
        status: '읽는중',
        date: '2023-08-05T15:00:00.000Z',
        page: null,
        created_at: '2023-12-21T03:27:22.000Z',
        updated_at: null,
      },
    ],
  };

  return (
    <div className="w-full h-auto">
      <MyBookDetailSelector onChange={handleCategory} category={category} />
      {!data && <MyBookDetailCalendar.Loader />}
      {category === 'calendar' && data && calendarData && (
        <MyBookDetailCalendar
          startDate={calendarData.startDate}
          endDate={calendarData.endDate}
          // obj={calendarData.history}
          obj={mockAPI}
        />
      )}
      {category === 'list' && data && listData && (
        <MyBookDetailHistoryList
          users_books_id={users_books_id}
          // history={listData}
          history={mockAPI}
        />
      )}
    </div>
  );
}
