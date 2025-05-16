import type { MyBookDetail } from '../../api/types';
import type { AxiosError } from 'axios';
import type { ErrorResponseDto } from '@/shared/api/types/error';
import { useQuery } from '@tanstack/react-query';
import { myBookService } from '../../api';
import { queryKeys } from '@/shared/query/keys';

export const useMyBook = (myBookId: number) => {
  const { getMyBook } = myBookService;
  return useQuery<MyBookDetail, AxiosError<ErrorResponseDto>>({
    queryKey: queryKeys.myBook.detail(myBookId).queryKey,
    queryFn: () => getMyBook(myBookId),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};
