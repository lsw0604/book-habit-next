'use client';

import RegisterEmailController from './register-email-controller';
import RegisterNameController from './register-name-controller';
import RegisterBirthdayController from './register-birthday-controller';
import RegisterPasswordController from './register-password-controller';
import RegisterCheckPasswordController from './register-check-password-controller';
import RegisterGenderController from './register-gender-controller';
import RegisterButtons from './register-buttons';
import {
  useRegisterForm,
  useRegisterFormSubmit,
} from '@/features/register-form/lib/hooks';

export default function RegisterForm() {
  const { handleSubmit, control } = useRegisterForm();
  const { onSubmit, isPending } = useRegisterFormSubmit();

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterEmailController control={control} />
      <RegisterNameController control={control} />
      <RegisterBirthdayController control={control} />
      <RegisterPasswordController control={control} />
      <RegisterCheckPasswordController control={control} />
      <RegisterGenderController control={control} />
      <RegisterButtons isLoading={isPending} />
    </form>
  );
}
