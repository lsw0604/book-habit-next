'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import {
  type MyBookHistory,
  MyBookHistoryItem,
} from '@/entities/my-book-history';
import { Button } from '@/shared/ui/button';

import { useMyBookHistoryDetailList } from '../hooks';

import { MyBookHistoryDetailListEmpty } from './my-book-history-detail-list-empty';

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

  const { representativeHistory, handleHistoryClick, handleAddHistoryModal } =
    useMyBookHistoryDetailList({ formattedData, selectedDate });

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
      <div className="flex justify-between items-center px-1">
        <h3 className="text-base font-bold">독서 기록</h3>
        <Button asChild variant="ghost" size="sm" className="-mr-2">
          <Link href={`/my_books/${myBookId}/history`}>전체 보기</Link>
        </Button>
      </div>

      <div>
        {representativeHistory ? (
          <MyBookHistoryItem
            key={`my-book-history${representativeHistory.id}`}
            history={representativeHistory}
            onClick={handleHistoryClick}
          />
        ) : (
          <MyBookHistoryDetailListEmpty selectedDate={selectedDate} />
        )}
      </div>

      <Button
        onClick={handleAddHistoryModal}
        disabled={!selectedDate}
        className="w-full mt-2"
      >
        독서 기록하기
      </Button>
    </div>
  );
}
