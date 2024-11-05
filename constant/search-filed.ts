import { SearchParamsSchemaType } from '@/hooks/form/search/schema/params.schema';

export const SEARCH_FIELDS: Array<keyof SearchParamsSchemaType> = [
  'query',
  'size',
  'sort',
  'target',
] as const;

export const SEARCH_SORT_FIELDS: SearchParamsSchemaType['sort'][] = [
  'accuracy',
  'latest',
] as const;

export const SEARCH_TARGET_FIELDS: SearchParamsSchemaType['target'][] = [
  'isbn',
  'person',
  'publisher',
  'title',
] as const;
