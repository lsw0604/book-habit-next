import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query';

import { bookService, type BookDTO, type FindOrCreatePayload } from '../api';

export const useAddBook = (
  options?: Omit<
    UseMutationOptions<BookDTO, AxiosError<ErrorDTO>, FindOrCreatePayload>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<BookDTO, AxiosError<ErrorDTO>, FindOrCreatePayload>({
    mutationFn: (payload: FindOrCreatePayload) =>
      bookService.findOrCreate(payload),
    ...options,
    onSuccess: (data, variables, context) => {
      const existBook = queryClient.getQueryData<BookDTO>(
        queryKeys.book.detail(data.id).queryKey
      );

      if (!existBook) {
        queryClient.setQueryData(
          queryKeys.book.detail(data.id).queryKey,
          data
        );
      }

      options?.onSuccess?.(data, variables, context);
    },
  });
};