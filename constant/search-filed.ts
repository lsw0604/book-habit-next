import { SearchParamsType } from '@/schemas/search/params';

export const SEARCH_FIELDS: Array<keyof SearchParamsType> = [
  'query',
  'size',
  'sort',
  'target',
] as const;

export const SEARCH_SORT_FIELDS: SearchParamsType['sort'][] = [
  'accuracy',
  'latest',
] as const;

export const SEARCH_TARGET_FIELDS: SearchParamsType['target'][] = [
  'isbn',
  'person',
  'publisher',
  'title',
] as const;
