'use client';

import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Calendar from '@/components/common/calendar';
import MyBookDetailSelector from './_components/my-book-detail-selector';

import { myBookHistoryAPI } from '@/lib/api/myBook';

/**
 * TODO: 이런식으로 Calendar 컴포넌트 props를 넘겨줘서 재사용성을 높이자
 */
const TestFunction: FC<{
  date: number;
  month: number;
  year: number;
}> = ({ date, month, year }) => {
  return (
    <div>
      {year}
      {month}
      {date}
    </div>
  );
};

type CategoryType = 'calendar' | 'list';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const [type, setType] = useState<CategoryType>('calendar');
  const { users_books_id } = params;

  const { data } = useQuery(['my_book_id', users_books_id], () =>
    myBookHistoryAPI(users_books_id)
  );

  if (!data) return null;

  const { start_date, end_date } = data;

  const onChange = (type: CategoryType) => {
    setType(type);
  };

  return (
    <div className="w-full h-auto">
      <MyBookDetailSelector onChange={onChange} type={type} />
      {type === 'calendar' && (
        <Calendar
          startDate={start_date}
          endDate={end_date}
          component={TestFunction}
        />
      )}
    </div>
  );
}
