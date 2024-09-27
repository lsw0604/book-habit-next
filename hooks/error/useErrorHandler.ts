import { useEffect } from 'react';
import { AxiosError } from 'axios';
import useToastHook from '@/hooks/toast/useToastHook';

export default function useErrorHandler(
  isError: boolean,
  error: Error | null | AxiosError<NestServerErrorType>
) {
  const { errorToast } = useToastHook();

  useEffect(() => {
    if (isError && error instanceof Error) {
      errorToast(error.message);
    }

    if (isError && error instanceof AxiosError && error.response) {
      errorToast(error.response.data.message);
    }
  }, [isError, error]);
}
