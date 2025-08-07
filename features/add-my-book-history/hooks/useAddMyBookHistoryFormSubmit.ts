import { useCallback } from 'react';

import { useAddMyBookHistory } from '@/entities/my-book-history/hooks';

import { AddMyBookHistoryType } from '../model/schema';

export const useAddMyBookHistoryFormSubmit = () => {
  const { mutate, isPending } = useAddMyBookHistory();

  const onSubmit = useCallback(
    (data: AddMyBookHistoryType) => {
      mutate({ ...data });
    },
    [mutate]
  );

  return {
    onSubmit,
    isPending,
  };
};
