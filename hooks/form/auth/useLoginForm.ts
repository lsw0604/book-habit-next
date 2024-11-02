import useFormWithSchema from '../useFormWithSchema';

import { loginSchema, LoginSchemaType } from './schema/login.schema';
import { defaultLoginValue } from './default/login';

const useLoginForm = (initialValue?: LoginSchemaType) =>
  useFormWithSchema(loginSchema, initialValue ?? defaultLoginValue);

export default useLoginForm;
