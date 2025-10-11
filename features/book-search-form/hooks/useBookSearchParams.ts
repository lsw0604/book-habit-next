'use client';

import { useSearchParams } from 'next/navigation';

import { parseParam } from '@/shared/utils';

import { queryParser, sizeParser, sortParser, targetParser } from '../lib';
import { Sort, Target } from '../model';
import { DEFAULT_BOOK_SEARCH_PARAMS } from '../schemas';

export interface UseBookSearchParamsResult {
  query: string;
  size: number;
  sort: Sort;
  target: Target;
}

export const useBookSearchParams = (): UseBookSearchParamsResult => {
  const searchParams = useSearchParams();

  return {
    query: parseParam(
      searchParams,
      'query',
      queryParser,
      DEFAULT_BOOK_SEARCH_PARAMS.query
    ),
    size: parseParam(
      searchParams,
      'size',
      sizeParser,
      DEFAULT_BOOK_SEARCH_PARAMS.size
    ),
    sort: parseParam(
      searchParams,
      'sort',
      sortParser,
      DEFAULT_BOOK_SEARCH_PARAMS.sort
    ),
    target: parseParam(
      searchParams,
      'target',
      targetParser,
      DEFAULT_BOOK_SEARCH_PARAMS.target
    ),
  };
};
