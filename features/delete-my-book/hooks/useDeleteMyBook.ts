import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APIError } from "@/shared/api/errors";
import { queryKeys } from "@/shared/query/keys";
import { MyBookDetail, toMyBookDetailViewModel } from "@/entities/my-book";

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
    mutationFn: async (payload) => await deleteMyBook(payload),
    onMutate: async (payload) => {
      const detailKey = queryKeys.myBook.detail(payload).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail = queryClient.getQueryData<MyBookDetail>(detailKey);
      const isbn = previousDetail?.book?.isbn;

      queryClient.setQueryData(detailKey, null);

      if (isbn) {
        queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, null);
      }

      return { previousDetail, isbn };
    },
    onError: (_err, id, context) => {
      if (context) {
        const { previousDetail, isbn } = context;
        queryClient.setQueryData(
          queryKeys.myBook.detail(id).queryKey,
          previousDetail
        );

        if (isbn) {
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
      queryClient.setQueryData(queryKeys.myBook.detail(id).queryKey, null);
      
      if (context && isbn) {
        queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, null);
      }
    }
  })
}