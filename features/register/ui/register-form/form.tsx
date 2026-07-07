'use client';

import { useFormContext } from 'react-hook-form';

import { useRegisterFormSubmit } from '../../hooks';
import { RegisterType } from '../../model';

import { GenderController } from './gender-controller'; 
import { BirthdayController } from './birthday-controller';
import { CheckPasswordController } from './check-password-controller';
import { EmailController } from './email-controller';
import { NameController } from './name-controller';
import { PasswordController } from './password-controller';
import { RegisterButtons } from './register-buttons';

export function RegisterForm() {
  const { handleSubmit } = useFormContext<RegisterType>();
  const { onSubmit, isPending } = useRegisterFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EmailController />
      <NameController />
      <BirthdayController />
      <PasswordController />
      <CheckPasswordController />
      <GenderController />
      <RegisterButtons isLoading={isPending} />
    </form>
  );
}
