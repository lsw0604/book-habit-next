import {
  registerSchema,
  RegisterSchemaType,
  defaultRegisterValues,
} from '@/schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useRegisterForm = () => {
  return useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterValues,
  });
};
