import { useSearchParams } from 'next/navigation';
import { defaultSearchValues, SearchSchemaType } from '@/schemas/search.schema';
import { parseParam } from '@/utils/params';

const ALLOWED_SORT_VALUES = ['accuracy', 'latest'] as const;
const ALLOWED_TARGET_VALUES = ['title', 'isbn', 'publisher', 'person'] as const;
const MIN_SIZE = 10;
const MAX_SIZE = 50;

export default function searchParams(): SearchSchemaType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string): number => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return defaultSearchValues.size;
    return num >= MIN_SIZE && num <= MAX_SIZE ? num : defaultSearchValues.size;
  };

  const queryParser = (query: string): string => {
    return query || defaultSearchValues.query;
  };

  const sortParser = (sort: string): SearchSchemaType['sort'] => {
    return ALLOWED_SORT_VALUES.includes(sort as SearchSchemaType['sort'])
      ? (sort as SearchSchemaType['sort'])
      : defaultSearchValues.sort;
  };

  const targetParser = (target: string): SearchSchemaType['target'] => {
    return ALLOWED_TARGET_VALUES.includes(target as SearchSchemaType['target'])
      ? (target as SearchSchemaType['target'])
      : defaultSearchValues.target;
  };

  return {
    query: parseParam(
      searchParams,
      'query',
      queryParser,
      defaultSearchValues.query
    ),
    size: parseParam(
      searchParams,
      'size',
      sizeParser,
      defaultSearchValues.size
    ),
    sort: parseParam(
      searchParams,
      'sort',
      sortParser,
      defaultSearchValues.sort
    ),
    target: parseParam(
      searchParams,
      'target',
      targetParser,
      defaultSearchValues.target
    ),
  };
}
