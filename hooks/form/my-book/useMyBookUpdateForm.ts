import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookUpdateValue } from './default/update';
import {
  myBookUpdateSchema,
  MyBookUpdateSchemaType,
} from './schema/update.schema';

const useMyBookUpdateForm = (initialValue?: MyBookUpdateSchemaType) =>
  useFormWithSchema(
    myBookUpdateSchema,
    initialValue ?? defaultMyBookUpdateValue
  );

export default useMyBookUpdateForm;
