import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';

import { RegisterMyBookHistoryProps } from '@/entities/modal/store/types';

import { AddMyBookHistoryForm } from './add-my-book-history-form';
import { AddMyBookHistoryProvider } from './add-my-book-history-provider';

export default function RegisterMyBookHistoryModal({
  selectedDate,
}: RegisterMyBookHistoryProps) {
  const params = useParams();
  const { my_book_id: myBookId } = params;

  if (!myBookId || typeof myBookId !== 'string') {
    return null;
  }

  const parsedMyBookId = parseInt(myBookId, 10);
  const date = selectedDate ? parseISO(selectedDate) : new Date();

  return (
    <AddMyBookHistoryProvider myBookId={parsedMyBookId} date={date}>
      <AddMyBookHistoryForm date={date} />
    </AddMyBookHistoryProvider>
  );
}
