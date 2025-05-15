import type { RegisterControllerProps } from '../model/types';
import React, { useCallback, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterPasswordController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const passwordHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>비밀번호</Label>
          <Input
            {...field}
            autoComplete="off"
            type={isOpen ? 'text' : 'password'}
            icon={
              isOpen ? (
                <EyeIcon className="w-5 h-5" onClick={passwordHandler} />
              ) : (
                <EyeOffIcon className="w-5 h-5" onClick={passwordHandler} />
              )
            }
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default RegisterPasswordController;
