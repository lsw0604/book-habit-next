import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query';

import type { BookDetailDTO } from '../api';
import { bookService } from '../api';
import type { BookDetail } from '../model';
import { toDetailBookViewModel } from '../lib';

export const useFetchBookDetail = (isbn: string) => {
  const { fetchBookDetail } = bookService;

  return useQuery<BookDetailDTO, AxiosError<ErrorDTO>, BookDetail>({
    queryKey: queryKeys.book.isbn(isbn).queryKey,
    queryFn: () => fetchBookDetail(isbn),
    select: toDetailBookViewModel,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });
};
