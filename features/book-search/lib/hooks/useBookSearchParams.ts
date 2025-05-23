import { useSearchParams } from 'next/navigation';
import { DEFAULT_BOOK_SEARCH_PARAMS } from '@/features/book-search/model/schema';
import {
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_SORT_VALUES,
  BOOK_SEARCH_TARGET_VALUES,
} from '@/features/book-search/constant';
import { SearchParamsType } from '@/schemas/search/params';
import { parseParam } from '@/shared/utils/parse-param';

export const useBookSearchParams = () => {
  const searchParams = useSearchParams();

  const sizeParser = (size: string): number => {
    const num: number = parseInt(size, 10);
    if (isNaN(num)) return DEFAULT_BOOK_SEARCH_PARAMS.size;
    return num >= BOOK_SEARCH_MIN_SIZE && num <= BOOK_SEARCH_MAX_SIZE
      ? num
      : DEFAULT_BOOK_SEARCH_PARAMS.size;
  };

  const queryParser = (query: string): string => {
    return query || DEFAULT_BOOK_SEARCH_PARAMS.query;
  };

  const sortParser = (sort: string): SearchParamsType['sort'] => {
    return BOOK_SEARCH_SORT_VALUES.includes(sort as SearchParamsType['sort'])
      ? (sort as SearchParamsType['sort'])
      : DEFAULT_BOOK_SEARCH_PARAMS.sort;
  };

  const targetParser = (target: string): SearchParamsType['target'] => {
    return BOOK_SEARCH_TARGET_VALUES.includes(
      target as SearchParamsType['target']
    )
      ? (target as SearchParamsType['target'])
      : DEFAULT_BOOK_SEARCH_PARAMS.target;
  };

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
