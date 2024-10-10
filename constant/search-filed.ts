import { SearchSchemaType } from '@/schemas/search.schema';

export const SEARCH_FIELDS: Array<keyof SearchSchemaType> = [
  'query',
  'size',
  'sort',
  'target',
] as const;

export const SEARCH_SORT_FIELDS: SearchSchemaType['sort'][] = [
  'accuracy',
  'latest',
] as const;

export const SEARCH_TARGET_FIELDS: SearchSchemaType['target'][] = [
  'isbn',
  'person',
  'publisher',
  'title',
] as const;
