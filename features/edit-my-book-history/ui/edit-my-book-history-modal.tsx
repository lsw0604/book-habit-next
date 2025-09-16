'use client';

import { useParams } from 'next/navigation';

import type { EditMyBookHistoryProps } from '@/entities/modal';

import { EditMyBookHistoryForm } from './edit-my-book-history-form';
import { EditMyBookHistoryProvider } from './edit-my-book-history-provider';

export function EditMyBookHistoryModal({
  selectedHistory,
}: EditMyBookHistoryProps) {
  const params = useParams();
  const { my_book_id: myBookId } = params;

  if (!myBookId || typeof myBookId !== 'string') {
    throw Error('올바른 myBookId가 존재하지 않습니다.');
  }

  const parsedMyBookId = parseInt(myBookId, 10);

  return (
    <div className="h-[75vh]">
      <EditMyBookHistoryProvider selectedHistory={selectedHistory}>
        <EditMyBookHistoryForm myBookId={parsedMyBookId} />
      </EditMyBookHistoryProvider>
    </div>
  );
}
