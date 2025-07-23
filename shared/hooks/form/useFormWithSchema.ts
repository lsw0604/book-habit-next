import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldErrors,
  useForm,
  UseFormReturn,
  DefaultValues,
} from 'react-hook-form';
import { ZodSchema, infer as InferZodType } from 'zod';

interface UseFormWithSchemaOptions<T> {
  defaultValues: DefaultValues<T>;
  resetOnSubmit?: boolean; // 제출 후 자동 리셋 옵션
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}

export function useFormWithSchema<T extends ZodSchema>(
  schema: T,
  options: UseFormWithSchemaOptions<InferZodType<T>>
): UseFormReturn<InferZodType<T>> & {
  resetForm: () => void;
} {
  const {
    mode = 'onSubmit', // 기본값으로 'onSubmit'을 사용하여 입력 중에는 유효성 검사가 실행되지 않도록 함
    defaultValues,
    resetOnSubmit = false,
  } = options;

  const methods = useForm<InferZodType<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  // 확장된 handleSubmit 함수로 감싸서 제출 후 상태 리셋 처리
  const originalHandleSubmit = methods.handleSubmit;

  const handleSubmitWithReset = (
    onValid: (data: InferZodType<T>) => void,
    onInvalid?: (errors: FieldErrors<InferZodType<T>>) => void
  ) =>
    originalHandleSubmit(data => {
      onValid(data);
      // resetOnSubmit이 true이면 제출 후 폼 리셋
      if (resetOnSubmit) {
        methods.reset(defaultValues);
      }
    }, onInvalid);

  // 명시적 리셋 함수 추가
  const resetForm = () => methods.reset(defaultValues);

  return {
    ...methods,
    handleSubmit: handleSubmitWithReset,
    resetForm,
  };
}
