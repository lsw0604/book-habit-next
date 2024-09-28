'use client';

import { cn } from '@/utils/class-name';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return (
    <p
      className={cn('ml-0.5 text-red-300 mt-0.5 text-sm font-bold', className)}
    >
      {message}
    </p>
  );
}
