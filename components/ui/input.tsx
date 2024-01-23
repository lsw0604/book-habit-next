import * as React from 'react';

import { cn } from '@/lib/utils';
import ErrorMessage from '../common/error-message';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  label?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      isValid,
      label,
      useValidation,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label className="ml-3 mb-2 block text-sm font-bold text-slate-500">
            {label}
          </label>
        )}
        <div className="flex w-full h-10">
          <input
            type={type}
            className={cn(
              'relative w-full h-auto px-3 py-0 rounded-lg outline-none text-sm border-slate-500 border-2',
              icon && 'py-0 pl-3 pr-11',
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && <div className="relative w-0 top-3 right-8">{icon}</div>}
        </div>
        {errorMessage && isValid && useValidation && (
          <ErrorMessage message={errorMessage} />
        )}
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
