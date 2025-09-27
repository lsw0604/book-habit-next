import { useCallback } from 'react';

import { useUpdateMyBook } from '@/entities/my-book/hooks';

import { UpdateMyBookType } from '../schemas';

export const useUpdateMyBookFormSubmit = (myBookId: number) => {
  const { mutate } = useUpdateMyBook({ myBookId });

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
