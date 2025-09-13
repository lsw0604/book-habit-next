import { MailIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { LoginType } from '../../schemas';

export function LoginEmailContainer() {
  const { control } = useFormContext<LoginType>();
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Input
            {...field}
            id="email"
            label="이메일"
            type="email"
            icon={MailIcon}
            autoComplete="off"
            error={!!error}
            errorMessage={error?.message}
          />
        </div>
      )}
    />
  );
}
