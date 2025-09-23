import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { CreateMyBookPayload } from '@/entities/my-book/api/types';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

import { type MyBookDTO, myBookService } from '../api';
import { type MyBook, toMyBookViewModel } from '../model';

export const useAddMyBook = () => {
  const { addMyBook } = myBookService;
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-underscore-dangle
  const myBookListQueryKey = queryKeys.myBook.list._def;

  return useMutation<MyBook, AxiosError<ErrorResponseDTO>, CreateMyBookPayload>(
    {
      mutationFn: async (payload: CreateMyBookPayload) => {
        const myBookDTO: MyBookDTO = await addMyBook(payload);
        return toMyBookViewModel(myBookDTO);
      },
      onSuccess: () => {
        // eslint-disable-next-line no-underscore-dangle
        queryClient.invalidateQueries({ queryKey: myBookListQueryKey });
      },
    }
  );
};
