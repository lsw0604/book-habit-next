'use client';

import { MyBookHistoryDay } from '@/entities/my-book-history';
import { ActivityCalendar } from '@/shared/ui/activity-calendar';

import type { ReturnUseMyBookHistoryDetail } from '../hooks';

interface MyBookHistoryDetailCalendarProps
  extends ReturnUseMyBookHistoryDetail {}

function MyBookHistoryDetailLegend() {
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

export function MyBookHistoryDetailCalendar({
  groupedData: data,
  onDateClick,
  selectedDate,
  onTodayClick,
}: MyBookHistoryDetailCalendarProps) {
  return (
    <>
      <ActivityCalendar
        className="p-0 border-none shadow-none"
        data={data}
        onDateClick={onDateClick}
        onTodayClick={onTodayClick}
        selectedDate={selectedDate}
        DayComponent={MyBookHistoryDay}
      />
      <MyBookHistoryDetailLegend />
    </>
  );
}
