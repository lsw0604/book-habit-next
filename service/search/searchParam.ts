import { SearchSchemaType } from '@/schemas/search.schema';

export const searchParam = (
  searchParams: URLSearchParams
): SearchSchemaType => {
  const query = searchParams.get('query') || '';
  const size = Number(searchParams.get('size') || 10);
  const sort =
    (searchParams.get('sort') as SearchSchemaType['sort']) || 'accuracy';
  const target =
    (searchParams.get('target') as SearchSchemaType['target']) || 'title';

  return { query, size, sort, target };
};
