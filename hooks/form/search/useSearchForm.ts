import useFormWithSchema from '../useFormWithSchema';
import { defaultSearchValue } from './default/params';
import { SearchSchemaType, searchSchema } from './schema/params.schema';

const useSearchForm = (initialValue?: SearchSchemaType) =>
  useFormWithSchema(searchSchema, initialValue ?? defaultSearchValue);

export default useSearchForm;
