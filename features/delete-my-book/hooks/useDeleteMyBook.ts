import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { APIError } from "@/shared/api";
import { queryKeys } from "@/shared/query/keys";
import { MyBookDetail } from "@/entities/my-book";

import { deleteMyBookService } from "../api";

export const useDeleteMyBook = () => {
  const { deleteMyBook } = deleteMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    void,
    APIError,
    number,
    {
      previousDetail: MyBookDetail | null | undefined;
      isbn?: string;
    }
  >({
    mutationFn: async (id) => await deleteMyBook(id),
    onMutate: async (id) => {
      const detailKey = queryKeys.myBook.detail(id).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail = queryClient.getQueryData<MyBookDetail>(detailKey);

      let isbn = previousDetail?.book.isbn;

      if (!isbn) {
        const existQueries = queryClient.getQueriesData<MyBookDetail>({
          queryKey: queryKeys.myBook.exist._def
        })
        const found = existQueries.find(([_, data]) => data?.id === id);
        isbn = found?.[1]?.book?.isbn;
      }

      if (isbn) {
        const existKey = queryKeys.myBook.exist(isbn).queryKey;
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
            queryKeys.myBook.detail(id).queryKey,
            previousDetail
          );
        }

        if (isbn && previousDetail) {
          queryClient.setQueryData(
            queryKeys.myBook.exist(isbn).queryKey,
            previousDetail
          );
        }
      }
    },
    onSuccess: (_data, id, context) => {
      const { isbn } = context;

      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.list._def });

      if (isbn) {
        queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, null);
      }

      queryClient.removeQueries({ queryKey: queryKeys.myBook.detail(id).queryKey })
      queryClient.removeQueries({ queryKey: queryKeys.myBookReview.detail(id).queryKey })
      queryClient.removeQueries({ queryKey: queryKeys.myBookHistory.list(id).queryKey })
    }
  })
}