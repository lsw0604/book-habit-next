import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

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
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHistory, setSelectedHistory] = useState<
    MyBookHistoryItemType[] | undefined
  >([]);
  const onSelectedDate = useCallback(
    (date: string, history?: MyBookHistoryItemType[]) => {
      setSelectedDate(date);
      setSelectedHistory(history);
    },
    []
  );

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <CustomCalendar
        data={data}
        calendar={calendar}
        setCalendar={setCalendar}
        Component={(props) => (
          <MyBookHistoryDateBox
            {...props}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
          />
        )}
      />
      <MyBookHistoryList
        selectedDate={selectedDate}
        selectedHistory={selectedHistory}
      />
    </div>
  );
}
