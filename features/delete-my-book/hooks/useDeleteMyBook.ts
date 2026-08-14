import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { APIError } from "@/shared/api";
import { myBookQueryKeys, type MyBookDetailDTO } from "@/entities/my-book";
import { myBookReviewQueryKeys } from "@/entities/my-book-review";
import { myBookHistoryQueryKeys } from "@/entities/my-book-history";

import { deleteMyBookService } from "../api";

export const useDeleteMyBook = () => {
  const { deleteMyBook } = deleteMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    void,
    APIError,
    number,
    {
      previousDetail: MyBookDetailDTO | null | undefined;
      isbn?: string;
    }
  >({
    mutationFn: async (id) => await deleteMyBook(id),
    onMutate: async (id) => {
      const detailKey = myBookQueryKeys.detail(id).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail =
        queryClient.getQueryData<MyBookDetailDTO>(detailKey);

      let isbn = previousDetail?.book.isbn;

      if (!isbn) {
        const existQueries = queryClient.getQueriesData<MyBookDetailDTO>({
          queryKey: myBookQueryKeys.exist._def
        })
        const found = existQueries.find(([_, data]) => data?.id === id);
        isbn = found?.[1]?.book?.isbn;
      }

      if (isbn) {
        const existKey = myBookQueryKeys.exist(isbn).queryKey;
        await queryClient.cancelQueries({ queryKey: existKey });
        queryClient.setQueryData(existKey, null);
      }

      queryClient.setQueryData(detailKey, null);

      return { previousDetail, isbn };
    },
    onError: (_err, id, context) => {
      if (context) {
        const { previousDetail, isbn } = context;

        if (previousDetail) {
          queryClient.setQueryData(
            myBookQueryKeys.detail(id).queryKey,
            previousDetail
          );
        }

        if (isbn && previousDetail) {
          queryClient.setQueryData(
            myBookQueryKeys.exist(isbn).queryKey,
            previousDetail
          );
        }
      }
    },
    onSuccess: (_data, id, context) => {
      const { isbn } = context;

      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });

      if (isbn) {
        queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, null);
      }

      queryClient.removeQueries({ queryKey: myBookQueryKeys.detail(id).queryKey })
      queryClient.removeQueries({ queryKey: myBookReviewQueryKeys.detail(id).queryKey })
      queryClient.removeQueries({ queryKey: myBookHistoryQueryKeys.list(id).queryKey })
    }
  })
}