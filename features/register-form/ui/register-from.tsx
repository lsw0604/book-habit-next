'use client';

import { useRegisterForm, useRegisterFormSubmit } from '../hooks';

import {
  RegisterGenderContainer,
  RegisterBirthdayContainer,
  RegisterCheckPasswordContainer,
  RegisterEmailContainer,
  RegisterNameContainer,
  RegisterPasswordContainer,
} from './containers';
import { RegisterButtons } from './register-buttons';

export function RegisterForm() {
  const { handleSubmit } = useRegisterForm();
  const { onSubmit, isPending } = useRegisterFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterEmailContainer />
      <RegisterNameContainer />
      <RegisterBirthdayContainer />
      <RegisterPasswordContainer />
      <RegisterCheckPasswordContainer />
      <RegisterGenderContainer />
      <RegisterButtons isLoading={isPending} />
    </form>
  );
}
