'use client';

import { useSearchParams } from 'next/navigation';

import { Sort, Target } from '@/entities/book';
import { parseParam } from '@/shared/utils';

import {
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_SORT_VALUES,
  BOOK_SEARCH_TARGET_VALUES,
} from '../constants';
import { DEFAULT_BOOK_SEARCH_PARAMS, BookSearchParamsType } from '../schemas';

export interface ReturnUseBookSearchParams {
  query: string;
  size: number;
  sort: Sort;
  target: Target;
}

export const useBookSearchParams: () => ReturnUseBookSearchParams =
  (): ReturnUseBookSearchParams => {
    const searchParams = useSearchParams();

    const sizeParser = (size: string): number => {
      const num: number = parseInt(size, 10);
      if (Number.isNaN(num)) return DEFAULT_BOOK_SEARCH_PARAMS.size;
      return num >= BOOK_SEARCH_MIN_SIZE && num <= BOOK_SEARCH_MAX_SIZE
        ? num
        : DEFAULT_BOOK_SEARCH_PARAMS.size;
    };

    const queryParser = (query: string): string =>
      query || DEFAULT_BOOK_SEARCH_PARAMS.query;

    const sortParser = (sort: string): BookSearchParamsType['sort'] =>
      BOOK_SEARCH_SORT_VALUES.includes(sort as BookSearchParamsType['sort'])
        ? (sort as BookSearchParamsType['sort'])
        : DEFAULT_BOOK_SEARCH_PARAMS.sort;

    const targetParser = (target: string): BookSearchParamsType['target'] =>
      BOOK_SEARCH_TARGET_VALUES.includes(
        target as BookSearchParamsType['target']
      )
        ? (target as BookSearchParamsType['target'])
        : DEFAULT_BOOK_SEARCH_PARAMS.target;

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
