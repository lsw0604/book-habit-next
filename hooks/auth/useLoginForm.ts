import useFormWithSchema from '../form/useFormWithSchema';
import {
  DEFAULT_AUTH_LOGIN,
  AuthLoginType,
  authLoginSchema,
} from '@/schemas/auth/login';

const useLoginForm = (initialValue?: AuthLoginType) =>
  useFormWithSchema(authLoginSchema, initialValue ?? DEFAULT_AUTH_LOGIN);

export default useLoginForm;
