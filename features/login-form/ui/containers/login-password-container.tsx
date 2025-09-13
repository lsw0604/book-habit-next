import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { LoginType } from '../../schemas';

export function LoginPasswordContainer() {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const { control } = useFormContext<LoginType>();

  const onClick = useCallback(() => {
    setIsEyeOpen(prev => !prev);
  }, []);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Input
            {...field}
            id="password"
            label="비밀번호"
            type={isEyeOpen ? 'text ' : 'password'}
            icon={isEyeOpen ? EyeIcon : EyeOffIcon}
            autoComplete="off"
            error={!!error}
            errorMessage={error?.message}
            iconClick={onClick}
          />
        </div>
      )}
    />
  );
}
