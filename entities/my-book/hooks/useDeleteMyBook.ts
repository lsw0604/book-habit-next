import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { DeleteMyBookPayload, myBookService } from '../api';

export const useDeleteMyBook = () => {
  const { deleteMyBook } = myBookService;
  return useMutation<
    { id: number },
    AxiosError<ErrorResponseDTO>,
    DeleteMyBookPayload
  >({
    mutationFn: (payload: DeleteMyBookPayload) => deleteMyBook(payload),
  });
};
