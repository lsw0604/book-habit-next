import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import { type UpdateMyBookPayload, myBookService } from '../api';
import { type MyBookDetail, toMyBookDetailViewModel } from '../model';

interface UseUpdateMyBook {
  myBookId: number;
}

export const useUpdateMyBook = ({ myBookId }: UseUpdateMyBook) => {
  const { updateMyBook } = myBookService;
  const queryClient = useQueryClient();
  const myBookQueryKey = queryKeys.myBook.detail(myBookId).queryKey;
  // eslint-disable-next-line no-underscore-dangle
  const myBookListQueryKey = queryKeys.myBook.list._def;

  return useMutation<
    MyBookDetail,
    AxiosError<ErrorDTO>,
    UpdateMyBookPayload,
    { previousMyBook: MyBookDetail }
  >({
    mutationFn: async (payload: UpdateMyBookPayload) => {
      const myBookDetailDTO = await updateMyBook(payload);
      return toMyBookDetailViewModel(myBookDetailDTO);
    },
    onMutate: async (payload: UpdateMyBookPayload) => {
      await queryClient.cancelQueries({ queryKey: myBookQueryKey });

      const previousMyBook =
        queryClient.getQueryData<MyBookDetail>(myBookQueryKey);

      if (previousMyBook) {
        queryClient.setQueryData<MyBookDetail>(
          myBookQueryKey,
          Object.assign(previousMyBook, payload)
        );

        return {
          previousMyBook,
        };
      }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousMyBook) {
        queryClient.setQueryData(myBookQueryKey, context.previousMyBook);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myBookListQueryKey,
      });
    },
  });
};
