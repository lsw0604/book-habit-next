import { useSearchParams } from 'next/navigation';
import {
  DEFAULT_SEARCH_PARAMS,
  SearchParamsType,
} from '@/schemas/search/params';
import { parseParam } from '@/utils/params';

const ALLOWED_SORT_VALUES = ['accuracy', 'latest'] as const;
const ALLOWED_TARGET_VALUES = ['title', 'isbn', 'publisher', 'person'] as const;
const MIN_SIZE = 10;
const MAX_SIZE = 50;

export default function useParsedSearchParams(): SearchParamsType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string): number => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return DEFAULT_SEARCH_PARAMS.size;
    return num >= MIN_SIZE && num <= MAX_SIZE
      ? num
      : DEFAULT_SEARCH_PARAMS.size;
  };

  const queryParser = (query: string): string => {
    return query || DEFAULT_SEARCH_PARAMS.query;
  };

  const sortParser = (sort: string): SearchParamsType['sort'] => {
    return ALLOWED_SORT_VALUES.includes(sort as SearchParamsType['sort'])
      ? (sort as SearchParamsType['sort'])
      : DEFAULT_SEARCH_PARAMS.sort;
  };

  const targetParser = (target: string): SearchParamsType['target'] => {
    return ALLOWED_TARGET_VALUES.includes(target as SearchParamsType['target'])
      ? (target as SearchParamsType['target'])
      : DEFAULT_SEARCH_PARAMS.target;
  };

  return {
    query: parseParam(
      searchParams,
      'query',
      queryParser,
      DEFAULT_SEARCH_PARAMS.query
    ),
    size: parseParam(
      searchParams,
      'size',
      sizeParser,
      DEFAULT_SEARCH_PARAMS.size
    ),
    sort: parseParam(
      searchParams,
      'sort',
      sortParser,
      DEFAULT_SEARCH_PARAMS.sort
    ),
    target: parseParam(
      searchParams,
      'target',
      targetParser,
      DEFAULT_SEARCH_PARAMS.target
    ),
  };
}
