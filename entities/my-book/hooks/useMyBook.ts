import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query/keys';

import {
  type GetMyBookPayload,
  type MyBookDetailDTO,
  myBookService,
} from '../api';
import { MyBookDetail, toMyBookDetailViewModel } from '../model';

export const useMyBook = (payload: GetMyBookPayload) => {
  const { getMyBook } = myBookService;
  const { isInitialized } = useApiStatus();
  return useQuery<MyBookDetailDTO, AxiosError<ErrorDTO>, MyBookDetail>({
    queryKey: queryKeys.myBook.detail(payload.myBookId).queryKey,
    queryFn: () => getMyBook(payload),
    enabled: isInitialized,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    select: response => toMyBookDetailViewModel(response),
  });
};
