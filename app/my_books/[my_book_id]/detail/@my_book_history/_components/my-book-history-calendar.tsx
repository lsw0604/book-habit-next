import dayjs from 'dayjs';
import { useState } from 'react';

import CustomCalendar from '@/components/common/calendar';
import MyBookHistoryDateBox from './my-book-history-date-box';
import MyBookHistoryList from './my-book-history-list';

import { getCalendarDetail } from '@/utils/calendar';

interface MyBookHistoryCalendarProps {
  data: ResponseGetMyBookHistory;
}

export default function MyBookHistoryCalendar({
  data,
}: MyBookHistoryCalendarProps) {
  const [calendar, setCalendar] = useState(
    getCalendarDetail(dayjs().format('YYYY-MM-DD'))
  );

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <CustomCalendar
        data={data}
        calendar={calendar}
        setCalendar={setCalendar}
        Component={MyBookHistoryDateBox}
      />
      <MyBookHistoryList data={data} />
    </div>
  );
}
