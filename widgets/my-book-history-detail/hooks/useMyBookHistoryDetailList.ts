'use client';

import { formatISO } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useModal } from '@/entities/modal';
import type {
  MyBookHistory,
  SerializedMyBookHistory,
} from '@/entities/my-book-history';
import { formatDate } from '@/shared/utils';

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
  const { open } = useModal();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleHistoryClick = useCallback(
    (selectedHistory: SerializedMyBookHistory) => {
      open('VIEW_MY_BOOK_HISTORY', { selectedHistory });
    },
    [open]
  );

  const handleAddHistoryModal = useCallback(() => {
    if (!selectedDate) return;
    open('ADD_MY_BOOK_HISTORY', { selectedDate: formatISO(selectedDate) });
  }, [open, selectedDate]);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const formattedHistories = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = formatDate(selectedDate, 'short');
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
