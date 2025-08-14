import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { CreateMyBookPayload } from '@/entities/my-book/api/types';
import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type MyBookDTO, myBookService } from '../api';
import { type MyBook, toMyBookViewModel } from '../model';

export const useAddMyBook = () => {
  const { addMyBook } = myBookService;
  return useMutation<MyBook, AxiosError<ErrorResponseDTO>, CreateMyBookPayload>(
    {
      mutationFn: async (payload: CreateMyBookPayload) => {
        const myBookDTO: MyBookDTO = await addMyBook(payload);

        return toMyBookViewModel(myBookDTO);
      },
    }
  );
};
