import { Controller } from 'react-hook-form';
import { RegisterControllerProps } from './types';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { LockIcon } from 'lucide-react';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterCheckPasswordController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="checkPassword"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>비밀번호 확인</Label>
          <Input
            {...field}
            type="password"
            autoComplete="off"
            icon={<LockIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default RegisterCheckPasswordController;
