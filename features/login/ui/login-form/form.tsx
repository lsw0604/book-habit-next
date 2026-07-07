'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';

import type { LoginType } from '../../model';

import { useLoginFormSubmit } from '../../hooks';

import { LoginEmailController } from './email-controller';
import { LoginPasswordController } from './password-controller';
import { LoginButtons } from './login-buttons';

export function LoginForm() {
  const { handleSubmit } = useFormContext<LoginType>();
  const { onSubmit, isError, isPending, error } = useLoginFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginEmailController />
      <LoginPasswordController />
      {isError && error?.response?.data?.message && (
        <ErrorMessage>{error.response.data.message}</ErrorMessage>
      )}
      <LoginButtons isLoading={isPending} />
    </form>
  );
}
