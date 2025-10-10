import { useCallback } from 'react';

import { Book } from '@/entities/book/model';
import { openAddMyBookModal } from '@/entities/modal/store';
import { useAppDispatch } from '@/shared/redux';

export function useBookSearchModal() {
  const dispatch = useAppDispatch();

  const modalHandler = useCallback(
    (selectedBook: Book) => {
      dispatch(openAddMyBookModal({ selectedBook }));
    },
    [dispatch]
  );

  return {
    modalHandler,
  };
}
