import { useCallback } from 'react';

import { useUpdateMyBook } from '@/entities/my-book/hooks';

import { UpdateMyBookType } from '../model/schema';

export const useUpdateMyBookFormSubmit = (myBookId: number) => {
  const { mutate } = useUpdateMyBook();

  const onSubmit = useCallback(
    (data: UpdateMyBookType) => {
      mutate({ ...data, myBookId });
    },
    [mutate, myBookId]
  );

  return {
    onSubmit,
  };
};
