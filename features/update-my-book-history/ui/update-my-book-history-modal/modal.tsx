'use client';

import type { UpdateMyBookHistoryProps } from '@/entities/modal';

import { UpdateMyBookHistoryForm } from './form';
import { UpdateMyBookHistoryProvider } from './provider';

export function UpdateMyBookHistoryModal({
  selectedHistory,
}: UpdateMyBookHistoryProps) {
  const { myBookId } = selectedHistory;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <UpdateMyBookHistoryProvider selectedHistory={selectedHistory}>
        <UpdateMyBookHistoryForm myBookId={myBookId} />
      </UpdateMyBookHistoryProvider>
    </div>
  );
}
