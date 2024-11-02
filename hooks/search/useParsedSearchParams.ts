import { useSearchParams } from 'next/navigation';
import { parseParam } from '@/utils/params';
import { defaultSearchValue } from '../form/search/default/params';
import { SearchSchemaType } from '../form/search/schema/params.schema';

const ALLOWED_SORT_VALUES = ['accuracy', 'latest'] as const;
const ALLOWED_TARGET_VALUES = ['title', 'isbn', 'publisher', 'person'] as const;
const MIN_SIZE = 10;
const MAX_SIZE = 50;

export default function useParsedSearchParams(): SearchSchemaType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string): number => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return defaultSearchValue.size;
    return num >= MIN_SIZE && num <= MAX_SIZE ? num : defaultSearchValue.size;
  };

  const queryParser = (query: string): string => {
    return query || defaultSearchValue.query;
  };

  const sortParser = (sort: string): SearchSchemaType['sort'] => {
    return ALLOWED_SORT_VALUES.includes(sort as SearchSchemaType['sort'])
      ? (sort as SearchSchemaType['sort'])
      : defaultSearchValue.sort;
  };

  const targetParser = (target: string): SearchSchemaType['target'] => {
    return ALLOWED_TARGET_VALUES.includes(target as SearchSchemaType['target'])
      ? (target as SearchSchemaType['target'])
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
