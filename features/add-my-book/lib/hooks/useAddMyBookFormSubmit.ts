import { useCallback } from 'react';
import { useAddMyBook } from '@/entities/my-book/lib/queries';
import { AddMyBookType } from '../../model/schema';

export const useAddMyBookFormSubmit = () => {
  const { mutate, isPending } = useAddMyBook();

  const onSubmit = useCallback((data: AddMyBookType) => {
    mutate({ ...data });
  }, []);

  return {
    onSubmit,
    isPending,
  };
};
