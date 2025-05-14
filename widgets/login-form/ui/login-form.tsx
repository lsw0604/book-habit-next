'use client';

import LoginButtons from './login-buttons';
import LoginEmailController from './login-email-controller';
import LoginFormError from './login-form-error';
import LoginPasswordController from './login-password-controller';
import {
  useLoginForm,
  useLoginFormSubmit,
} from '@/features/login-form/lib/hooks';

export default function LoginForm() {
  const { control, handleSubmit } = useLoginForm();
  const { onSubmit, isError, isPending, error } = useLoginFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginEmailController control={control} />
      <LoginPasswordController control={control} />
      <LoginFormError isError={isError} error={error} />
      <LoginButtons isLoading={isPending} />
    </form>
  );
}
