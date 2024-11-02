import useFormWithSchema from '../useFormWithSchema';
import { RegisterSchemaType, registerSchema } from './schema/register.schema';
import { defaultRegisterValue } from './default/register';

const useRegisterForm = (initialValue?: RegisterSchemaType) =>
  useFormWithSchema(registerSchema, initialValue ?? defaultRegisterValue);

export default useRegisterForm;
