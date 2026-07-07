import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import {
  type RegisterType,
  DEFAULT_REGISTER,
  registerSchema,
} from '../model';

export const useRegisterForm = (initialValue?: RegisterType) =>
  useFormWithSchema(registerSchema, {
    defaultValues: initialValue ?? DEFAULT_REGISTER,
  });
