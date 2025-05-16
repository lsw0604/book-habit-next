import { useEffect } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';

interface UseAutoSubmitProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  onSubmit: (data: T) => void;
  dependencies: any[];
}

export function useAutoSubmit<T extends FieldValues>({
  watch,
  onSubmit,
  dependencies,
}: UseAutoSubmitProps<T>) {
  useEffect(() => {
    const subscription = watch(data => {
      onSubmit(data as T);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, ...dependencies]);
}
