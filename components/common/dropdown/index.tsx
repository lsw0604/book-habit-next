import { cn } from '@/lib/utils';
import { AllHTMLAttributes, ReactNode, forwardRef } from 'react';

interface DropdownProps extends AllHTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
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

export default Dropdown;
