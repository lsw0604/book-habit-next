import { useCallback } from 'react';

import { Book } from '@/entities/book/model';
import { selectBook } from '@/entities/book/store';
import { setModalState } from '@/entities/modal/model/store';
import { useAppDispatch } from '@/shared/redux/store';

export function useBookSearchModal({ item }: { item: Book }) {
  const dispatch = useAppDispatch();

  const modalHandler = useCallback(() => {
    dispatch(setModalState({ isOpen: true, type: 'REGISTER_MY_BOOK' }));
    dispatch(selectBook({ ...item }));
  }, [item, dispatch]);

  return {
    modalHandler,
  };
}
