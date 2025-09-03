'use client';

import { isSameDay, isValid, startOfDay } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import {
  type MyBookHistory,
  useMyBookHistories,
} from '@/entities/my-book-history';
import {
  type GroupType,
  groupItemsByDate,
} from '@/shared/utils/group-items-by-date';

export interface ReturnUseMyBookHistoryDetail {
  selectedDate: Date | null;
  groupedData: GroupType<MyBookHistory>;
  onDateClick: (date: Date) => void;
  onTodayClick: () => void;
}

export const useMyBookHistoryDetail: (
  myBookId: number
) => ReturnUseMyBookHistoryDetail = (
  myBookId: number
): ReturnUseMyBookHistoryDetail => {
  const { data: histories } = useMyBookHistories({ myBookId });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const groupedData: GroupType<MyBookHistory> =
    useMemo((): GroupType<MyBookHistory> => {
      const validHistories =
        histories?.filter(history => history.date && isValid(history.date)) ||
        [];
      return groupItemsByDate(validHistories);
    }, [histories]);

  const onDateClick = useCallback(
    (date: Date) => {
      if (selectedDate && isSameDay(selectedDate, date)) {
        setSelectedDate(null);
      } else {
        setSelectedDate(date);
      }
    },
    [setSelectedDate, selectedDate]
  );

  const onTodayClick = useCallback(() => {
    const today = startOfDay(new Date());
    setSelectedDate(today);
  }, []);

  return {
    selectedDate,
    groupedData,
    onDateClick,
    onTodayClick,
  };
};
