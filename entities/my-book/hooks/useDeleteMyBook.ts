import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';

import { type DeleteMyBookPayload, myBookService } from '../api';

export const useDeleteMyBook = () => {
  const { deleteMyBook } = myBookService;
  return useMutation<{ id: number }, AxiosError<ErrorDTO>, DeleteMyBookPayload>(
    {
      mutationFn: (payload: DeleteMyBookPayload) => deleteMyBook(payload),
    }
  );
};
