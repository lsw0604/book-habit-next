import { SearchSchemaType } from '@/schemas/search.schema';

export const SEARCH_FIELDS: Array<keyof SearchSchemaType> = [
  'query',
  'size',
  'sort',
  'target',
] as const;
