import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

import {
  type GetMyBookPayload,
  type MyBookDetailDTO,
  myBookService,
} from '../api';
import { MyBookDetail, toMyBookDetailViewModel } from '../model';

export const useMyBook = (payload: GetMyBookPayload) => {
  const { getMyBook } = myBookService;
  return useQuery<MyBookDetailDTO, AxiosError<ErrorResponseDTO>, MyBookDetail>({
    queryKey: queryKeys.myBook.detail(payload.myBookId).queryKey,
    queryFn: () => getMyBook(payload),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    select: response => toMyBookDetailViewModel(response),
  });
};
