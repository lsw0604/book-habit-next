'use client';

import { cn } from '@/shared/utils/class-name';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  /** 입력의 aria-describedby가 가리킬 수 있게 열어 둔다 */
  id?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <p
      id={id}
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
