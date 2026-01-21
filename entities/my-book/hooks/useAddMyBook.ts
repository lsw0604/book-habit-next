import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { CreateMyBookPayload } from '@/entities/my-book';
import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import { type MyBookDTO, myBookService } from '../api';
import { toMyBookViewModel } from '../lib';
import type { MyBook } from '../model';

export const useAddMyBook = () => {
  const { addMyBook } = myBookService;
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-underscore-dangle
  const myBookListQueryKey = queryKeys.myBook.list._def;

  return useMutation<MyBook, AxiosError<ErrorDTO>, CreateMyBookPayload>({
    mutationFn: async (payload: CreateMyBookPayload) => {
      const myBookDTO: MyBookDTO = await addMyBook(payload);
      return toMyBookViewModel(myBookDTO);
    },
    onSuccess: () => {
      // eslint-disable-next-line no-underscore-dangle
      queryClient.invalidateQueries({ queryKey: myBookListQueryKey });
    },
  });
};
