import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';
import { queryKeys } from '@/shared/query';

import { type BookDetailDTO, bookService } from '../api';
import type { BookDetail } from '../model';
import { toDetailBookViewModel } from '../lib';

export const useFetchBookDetail = (isbn: string) => {
  const { fetchBookDetail } = bookService;

  return useQuery<BookDetailDTO, APIError, BookDetail>({
    queryKey: queryKeys.book.isbn(isbn).queryKey,
    queryFn: () => fetchBookDetail(isbn),
    select: toDetailBookViewModel,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });
};
