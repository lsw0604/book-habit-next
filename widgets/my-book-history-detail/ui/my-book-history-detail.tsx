'use client';

import { isSameDay } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { useMyBookHistories } from '@/entities/my-book-history/hooks';
import { ActivityCalendar } from '@/shared/ui/activity-calendar';
import { groupItemsByDate } from '@/shared/utils/group-items-by-date';

import MyBookHistoryDay from './my-book-history-day';
import MyBookHistoryList from './my-book-history-list';

function Legend() {
  return (
    <div className="flex items-center justify-end space-x-2 text-xs text-gray-500 mb-4">
      <span>Less</span>
      <div className="w-4 h-4 rounded-sm bg-green-400" />
      <div className="w-4 h-4 rounded-sm bg-green-500" />
      <div className="w-4 h-4 rounded-sm bg-green-600" />
      <div className="w-4 h-4 rounded-sm bg-green-700" />
      <span>More</span>
    </div>
  );
}

export default function MyBookHistoryDetail({
  myBookId,
}: {
  myBookId: number;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data } = useMyBookHistories({ myBookId });
  const groupedData = useMemo(() => groupItemsByDate(data), [data]);

  const handleSelectedDate = useCallback(
    (date: Date) => {
      if (selectedDate && isSameDay(selectedDate, date)) {
        setSelectedDate(null);
      } else {
        setSelectedDate(date);
      }
    },
    [setSelectedDate, selectedDate]
  );

  return (
    <div className="px-2 pt-4 mt-4 border rounded-lg shadow-lg">
      <ActivityCalendar
        className="p-0 border-none shadow-none"
        data={groupedData}
        onDateClick={handleSelectedDate}
        DayComponent={MyBookHistoryDay}
        selectedDate={selectedDate}
      />
      <Legend />
      <MyBookHistoryList
        selectedDate={selectedDate}
        formattedData={groupedData}
      />
    </div>
  );
}
