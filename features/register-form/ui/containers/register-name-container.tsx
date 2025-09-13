'use client';

import { UserIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { RegisterType } from '../../schemas';

export function RegisterNameContainer() {
  const { control } = useFormContext<RegisterType>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Input
            {...field}
            id="name"
            label="이름"
            error={!!error}
            errorMessage={error?.message}
            autoComplete="off"
            icon={UserIcon}
          />
        </div>
      )}
    />
  );
}
