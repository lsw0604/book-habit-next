import type { CreateMyBookPayload, MyBook } from '@/entities/my-book/api/types';
import type { ErrorResponseDto } from '@/shared/api/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookService } from '@/entities/my-book/api';

export const useAddMyBook = () => {
  const { addMyBook } = myBookService;
  return useMutation<MyBook, AxiosError<ErrorResponseDto>, CreateMyBookPayload>(
    {
      mutationFn: (payload: CreateMyBookPayload) => addMyBook(payload),
    }
  );
};
