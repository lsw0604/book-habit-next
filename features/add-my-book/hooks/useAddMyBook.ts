import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { APIError } from "@/shared/api";
import { myBookQueryKeys, type MyBookDetail, toMyBookDetailViewModel } from "@/entities/my-book";

import { AddFinishedPayload, addMyBookService } from "../api"

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
      const existKey = myBookQueryKeys.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def })
      queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, response);
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
      const existKey = myBookQueryKeys.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def })
      queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, response);
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
      const existKey = myBookQueryKeys.exist(payload.isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous = queryClient.getQueryData<MyBookDetail | null>(existKey);

      return { previous };
    },
    onError: (_err, payload, context) => {
      if (context) {
        queryClient.setQueryData(myBookQueryKeys.exist(payload.isbn).queryKey, context.previous);
      }
    },
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def })
      queryClient.setQueryData(myBookQueryKeys.exist(payload.isbn).queryKey, response);
    }
  })
}
