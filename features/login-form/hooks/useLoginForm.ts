import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import { type LoginType, DEFAULT_LOGIN, loginSchema } from '../schemas';

export const useLoginForm = (initialValue?: LoginType) =>
  useFormWithSchema(loginSchema, {
    defaultValues: initialValue ?? DEFAULT_LOGIN,
  });
