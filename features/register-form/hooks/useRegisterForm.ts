import {
  type RegisterType,
  DEFAULT_REGISTER,
  registerSchema,
} from '@/entities/auth/model';
import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

export const useRegisterForm = (initialValue?: RegisterType) =>
  useFormWithSchema(registerSchema, {
    defaultValues: initialValue ?? DEFAULT_REGISTER,
  });
