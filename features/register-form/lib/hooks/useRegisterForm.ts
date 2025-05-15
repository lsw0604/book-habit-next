import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';
import {
  DEFAULT_REGISTER,
  RegisterType,
  registerSchema,
} from '../../model/schema';

export const useRegisterForm = (initialValue?: RegisterType) =>
  useFormWithSchema(registerSchema, {
    defaultValues: initialValue ?? DEFAULT_REGISTER,
  });
