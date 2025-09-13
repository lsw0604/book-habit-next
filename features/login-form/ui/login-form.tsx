'use client';

import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';

import { useLoginFormSubmit } from '../hooks';
import type { LoginType } from '../schemas';

import { LoginEmailContainer, LoginPasswordContainer } from './containers';
import { LoginButtons } from './login-buttons';

export function LoginForm() {
  const { handleSubmit } = useFormContext<LoginType>();
  const { onSubmit, isError, isPending, error } = useLoginFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginEmailContainer />
      <LoginPasswordContainer />
      {isError && error?.response?.data?.message && (
        <ErrorMessage>{error.response.data.message}</ErrorMessage>
      )}
      <LoginButtons isLoading={isPending} />
    </form>
  );
}
