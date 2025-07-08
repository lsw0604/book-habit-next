import { AllHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/shared/utils/class-name';

interface DropdownProps extends AllHTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'absolute rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
