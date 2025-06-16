import { useCallback } from 'react';
import { KakaoDocument } from '../../api/types';
import { formatISBNToArray } from '../../utils';
import { setModalState } from '@/entities/modal/model/store';
import { selectBook } from '@/entities/book/model/store';
import { useAppDispatch } from '@/shared/redux/store';

export function useBookSearchModal({ item }: { item: KakaoDocument }) {
  const dispatch = useAppDispatch();

  const modalHandler = useCallback(() => {
    dispatch(setModalState({ isOpen: true, type: 'REGISTER_MY_BOOK' }));
    dispatch(selectBook({ ...formatISBNToArray(item) }));
  }, [item, dispatch]);

  return {
    modalHandler,
  };
}
