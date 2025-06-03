import { useCallback } from 'react';
import { useAddMyBookHistory } from '@/entities/my-book-history/lib/queries';
import { AddMyBookHistoryType } from '../../model/schema';

export const useAddMyBookHistoryFormSubmit = () => {
  const { mutate, isPending } = useAddMyBookHistory();

  const onSubmit = useCallback((data: AddMyBookHistoryType) => {
    mutate({ ...data });
  }, []);

  return {
    onSubmit,
    isPending,
  };
};
