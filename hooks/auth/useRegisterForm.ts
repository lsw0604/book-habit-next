import useFormWithSchema from '../form/useFormWithSchema';
import {
  DEFAULT_AUTH_REGISTER,
  AuthRegisterType,
  authRegisterSchema,
} from '@/schemas/auth/register';

const useRegisterForm = (initialValue?: AuthRegisterType) =>
  useFormWithSchema(authRegisterSchema, initialValue ?? DEFAULT_AUTH_REGISTER);

export default useRegisterForm;
