import * as React from 'react';

import { cn } from '@/utils/class-name';

import ErrorMessage from '../common/error-message';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isValid, errorMessage, useValidation, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && isValid && useValidation && (
          <ErrorMessage message={errorMessage} />
        )}
      </>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
