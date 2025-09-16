'use client';

import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';

import type { AddMyBookHistoryProps } from '@/entities/modal';

import { AddMyBookHistoryForm } from './add-my-book-history-form';
import { AddMyBookHistoryProvider } from './add-my-book-history-provider';

export function AddMyBookHistoryModal({ selectedDate }: AddMyBookHistoryProps) {
  const params = useParams();
  const { my_book_id: myBookId } = params;

  if (!myBookId || typeof myBookId !== 'string') {
    throw Error('올바른 myBookId가 존재하지 않습니다.');
  }

  const parsedMyBookId = parseInt(myBookId, 10);
  const date = selectedDate ? parseISO(selectedDate) : new Date();

  return (
    <div className="h-[75vh]">
      <AddMyBookHistoryProvider myBookId={parsedMyBookId} date={date}>
        <AddMyBookHistoryForm />
      </AddMyBookHistoryProvider>
    </div>
  );
}
