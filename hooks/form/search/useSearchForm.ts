import useFormWithSchema from '../useFormWithSchema';
import { defaultSearchValue } from './default/params';
import {
  SearchParamsSchemaType,
  searchParamsSchema,
} from './schema/params.schema';

const useSearchForm = (initialValue?: SearchParamsSchemaType) =>
  useFormWithSchema(searchParamsSchema, initialValue ?? defaultSearchValue);

export default useSearchForm;
