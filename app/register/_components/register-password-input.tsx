'use client';

import { useCallback, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';

interface RegisterPasswordProps {
  label?: string;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
  register: UseFormRegisterReturn;
}

export default function RegisterPasswordInput({
  label,
  isValid,
  errorMessage,
  useValidation,
  register,
}: RegisterPasswordProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const iconHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Input
      type={isOpen ? 'text' : 'password'}
      icon={
        isOpen ? (
          <EyeIcon className="w-5 h-5" onClick={iconHandler} />
        ) : (
          <EyeOffIcon className="w-5 h-5" onClick={iconHandler} />
        )
      }
      autoComplete="off"
      label={label}
      isValid={isValid}
      errorMessage={errorMessage}
      useValidation={useValidation}
      {...register}
    />
  );
}
