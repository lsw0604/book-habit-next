import * as React from 'react';

import { cn } from '@/utils/class-name';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="flex w-full h-10">
        <input
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
    );
  }
);
Input.displayName = 'Input';

export { Input };
