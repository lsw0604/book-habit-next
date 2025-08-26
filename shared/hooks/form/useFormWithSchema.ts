import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldErrors,
  useForm,
  UseFormReturn,
  DefaultValues,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';
import { ZodSchema, infer as InferZodType } from 'zod';

interface UseFormWithSchemaOptions<T extends FieldValues>
  extends Pick<UseFormProps<T>, 'values' | 'mode'> {
  defaultValues: DefaultValues<T>;
  resetOnSubmit?: boolean;
}

export function useFormWithSchema<T extends ZodSchema>(
  schema: T,
  options: UseFormWithSchemaOptions<InferZodType<T>>
): UseFormReturn<InferZodType<T>> & {
  resetForm: () => void;
} {
  const {
    mode = 'onSubmit',
    defaultValues,
    resetOnSubmit = false,
    values,
  } = options;

  const methods = useForm<InferZodType<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    values,
  });

  const originalHandleSubmit = methods.handleSubmit;

  const handleSubmitWithReset = (
    onValid: (data: InferZodType<T>) => void,
    onInvalid?: (errors: FieldErrors<InferZodType<T>>) => void
  ) =>
    originalHandleSubmit(data => {
      onValid(data);
      if (resetOnSubmit) {
        methods.reset(defaultValues);
      }
    }, onInvalid);

  const resetForm = () => methods.reset(defaultValues);

  return {
    ...methods,
    handleSubmit: handleSubmitWithReset,
    resetForm,
  };
}
