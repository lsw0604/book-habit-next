import {
  defaultLoginValues,
  loginSchema,
  LoginSchemaType,
} from '@/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  return useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });
};
