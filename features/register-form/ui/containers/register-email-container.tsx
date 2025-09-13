'use client';

import { MailIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { RegisterType } from '../../schemas';

export function RegisterEmailContainer() {
  const { control } = useFormContext<RegisterType>();

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
