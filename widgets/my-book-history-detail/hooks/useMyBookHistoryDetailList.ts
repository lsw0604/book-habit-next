'use client';

import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

interface ReturnMyBookHistoryDetailList {
  isExpanded: boolean;
  formattedHistories: MyBookHistory[];
  handleHistoryClick: (selectedHistory: SerializedMyBookHistory) => void;
  handleAddHistoryModal: () => void;
  handleToggleExpand: () => void;
}

export const useMyBookHistoryDetailList: (
  props: UseMyBookHistoryDetailListProps
) => ReturnMyBookHistoryDetailList = ({
  formattedData,
  selectedDate,
}: UseMyBookHistoryDetailListProps): ReturnMyBookHistoryDetailList => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const formattedHistories = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return formattedData[dateStr] || [];
  }, [formattedData, selectedDate]);

  useEffect(() => {
    setIsExpanded(false);
  }, [selectedDate]);

  return {
    isExpanded,
    formattedHistories,
    handleHistoryClick,
    handleAddHistoryModal,
    handleToggleExpand,
  };
};
