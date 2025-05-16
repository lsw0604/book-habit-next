import type { ResponseDeleteMyBook } from '../../api/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookService } from '../../api';
import { ErrorResponseDto } from '@/shared/api/types/error';

export const useDeleteMyBook = () => {
  const { deleteMyBook } = myBookService;
  return useMutation<
    ResponseDeleteMyBook,
    AxiosError<ErrorResponseDto>,
    number
  >({
    mutationFn: (myBookId: number) => deleteMyBook(myBookId),
  });
};
