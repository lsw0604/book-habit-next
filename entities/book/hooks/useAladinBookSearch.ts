import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query';

import { type ResponseAladinDTO, bookService } from '../api';
import { toDetailBookViewModel } from '../lib';
import { BookDetail } from '../model';

export const useAladinBookSearch = (isbn: string) => {
  const { aladinSearch } = bookService;

  return useQuery<ResponseAladinDTO, AxiosError<ErrorDTO>, BookDetail>({
    queryKey: queryKeys.book.isbn(isbn).queryKey,
    queryFn: () => aladinSearch(isbn),
    select: toDetailBookViewModel,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });
};
