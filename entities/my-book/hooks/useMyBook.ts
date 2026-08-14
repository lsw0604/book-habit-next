import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { myBookQueryKeys, myBookService, type MyBookDetailDTO } from '../api';
import { toMyBookDetailViewModel } from '../lib';
import type { MyBookDetail } from '../model';

export const useMyBook = (myBookId: number) => {
  const { getMyBook } = myBookService;

  return useQuery<MyBookDetailDTO, APIError, MyBookDetail>({
    queryKey: myBookQueryKeys.detail(myBookId).queryKey,
    queryFn: () => getMyBook(myBookId),
    select: toMyBookDetailViewModel,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};
