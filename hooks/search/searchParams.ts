import { useSearchParams } from 'next/navigation';
import { SearchSchemaType } from '@/schemas/search.schema';

const DEFAULT_SIZE = 10;
const DEFAULT_SORT = 'accuracy';
const DEFAULT_TARGET = 'title';

export default function searchParams(): SearchSchemaType {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const size = Number(searchParams.get('size') || DEFAULT_SIZE);
  const sort =
    (searchParams.get('sort') as SearchSchemaType['sort']) || DEFAULT_SORT;
  const target =
    (searchParams.get('target') as SearchSchemaType['target']) ||
    DEFAULT_TARGET;

  return { query, size, sort, target };
}
