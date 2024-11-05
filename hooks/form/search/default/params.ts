import { SearchParamsSchemaType } from '../schema/params.schema';

export const defaultSearchValue: SearchParamsSchemaType = {
  query: '',
  size: 10,
  sort: 'accuracy',
  target: 'title',
};
