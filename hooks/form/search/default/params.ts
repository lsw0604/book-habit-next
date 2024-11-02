import { SearchSchemaType } from '../schema/params.schema';

export const defaultSearchValue: SearchSchemaType = {
  query: '',
  size: 10,
  sort: 'accuracy',
  target: 'title',
};
