'use client';

import { LockIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { RegisterType } from '../../schemas';

export function RegisterCheckPasswordContainer() {
  const { control } = useFormContext<RegisterType>();

  return (
    <Controller
      name="checkPassword"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Input
            {...field}
            label="비밀번호 확인"
            type="password"
            autoComplete="off"
            error={!!error}
            errorMessage={error?.message}
            icon={LockIcon}
          />
        </div>
      )}
    />
  );
}
