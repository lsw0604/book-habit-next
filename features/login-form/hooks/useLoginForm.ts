import {
  type LoginType,
  loginSchema,
  DEFAULT_LOGIN,
} from '@/entities/auth/model';
import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

export const useLoginForm = (initialValue?: LoginType) =>
  useFormWithSchema(loginSchema, {
    defaultValues: initialValue ?? DEFAULT_LOGIN,
  });
