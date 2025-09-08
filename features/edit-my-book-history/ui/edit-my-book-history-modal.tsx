'use client';

import { EditMyBookHistoryProps } from '@/entities/modal';

import { EditMyBookHistoryForm } from './edit-my-book-history-form';
import { EditMyBookHistoryProvider } from './edit-my-book-history-provider';

export function EditMyBookHistoryModal({
  selectedHistory,
}: EditMyBookHistoryProps) {
  return (
    <div className="h-[75vh]">
      <EditMyBookHistoryProvider selectedHistory={selectedHistory}>
        <EditMyBookHistoryForm />
      </EditMyBookHistoryProvider>
    </div>
  );
}
