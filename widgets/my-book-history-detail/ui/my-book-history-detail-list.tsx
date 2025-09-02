'use client';

import { useEffect, useRef } from 'react';

import {
  type MyBookHistory,
  MyBookHistoryItem,
} from '@/entities/my-book-history';
import { Button } from '@/shared/ui/button';

import { useMyBookHistoryDetailList } from '../hooks';

import { MyBookHistoryDetailListEmpty } from './my-book-history-detail-list-empty';
import { MyBookHistoryDetailListHeader } from './my-book-history-detail-list-header';

interface MyBookHistoryDetailListProps {
  myBookId: number;
  formattedData: { [date: string]: MyBookHistory[] };
  selectedDate: Date | null;
}

export function MyBookHistoryDetailList({
  myBookId,
  formattedData,
  selectedDate,
}: MyBookHistoryDetailListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const {
    isExpanded,
    formattedHistories,
    handleHistoryClick,
    handleToggleExpand,
    handleAddHistoryModal,
  } = useMyBookHistoryDetailList({ formattedData, selectedDate });

  useEffect(() => {
    if (selectedDate && listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDate]);

  return (
    <div
      ref={listRef}
      className="w-full h-auto mt-2 mb-4 flex flex-col space-y-3"
    >
      <MyBookHistoryDetailListHeader
        myBookId={myBookId}
        onAdd={handleAddHistoryModal}
        addDisabled={!selectedDate}
      />
      {formattedHistories.length > 0 ? (
        <div className="space-y-2">
          {formattedHistories
            .slice(0, isExpanded ? formattedHistories.length : 1)
            .map(history => (
              <MyBookHistoryItem
                key={history.id}
                history={history}
                onClick={handleHistoryClick}
              />
            ))}
        </div>
      ) : (
        <MyBookHistoryDetailListEmpty selectedDate={selectedDate} />
      )}
      {formattedHistories.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleExpand}
          className="w-full"
        >
          {isExpanded ? '접기' : `더보기 (${formattedHistories.length}개)`}
        </Button>
      )}
    </div>
  );
}
