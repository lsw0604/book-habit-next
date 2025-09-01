import { useCallback } from 'react';

import { useAddMyBookHistory } from '@/entities/my-book-history';

import { AddMyBookHistoryType } from '../schemas';

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
