import { ErrorMessage } from '@/shared/ui/error-message';
import { LoginFormErrorProps } from '../model/types';

export default function LoginFormError({
  error,
  isError,
}: LoginFormErrorProps) {
  if (!isError || !error?.response?.data?.message) return null;
  return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
}
