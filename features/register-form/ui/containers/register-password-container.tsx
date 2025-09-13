'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { RegisterType } from '../../schemas';

export function RegisterPasswordContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { control } = useFormContext<RegisterType>();

  const passwordHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Input
            {...field}
            id="password"
            label="비밀번호"
            error={!!error}
            errorMessage={error?.message}
            autoComplete="off"
            type={isOpen ? 'text' : 'password'}
            iconClick={passwordHandler}
            icon={isOpen ? EyeIcon : EyeOffIcon}
          />
        </div>
      )}
    />
  );
}
