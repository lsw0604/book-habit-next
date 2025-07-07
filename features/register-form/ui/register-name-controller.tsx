import type { RegisterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { UserIcon } from 'lucide-react';
import { Input } from '@/shared/ui/input';

export default function RegisterNameController({
  control,
}: RegisterControllerProps) {
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
