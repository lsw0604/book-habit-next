import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APIError } from "@/shared/api/errors";
import { queryKeys } from "@/shared/query/keys";
import { MyBookDetail, toMyBookDetailViewModel } from "@/entities/my-book";

import { updateMyBookService, UpdateMyBookPayload } from "../api";

export const useUpdateMyBook = () => {
  const { updateMyBook } = updateMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetail, 
    APIError, 
    UpdateMyBookPayload,
    {
      previousDetail: MyBookDetail | null | undefined;
      id: number;
    }
  >({
    mutationFn: async (payload) => {
      const myBook = await updateMyBook(payload)
      return toMyBookDetailViewModel(myBook);
    },
    onMutate: async (payload) => {
      const detailKey = queryKeys.myBook.detail(payload.id).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail = queryClient.getQueryData<MyBookDetail>(detailKey);

      if (previousDetail) {
        const optimisticUpdatedMyBook: MyBookDetail = {
          ...previousDetail,
          status: payload.status ?? previousDetail.status,
          rating: payload.rating !== undefined ? payload.rating : previousDetail.rating,
          updatedAt: new Date(),
        };

        queryClient.setQueryData(detailKey, optimisticUpdatedMyBook);
      }

      return { previousDetail, id: payload.id };
    },
    onError: (_err, _payload, context) => {
      if (context) {
        const { id, previousDetail } = context;
        queryClient.setQueryData(
          queryKeys.myBook.detail(id).queryKey,
          previousDetail
        );
      }
    },
    onSuccess: (data) => {
      const { id, book } = data;

      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.list._def })
      queryClient.setQueryData(queryKeys.myBook.detail(id).queryKey, data)

      if (book?.isbn) {
        queryClient.setQueryData(queryKeys.myBook.exist(book.isbn).queryKey, data);
      }
    }
  })
}