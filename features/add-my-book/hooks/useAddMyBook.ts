import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddFinishedPayload, addMyBookService } from "../api"
import { APIError } from "@/shared/api/errors";
import { MyBookDetail, toMyBookDetailViewModel } from "@/entities/my-book";
import { queryKeys } from "@/shared/query/keys";

export const useAddWantToRead = () => {
  const { addWantToRead } = addMyBookService;
  const queryClient = useQueryClient();
  
  return useMutation<
    MyBookDetail, 
    APIError, 
    string,
    { previous: MyBookDetail | null | undefined }
  >({
    mutationFn: async (isbn) => {
      const rawMyBook = await addWantToRead(isbn);
      return toMyBookDetailViewModel(rawMyBook);
    },
    onMutate: async (isbn) => {
      const existKey = queryKeys.myBook.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.list._def })
      queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, response);
    }
  })
}

export const useAddReadingBook = () => {
  const { addReading } = addMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetail, 
    APIError, 
    string,
    { previous: MyBookDetail | null | undefined }
  >({
    mutationFn: async (isbn) => {
      const rawMyBook = await addReading(isbn);
      return toMyBookDetailViewModel(rawMyBook);
    },
    onMutate: async (isbn) => {
      const existKey = queryKeys.myBook.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.list._def })
      queryClient.setQueryData(queryKeys.myBook.exist(isbn).queryKey, response);
    }
  })
}

export const useAddFinishedBook = () => {
  const { addFinished } = addMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetail, 
    APIError, 
    AddFinishedPayload,
    { previous: MyBookDetail | null | undefined }
  >({
    mutationFn: async (payload) => {
      const rawMyBook = await addFinished(payload);
      return toMyBookDetailViewModel(rawMyBook);
    },
    onMutate: async (payload) => {
      const existKey = queryKeys.myBook.exist(payload.isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, payload, context) => {
      if (context) {
        queryClient.setQueryData(queryKeys.myBook.exist(payload.isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.list._def })
      queryClient.setQueryData(queryKeys.myBook.exist(payload.isbn).queryKey, response);
    }
  })
}
