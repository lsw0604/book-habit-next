/* eslint-disable no-underscore-dangle -- _def is query-key-factory's API */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myBookQueryKeys, type MyBookDetailDTO } from '@/entities/my-book';
import type { APIError } from '@/shared/api';

import { AddFinishedPayload, addMyBookService } from '../api';

export const useAddWantToRead = () => {
  const { addWantToRead } = addMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetailDTO,
    APIError,
    string,
    { previous: MyBookDetailDTO | null | undefined }
  >({
    mutationFn: isbn => addWantToRead(isbn),
    onMutate: async isbn => {
      const existKey = myBookQueryKeys.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous =
        queryClient.getQueryData<MyBookDetailDTO | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(
          myBookQueryKeys.exist(isbn).queryKey,
          context.previous
        );
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });
      queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, response);
      queryClient.setQueryData(
        myBookQueryKeys.detail(response.id).queryKey,
        response
      );
    },
  });
};

export const useAddReadingBook = () => {
  const { addReading } = addMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetailDTO,
    APIError,
    string,
    { previous: MyBookDetailDTO | null | undefined }
  >({
    mutationFn: isbn => addReading(isbn),
    onMutate: async isbn => {
      const existKey = myBookQueryKeys.exist(isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous =
        queryClient.getQueryData<MyBookDetailDTO | null>(existKey);

      return { previous };
    },
    onError: (_err, isbn, context) => {
      if (context) {
        queryClient.setQueryData(
          myBookQueryKeys.exist(isbn).queryKey,
          context.previous
        );
      }
    },
    onSuccess: (response, isbn) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });
      queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, response);
      queryClient.setQueryData(
        myBookQueryKeys.detail(response.id).queryKey,
        response
      );
    },
  });
};

export const useAddFinishedBook = () => {
  const { addFinished } = addMyBookService;
  const queryClient = useQueryClient();

  return useMutation<
    MyBookDetailDTO,
    APIError,
    AddFinishedPayload,
    { previous: MyBookDetailDTO | null | undefined }
  >({
    mutationFn: payload => addFinished(payload),
    onMutate: async payload => {
      const existKey = myBookQueryKeys.exist(payload.isbn).queryKey;
      await queryClient.cancelQueries({ queryKey: existKey });

      const previous =
        queryClient.getQueryData<MyBookDetailDTO | null>(existKey);

      return { previous };
    },
    onError: (_err, payload, context) => {
      if (context) {
        queryClient.setQueryData(
          myBookQueryKeys.exist(payload.isbn).queryKey,
          context.previous
        );
      }
    },
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });
      queryClient.setQueryData(
        myBookQueryKeys.exist(payload.isbn).queryKey,
        response
      );
      queryClient.setQueryData(
        myBookQueryKeys.detail(response.id).queryKey,
        response
      );
    },
  });
};
