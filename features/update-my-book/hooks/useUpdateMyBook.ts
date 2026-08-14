/* eslint-disable no-underscore-dangle -- _def is query-key-factory's API */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MyBookDetailDTO, myBookQueryKeys } from '@/entities/my-book';
import { APIError } from '@/shared/api';

import { updateMyBookService, UpdateMyBookPayload } from '../api';

export const useUpdateMyBook = () => {
  const { updateMyBook } = updateMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetailDTO,
    APIError,
    UpdateMyBookPayload,
    {
      previousDetail: MyBookDetailDTO | undefined;
      id: number;
    }
  >({
    mutationFn: payload => updateMyBook(payload),
    onMutate: async payload => {
      const detailKey = myBookQueryKeys.detail(payload.id).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail =
        queryClient.getQueryData<MyBookDetailDTO>(detailKey);

      if (previousDetail) {
        const optimisticUpdatedMyBook: MyBookDetailDTO = {
          ...previousDetail,
          status: payload.status ?? previousDetail.status,
          rating:
            payload.rating !== undefined
              ? payload.rating
              : previousDetail.rating,
          updatedAt: new Date().toISOString(),
        };

        queryClient.setQueryData(detailKey, optimisticUpdatedMyBook);
      }

      return { previousDetail, id: payload.id };
    },
    onError: (_err, _payload, context) => {
      if (context) {
        const { id, previousDetail } = context;
        queryClient.setQueryData(
          myBookQueryKeys.detail(id).queryKey,
          previousDetail
        );
      }
    },
    onSuccess: data => {
      const { id, book } = data;

      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });
      queryClient.setQueryData(myBookQueryKeys.detail(id).queryKey, data);

      if (book?.isbn) {
        queryClient.setQueryData(
          myBookQueryKeys.exist(book.isbn).queryKey,
          data
        );
      }
    },
  });
};
