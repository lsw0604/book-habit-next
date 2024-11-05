import { useSearchParams } from 'next/navigation';
import { parseParam } from '@/utils/params';
import { defaultSearchValue } from '../form/search/default/params';
import { SearchParamsSchemaType } from '../form/search/schema/params.schema';

const ALLOWED_SORT_VALUES = ['accuracy', 'latest'] as const;
const ALLOWED_TARGET_VALUES = ['title', 'isbn', 'publisher', 'person'] as const;
const MIN_SIZE = 10;
const MAX_SIZE = 50;

export default function useParsedSearchParams(): SearchParamsSchemaType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string): number => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return defaultSearchValue.size;
    return num >= MIN_SIZE && num <= MAX_SIZE ? num : defaultSearchValue.size;
  };

  const queryParser = (query: string): string => {
    return query || defaultSearchValue.query;
  };

  const sortParser = (sort: string): SearchParamsSchemaType['sort'] => {
    return ALLOWED_SORT_VALUES.includes(sort as SearchParamsSchemaType['sort'])
      ? (sort as SearchParamsSchemaType['sort'])
      : defaultSearchValue.sort;
  };

  const targetParser = (target: string): SearchParamsSchemaType['target'] => {
    return ALLOWED_TARGET_VALUES.includes(
      target as SearchParamsSchemaType['target']
    )
      ? (target as SearchParamsSchemaType['target'])
      : defaultSearchValue.target;
  };

  return {
    query: parseParam(
      searchParams,
      'query',
      queryParser,
      defaultSearchValue.query
    ),
    size: parseParam(searchParams, 'size', sizeParser, defaultSearchValue.size),
    sort: parseParam(searchParams, 'sort', sortParser, defaultSearchValue.sort),
    target: parseParam(
      searchParams,
      'target',
      targetParser,
      defaultSearchValue.target
    ),
  };
}
