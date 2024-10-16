import React from 'react';

import { cn } from '@/utils/class-name';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] rounded-md border-none w-full',
          'px-3 py-2 text-sm bg-transparent',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:border-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
