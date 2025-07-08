'use client';

import { cn } from '@/shared/utils/class-name';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p
      className={cn(
        'ml-1 mt-1',
        'font-bold text-xs text-red-300',
        'animate-in slide-in-from-top-1 duration-200',
        className
      )}
    >
      {children}
    </p>
  );
};
