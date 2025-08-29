import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';

import {
  openAddMyBookHistoryModal,
  openSelectedMyBookHistoryModal,
} from '@/entities/modal/store';
import type {
  MyBookHistory,
  SerializedMyBookHistory,
} from '@/entities/my-book-history';
import { useAppDispatch } from '@/shared/redux/store';

interface UseMyBookHistoryDetailListProps {
  formattedData: { [date: string]: MyBookHistory[] };
  selectedDate: Date | null;
}

export const useMyBookHistoryDetailList = ({
  formattedData,
  selectedDate,
}: UseMyBookHistoryDetailListProps) => {
  const dispatch = useAppDispatch();

  const handleHistoryClick = useCallback(
    (selectedHistory: SerializedMyBookHistory) => {
      dispatch(openSelectedMyBookHistoryModal({ selectedHistory }));
    },
    [dispatch]
  );

  const handleAddHistoryModal = useCallback(() => {
    if (!selectedDate) return;
    dispatch(
      openAddMyBookHistoryModal({ selectedDate: selectedDate.toISOString() })
    );
  }, [dispatch, selectedDate]);

  const { representativeHistory, formattedDate } = useMemo(() => {
    const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    const histories = formattedData[dateStr] || [];
    return {
      representativeHistory: histories[0],
      formattedDate: dateStr,
    };
  }, [formattedData, selectedDate]);

  return {
    representativeHistory,
    formattedDate,
    handleHistoryClick,
    handleAddHistoryModal,
  };
};
