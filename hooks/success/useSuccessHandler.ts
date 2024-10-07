import { useEffect } from 'react';
import useToastHook from '@/hooks/toast/useToastHook';

interface UseSuccessHandlerProps<T> {
  isSuccess: boolean;
  message: T;
}

export default function useSuccessHandler<T>({
  isSuccess,
  message,
}: UseSuccessHandlerProps<T>) {
  const { successToast } = useToastHook();

  useEffect(() => {
    if (isSuccess) {
      successToast(message as string);
    }
  }, [isSuccess, message]);
}
