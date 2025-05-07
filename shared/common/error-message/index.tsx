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
      className={cn('ml-0.5 text-red-300 mt-0.5 text-sm font-bold', className)}
    >
      {children}
    </p>
  );
};
