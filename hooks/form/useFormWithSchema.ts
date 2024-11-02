import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ZodSchema, infer as InferZodType } from 'zod';

export default function useFormWithSchema<T extends ZodSchema>(
  schema: T,
  defaultValues: InferZodType<T>
): UseFormReturn<InferZodType<T>> {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
