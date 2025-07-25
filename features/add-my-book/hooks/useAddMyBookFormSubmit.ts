import { useCallback } from 'react';
import { useAddMyBook } from '@/entities/my-book/hooks';
import { AddMyBookType } from '../model/schema';

export const useAddMyBookFormSubmit = () => {
  const { mutate, isPending } = useAddMyBook();

  const onSubmit = useCallback((data: AddMyBookType) => {
    const { salePrice, ...rest } = data;

    mutate({
      ...rest,
      sale_price: salePrice,
    });
  }, []);

  return {
    onSubmit,
    isPending,
  };
};
