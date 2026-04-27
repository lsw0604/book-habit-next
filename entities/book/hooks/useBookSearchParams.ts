'use client';

import { useSearchParams } from 'next/navigation';
import { bookSearchParamsSchema, BookSearchParams } from '../model';

export type UseBookSearchParamsResult = BookSearchParams;

export const useBookSearchParams = (): UseBookSearchParamsResult => {
  const searchParams = useSearchParams();

  return bookSearchParamsSchema.parse(Object.fromEntries(searchParams.entries()));
};
