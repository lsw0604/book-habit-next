import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';
import { DEFAULT_LOGIN, loginSchema, LoginType } from '../../model/schema';

export const useLoginForm = (initialValue?: LoginType) =>
  useFormWithSchema(loginSchema, {
    defaultValues: initialValue ?? DEFAULT_LOGIN,
  });
