'use client';

import { useMyBookHistoryDetail } from '../hooks';

import { MyBookHistoryDetailCalendar } from './my-book-history-detail-calendar';
import { MyBookHistoryDetailList } from './my-book-history-detail-list';

export function MyBookHistoryDetail({ myBookId }: { myBookId: number }) {
  const { groupedData, onDateClick, selectedDate, onTodayClick } =
    useMyBookHistoryDetail(myBookId);

  return (
    <div className="px-2 pt-4 mt-4 border rounded-lg shadow-lg">
      <MyBookHistoryDetailCalendar
        groupedData={groupedData}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        onTodayClick={onTodayClick}
      />
      <MyBookHistoryDetailList
        myBookId={myBookId}
        selectedDate={selectedDate}
        formattedData={groupedData}
      />
    </div>
  );
}
