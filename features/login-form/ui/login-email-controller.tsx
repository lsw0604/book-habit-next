import { MailIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { LoginControllerProps } from './types';
import { Input } from '@/shared/ui/input';

export default function LoginEmailController({
  control,
}: LoginControllerProps) {
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
