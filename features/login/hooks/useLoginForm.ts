import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import { type LoginType,loginSchema, DEFAULT_LOGIN } from '../model';

export const useLoginForm = (initialValue?: LoginType) =>
  useFormWithSchema(loginSchema, {
    defaultValues: initialValue ?? DEFAULT_LOGIN,
  });
