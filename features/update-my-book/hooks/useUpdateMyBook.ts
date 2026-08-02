import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APIError } from "@/shared/api";
import { type MyBookDetail, type MyBookDetailDTO, myBookQueryKeys } from "@/entities/my-book";

import { updateMyBookService, UpdateMyBookPayload } from "../api";

export const useUpdateMyBook = () => {
  const { updateMyBook } = updateMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetailDTO,
    APIError,
    UpdateMyBookPayload,
    {
      previousDetail: MyBookDetail | null | undefined;
      id: number;
    }
  >({
    mutationFn: async (payload) => await updateMyBook(payload),
    onMutate: async (payload) => {
      const detailKey = myBookQueryKeys.detail(payload.id).queryKey;
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
          myBookQueryKeys.detail(id).queryKey,
          previousDetail
        );
      }
    },
    onSuccess: (data) => {
      const { id, book } = data;

      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def })
      queryClient.setQueryData(myBookQueryKeys.detail(id).queryKey, data)

      if (book?.isbn) {
        queryClient.setQueryData(myBookQueryKeys.exist(book.isbn).queryKey, data);
      }
    }
  })
}