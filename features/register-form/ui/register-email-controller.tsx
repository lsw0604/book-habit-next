import type { RegisterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { MailIcon } from 'lucide-react';
import { Input } from '@/shared/ui/input';

export default function RegisterEmailController({
  control,
}: RegisterControllerProps) {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Input
            {...field}
            label="이메일"
            autoComplete="off"
            icon={MailIcon}
            error={!!error}
            errorMessage={error?.message}
          />
        </div>
      )}
    />
  );
}
