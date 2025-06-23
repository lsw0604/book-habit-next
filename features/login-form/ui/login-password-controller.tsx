import { useCallback, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';
import { LoginControllerProps } from './types';

const LoginPasswordController = ({ control }: LoginControllerProps) => {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsEyeOpen(prev => !prev);
  }, []);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Label className="mb-2 ml-2 text-sm font-bold">비밀번호</Label>
          <Input
            {...field}
            type={isEyeOpen ? 'text ' : 'password'}
            icon={
              isEyeOpen ? (
                <EyeIcon className="w-5 h-5" onClick={onClick} />
              ) : (
                <EyeOffIcon className="w-5 h-5" onClick={onClick} />
              )
            }
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

export default LoginPasswordController;
