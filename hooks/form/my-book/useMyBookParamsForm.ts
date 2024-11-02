import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookParamsValue } from './default/params';
import {
  myBookParamsSchema,
  MyBookParamsSchemaType,
} from './schema/params.schema';

const useMyBookParamsForm = (initialValue?: MyBookParamsSchemaType) =>
  useFormWithSchema(
    myBookParamsSchema,
    initialValue ?? defaultMyBookParamsValue
  );

export default useMyBookParamsForm;
