import { SearchType } from '@/schemas/search.schema';

export const getSearchParams = (searchParams: URLSearchParams): SearchType => {
  const query = searchParams.get('query') || '';
  const size = Number(searchParams.get('size') || 10);
  const sort = (searchParams.get('sort') as SearchType['sort']) || 'accuracy';
  const target =
    (searchParams.get('target') as SearchType['target']) || 'title';

  return { query, size, sort, target };
};
