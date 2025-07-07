import type { RegisterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { LockIcon } from 'lucide-react';
import { Input } from '@/shared/ui/input';

export default function RegisterCheckPasswordController({
  control,
}: RegisterControllerProps) {
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
