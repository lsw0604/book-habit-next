import { useCallback } from 'react';
import { KakaoDocument } from '../../api/types';
import { formatISBNToArray } from '../../utils/helper';
import { setModalState } from '@/entities/modal/model';
import { setBookState } from '@/entities/book/model';
import { useAppDispatch } from '@/shared/redux/store';

export function useBookSearchModal({ item }: { item: KakaoDocument }) {
  const dispatch = useAppDispatch();

  const modalHandler = useCallback(() => {
    dispatch(setModalState({ isOpen: true, type: 'REGISTER_MY_BOOK' }));
    dispatch(setBookState({ ...formatISBNToArray(item) }));
  }, [item, dispatch]);

  return {
    modalHandler,
  };
}
