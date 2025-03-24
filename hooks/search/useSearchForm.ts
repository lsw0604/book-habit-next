import useFormWithSchema from '../form/useFormWithSchema';
import {
  searchParamsSchema,
  DEFAULT_SEARCH_PARAMS,
  SearchParamsType,
} from '@/schemas/search/params';

export const useSearchForm = (initialValue?: SearchParamsType) =>
  useFormWithSchema(searchParamsSchema, initialValue ?? DEFAULT_SEARCH_PARAMS);
