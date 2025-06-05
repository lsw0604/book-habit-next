import { MailIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { LoginControllerProps } from '../model/types';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';

const LoginEmailController = ({ control }: LoginControllerProps) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Label className="mb-2 ml-2 text-sm font-bold">이메일</Label>
          <Input
            {...field}
            type="email"
            icon={<MailIcon className="w-5 h-5" />}
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default LoginEmailController;
