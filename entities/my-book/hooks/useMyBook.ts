import { useQuery } from '@tanstack/react-query';

import { type APIError, useApiStatus } from '@/shared/api';
import { queryKeys } from '@/shared/query/keys';

import { myBookService } from '../api';
import { toMyBookDetailViewModel } from '../lib';
import type { MyBookDetail } from '../model';

export const useMyBook = (myBookId: number) => {
  const { getMyBook } = myBookService;
  const { isInitialized } = useApiStatus();
  return useQuery<MyBookDetailDTO, APIError, MyBookDetail>({
    queryKey: queryKeys.myBook.detail(myBookId).queryKey,
    queryFn: async () => {
      const myBook = await getMyBook(myBookId);
      return toMyBookDetailViewModel(myBook);
    },
    enabled: isInitialized,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};
