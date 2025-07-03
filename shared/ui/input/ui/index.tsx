'use client';

import type { InputProps } from './types';
import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/class-name';
import {
  inputContainerVariants,
  inputIconVariants,
  inputVariants,
} from '../style';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      disabled,
      label,
      icon,
      error,
      errorMessage,
      iconClick,
      ...props
    },
    ref
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : 'default';
    const Icon = icon;

    return (
      <div className={cn('w-full space-y-1', className)}>
        {label && (
          <Label htmlFor={id} className="text-xs ml-1 font-bold">
            {label}
          </Label>
        )}
        <div className={inputContainerVariants({ state })}>
          {Icon && (
            <div
              className={cn(
                'absolute inset-y-0 left-0 flex w-10 items-center justify-center',
                iconClick && 'cursor-pointer'
              )}
            >
              <Icon
                size={16}
                className={inputIconVariants({ state })}
                onClick={() => iconClick?.()}
              />
            </div>
          )}
          <input
            id={id}
            className={inputVariants({ state })}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <AlertCircle size={16} className={inputIconVariants({ state })} />
            </div>
          )}
        </div>
        {error && (
          <ErrorMessage className="text-xs px-1 animate-in slide-in-from-top-1 duration-200">
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
